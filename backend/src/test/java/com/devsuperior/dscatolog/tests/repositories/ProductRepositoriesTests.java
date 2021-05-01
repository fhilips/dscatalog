package com.devsuperior.dscatolog.tests.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.devsuperior.dscatolog.entities.Category;
import com.devsuperior.dscatolog.entities.Product;
import com.devsuperior.dscatolog.repositories.CategoryRepository;
import com.devsuperior.dscatolog.repositories.ProductRepository;
import com.devsuperior.dscatolog.tests.factory.CategoryFactory;
import com.devsuperior.dscatolog.tests.factory.ProductFactory;


@DataJpaTest
public class ProductRepositoriesTests {

	@Autowired
	private ProductRepository repository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	private long existingId;
	private long nonExistingId;
	private long countTotalProducts;
	private long countPcGamerProducts;
	private PageRequest pageRequest;
	
	private List<Category> categoryList;
	private Category computadoresCategory;
	private Category livrosCategory;
	private long countTotalCategoryComputadores;
	private long countTotalCategoryComputadoresAndLivros;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
		countPcGamerProducts = 21L;
		pageRequest = PageRequest.of(0, 10);
		
		categoryList = new ArrayList<>();
		computadoresCategory = categoryRepository.getOne(3L);
		livrosCategory = categoryRepository.getOne(1L);
		countTotalCategoryComputadores = 23;
		countTotalCategoryComputadoresAndLivros = 24;		
	}
	
	
	@Test
	public void findShouldReturnProductsWhenProductHasMoreThanOneCategory() {				
				
		categoryList.add(computadoresCategory);		
		categoryList.add(livrosCategory);
		Page<Product> result = repository.find(categoryList, "", pageRequest);
		
		Assertions.assertFalse(result.isEmpty());	
		Assertions.assertEquals(countTotalCategoryComputadoresAndLivros, result.getTotalElements());
	}
	@Test
	public void findShouldReturnOnlySelectedProductsWhenCategoryInformed() {				
				
		categoryList.add(computadoresCategory);		
		
		Page<Product> result = repository.find(categoryList, "", pageRequest);
		
		Assertions.assertFalse(result.isEmpty());	
		Assertions.assertEquals(countTotalCategoryComputadores, result.getTotalElements());
	}
	
	
	@Test
	public void findShouldReturnProductsWhenNameIsEmpty() {
		String name = "";
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExistsIgnoringCase() {
		String name = "PC gaMer";
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPcGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExists() {
		String name = "PC Gamer";		
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPcGamerProducts, result.getTotalElements());
	}
	
	
	@Test
	public void saveShouldPersistWithAutoincrementWhenIdIsNull(){
		Product product = ProductFactory.createProduct();
		product.setId(null);
		
		product = repository.save(product);
		Optional<Product> result = repository.findById(product.getId());
		
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts + 1L, product.getId());
		Assertions.assertTrue(result.isPresent());
		Assertions.assertSame(result.get(), product);
	}
	
	
	@Test
	public void deleteShouldDeleteWhenIdExists() {		
		
		repository.deleteById(existingId);
		
		Optional<Product> result = repository.findById(existingId);
		
		Assertions.assertFalse(result.isPresent());
	}
	
	@Test
	public void deleteShouldThrowEmptyResultDataAccessExceptionWhenIdDoesNotExists() {		
		
				
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonExistingId);
		});
	}
}
