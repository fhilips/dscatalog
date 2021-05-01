package com.devsuperior.dscatolog.tests.factory;

import java.time.Instant;

import com.devsuperior.dscatolog.dto.CategoryDTO;
import com.devsuperior.dscatolog.dto.ProductDTO;
import com.devsuperior.dscatolog.entities.Category;
import com.devsuperior.dscatolog.entities.Product;

public class CategoryFactory {

	public static Category createCategory() {
		return new Category(4L, "");
	}
	
	public static CategoryDTO createCategoryDTO() {
		return new CategoryDTO(createCategory());
	}
}
