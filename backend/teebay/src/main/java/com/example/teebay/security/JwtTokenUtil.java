
package com.example.teebay.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenUtil {

    @Value("${security.jwt.secret-key}")
    private String base64Secret;

    @Value("${security.jwt.expiration-time}")
    private long jwtExpirationMs;

    private Key signingKey;

    @PostConstruct
    public void init() {
        // Decode the Base64-encoded secret into bytes, then build the HMAC-SHA key
        byte[] keyBytes = Decoders.BASE64.decode(base64Secret);
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Generate a signed JWT with the given subject (e.g., userId or username).
     */
    public String generateToken(String subject) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extract and return the subject (e.g., userId) from the JWT.
     * Returns null if token is invalid or expired.
     */
    public String extractSubject(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (Exception ex) {
            return null;
        }
    }

    /**
     * Validate the token expiration date.
     */
    public boolean isTokenValid(String token) {
        try {
            var claims = Jwts.parser()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getExpiration().after(new Date());
        } catch (Exception ex) {
            return false;
        }
    }
}
