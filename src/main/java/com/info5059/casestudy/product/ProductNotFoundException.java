package com.info5059.casestudy.product;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(String product) {
        super(product);
    }
}
