package com.devsuperior.dscatolog.tests.factory;

import java.time.Instant;

import com.devsuperior.dscatolog.dto.ProductDTO;
import com.devsuperior.dscatolog.entities.Category;
import com.devsuperior.dscatolog.entities.Product;

public class ProductFactory {

	public static Product createProduct() {
		Product product = new Product(1L, "Phone", "Good phone", 800.0, "https://pt.wikipedia.org/wiki/DevOps", Instant.parse("2021-02-20T03:00:00Z"));
		product.getCategories().add(new Category(1L, null));
		return product;
	}
	
	public static ProductDTO createProductDTO() {
		Product product = createProduct();
		return new ProductDTO(product, product.getCategories());
	}
	
	public static ProductDTO createProductDTO(Long id) {
		ProductDTO productDTO = createProductDTO();
		productDTO.setId(id);
		return productDTO;
	}
	
}
