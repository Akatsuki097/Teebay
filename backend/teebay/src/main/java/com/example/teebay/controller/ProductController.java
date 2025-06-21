package com.example.teebay.controller;

import com.example.teebay.entity.Product;
import com.example.teebay.entity.User;
import com.example.teebay.entity.Category;
import com.example.teebay.service.ProductService;
import com.example.teebay.service.ProductService.UserActivity;
import com.example.teebay.service.UserService;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.List;

@Controller
public class ProductController {
    private final ProductService productService;
    private final UserService userService;
    public ProductController(ProductService productService,UserService userService) 
    { 
        this.productService = productService; 
        this.userService = userService;
    }

    @QueryMapping
    public List<Product> allProducts(@AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails user) {
        User me = userService.findByEmail(user.getUsername());
        return productService.findAllExcludingOwner(me);
    }

    @QueryMapping
    public Product productById(@Argument Long id) {
        return productService.findById(id);
    }
    

    @QueryMapping
    public List<Product> myProducts(@AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails user) {
        User currUser = userService.findByEmail(user.getUsername());
        return productService.findByCreatedBy(currUser);
    }

    @MutationMapping
    public Product createProduct(@Argument ProductInput input , @AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails user) {
        User currUser = userService.findByEmail(user.getUsername());
        Product p = new Product();
        p.setTitle(input.title());
        p.setCategory(input.category());
        p.setDescription(input.description());
        p.setPrice(input.price());
        p.setCreatedBy(currUser);
        return productService.save(p);
    }

    @MutationMapping
    public Product updateProduct(@Argument Long productId, @Argument ProductInput input) {
        Product p = new Product();
        p.setTitle(input.title());
        p.setCategory(input.category());
        p.setDescription(input.description());
        p.setPrice(input.price());
        return productService.update(productId, p);
    }

    @MutationMapping
    public Boolean deleteProduct(@Argument Long productId) {
        productService.deleteById(productId);
        return true;
    }

    @MutationMapping
    public Product buyProduct(@Argument Long productId,
                            @AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails) {
        User buyer = userService.findByEmail(userDetails.getUsername());
        return productService.buyProduct(productId, buyer);
    }

    @MutationMapping
    public Product rentProduct(@Argument RentInput input,
                            @AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails) {
        User renter = userService.findByEmail(userDetails.getUsername());
        return productService.rentProduct(input.productId(), input.days(), renter);
    }

    @MutationMapping
    public Product returnProduct(@Argument Long productId,
                                @AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails) {
        User renter = userService.findByEmail(userDetails.getUsername());
        return productService.returnProduct(productId, renter);
    }

    @QueryMapping
    public UserActivity userActivity(@AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername());
        return productService.getUserActivity(user);
    }

    public record ProductInput(String title, Category category, String description, Double price) {}
    public record RentInput(Long productId, int days) {}
}