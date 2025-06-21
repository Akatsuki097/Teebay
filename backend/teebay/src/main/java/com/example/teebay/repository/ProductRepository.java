package com.example.teebay.repository;

import com.example.teebay.entity.Product;
import com.example.teebay.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findByBuyer(User buyer);
    List<Product> findByCreatedBy(User owner);
    List<Product> findByRenter(User renter);
    List<Product> findByBuyerIsNullAndRenterIsNullAndCreatedByNot(User me);
}
