package com.example.teebay.service;

import com.example.teebay.entity.Product;
import com.example.teebay.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repo;
    public ProductService(ProductRepository repo) { this.repo = repo; }

    public List<Product> findAll() {
        return repo.findAll();
    }
    public Product findById(Long id) {
        return repo.findById(id).orElseThrow();
    }
    // public List<Product> findByOwnerId(Long ownerId) {
    //     return repo.findByOwnerId(ownerId);
    // }
    public Product save(Product p) {
        return repo.save(p);
    }
    public Product update(Long id, Product data) {
        Product prod = findById(id);
        prod.setTitle(data.getTitle());
        prod.setCategory(data.getCategory());
        prod.setDescription(data.getDescription());
        prod.setPrice(data.getPrice());
        prod.setSummary(data.getSummary());
        return repo.save(prod);
    }
    public void deleteById(Long id) {
        repo.deleteById(id);
    }
}
