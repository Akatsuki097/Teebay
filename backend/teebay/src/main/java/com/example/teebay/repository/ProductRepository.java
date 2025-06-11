package com.example.teebay.repository;

import com.example.teebay.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCreatedById(Long ownerId);
}
