package com.example.teebay.service;

import com.example.teebay.entity.Product;
import com.example.teebay.entity.User;
import com.example.teebay.repository.ProductRepository;
import com.example.teebay.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository repo;
    private final UserRepository userRepo;

    public ProductService(ProductRepository repo, UserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }
    public List<Product> findAllExcludingOwner(User me) {
        //return repo.findAll();
        return repo.findByBuyerIsNullAndRenterIsNullAndCreatedByNot(me);
    }
    public Product findById(Long id) {
        return repo.findById(id).orElseThrow();
    }
    
    public Product save(Product p) {
        return repo.save(p);
    }

    @Transactional
    public Product update(Long id, Product data) {
        Product prod = findById(id);
        prod.setTitle(data.getTitle());
        prod.setCategory(data.getCategory());
        prod.setDescription(data.getDescription());
        prod.setPrice(data.getPrice());
        return repo.save(prod);
    }
    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    public List<Product> findByCreatedBy(User owner) {
        return repo.findByCreatedBy(owner);
    }

    @Transactional
    public Product buyProduct(Long productId, User buyer) {
        Product prod = findById(productId);
        if (prod.getBuyer() != null || prod.getRenter() != null) {
            throw new RuntimeException("Product not available");
        }
        prod.setBuyer(buyer);
        return repo.save(prod);
    }

    @Transactional
    public Product rentProduct(Long productId, int days, User renter) {
        Product prod = findById(productId);
        if (prod.getBuyer() != null || prod.getRenter() != null) {
            throw new RuntimeException("Product not available");
        }
        prod.setRenter(renter);
        prod.setRentalEndDate(LocalDateTime.now().plusDays(days));
        return repo.save(prod);
    }


    @Transactional
    public Product returnProduct(Long productId, User renter) {
        Product prod = findById(productId);
        if (!renter.equals(prod.getRenter())) {
            throw new RuntimeException("Only the renter can return the product");
        }
        prod.setRenter(null);
        prod.setRentalEndDate(null);
        return repo.save(prod);
    }

    public UserActivity getUserActivity(User user) {
        List<Product> bought = repo.findByBuyer(user);
        List<Product> sold = repo.findByCreatedBy(user).stream()
                .filter(p -> p.getBuyer() != null)
                .collect(Collectors.toList());
        List<Product> borrowed = repo.findByRenter(user);
        List<Product> lent = repo.findByCreatedBy(user).stream()
                .filter(p -> p.getRenter() != null)
                .collect(Collectors.toList());
        return new UserActivity(bought, sold, borrowed, lent);
    }

    public static record UserActivity(
            List<Product> bought,
            List<Product> sold,
            List<Product> borrowed,
            List<Product> lent
    ) {}




}
