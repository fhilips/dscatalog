package com.devsuperior.dscatolog.tests.integration;

import javax.persistence.EntityNotFoundException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatolog.dto.ProductDTO;
import com.devsuperior.dscatolog.entities.Product;
import com.devsuperior.dscatolog.repositories.ProductRepository;
import com.devsuperior.dscatolog.services.ProductService;
import com.devsuperior.dscatolog.services.exceptions.ResourceNotFoundException;
import com.devsuperior.dscatolog.tests.factory.ProductFactory;

@SpringBootTest
@Transactional // faz com que os testes voltem ao seu estado inicial
public class ProductServiceIT {
	@Autowired
	private ProductService service;

	@Mock
	private ProductRepository repository;

	private long existingId;
	private long nonExistingId;
	private long countTotalProducts;
	private long countPcGamerProducts;
	
	private Product product;
	private ProductDTO productDto;
	PageRequest pageRequest;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
		countPcGamerProducts = 21L;
		
		product = ProductFactory.createProduct();
		productDto = ProductFactory.createProductDTO();
		pageRequest = PageRequest.of(0, 10);
	}

	@Test
	public void findAllPagedShouldReturnProductsWhenNameExistsIgnoringCase() {
		String name = "PC gaMer";
		
		Page<ProductDTO> pageList = service.findAllPaged(0L, name, pageRequest);
		
		Assertions.assertFalse(pageList.isEmpty());
		Assertions.assertEquals(countPcGamerProducts, pageList.getTotalElements());
	}

	@Test
	public void findAllPagedShouldReturnAllProductsWhenNameIsEmpty() {

		Page<ProductDTO> pageList = service.findAllPaged(0L, "", pageRequest);

		Assertions.assertFalse(pageList.isEmpty());
		Assertions.assertEquals(countTotalProducts, pageList.getTotalElements());
	}

	@Test
	public void findAllPagedShouldReturnNothingWhenNameDoesNotExists() {
		
		String name = "Verão";

		Page<ProductDTO> pageList = service.findAllPaged(0L, name, pageRequest);

		Assertions.assertNotNull(pageList);
		
		Assertions.assertTrue(pageList.isEmpty());
		
	}
	

	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});
	}

	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);
		});

	}
}
