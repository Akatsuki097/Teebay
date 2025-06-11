package com.example.teebay.controller;

import com.example.teebay.entity.Product;
import com.example.teebay.entity.User;
import com.example.teebay.entity.Category;
import com.example.teebay.service.ProductService;
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
    public List<Product> allProducts() {
        return productService.findAll();
    }

    @QueryMapping
    public Product productById(@Argument Long id) {
        return productService.findById(id);
    }

    @QueryMapping
    public List<Product> myProducts(@AuthenticationPrincipal Principal principal) {
        // Extract user ID or name from Principal (depends on your security setup)
        //Long userId = Long.parseLong(principal.getName());
        User currUser = userService.findById(Integer.parseInt(principal.getName()));
        return currUser.getProducts();
    }

    @MutationMapping
    public Product createProduct(@Argument ProductInput input , @AuthenticationPrincipal Principal principal) {
        User currUser = userService.findById(Integer.parseInt(principal.getName()));
        Product p = new Product();
        p.setTitle(input.title());
        p.setCategory(input.category());
        p.setDescription(input.description());
        p.setPrice(input.price());
        p.setSummary(input.summary());
        p.setCreatedBy(currUser);
        // set ownerId from context if needed
        return productService.save(p);
    }

    @MutationMapping
    public Product updateProduct(@Argument Long id, @Argument ProductInput input) {
        Product p = new Product();
        p.setTitle(input.title());
        p.setCategory(input.category());
        p.setDescription(input.description());
        p.setPrice(input.price());
        p.setSummary(input.summary());
        return productService.update(id, p);
    }

    @MutationMapping
    public Boolean deleteProduct(@Argument Long id) {
        productService.deleteById(id);
        return true;
    }

    // GraphQL input type as a Java record (Spring GraphQL auto-maps fields)
    public record ProductInput(String title, Category category, String description, Double price, String summary) {}
}