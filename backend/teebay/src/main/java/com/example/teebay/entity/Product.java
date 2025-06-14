package com.example.teebay.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter@Setter
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(length = 2000)
    private String description;

    private Double price;
    private String summary;

    @ManyToOne
    @JoinColumn(name = "created_by_id", nullable = false)
    private User createdBy;
}
