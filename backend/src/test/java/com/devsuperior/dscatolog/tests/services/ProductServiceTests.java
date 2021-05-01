package com.devsuperior.dscatolog.tests.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.devsuperior.dscatolog.dto.ProductDTO;
import com.devsuperior.dscatolog.entities.Product;
import com.devsuperior.dscatolog.repositories.ProductRepository;
import com.devsuperior.dscatolog.services.ProductService;
import com.devsuperior.dscatolog.services.exceptions.DatabaseException;
import com.devsuperior.dscatolog.services.exceptions.ResourceNotFoundException;
import com.devsuperior.dscatolog.tests.factory.ProductFactory;

@ExtendWith(SpringExtension.class) // não carrega o contexto
public class ProductServiceTests {

	@InjectMocks
	private ProductService service;
	
	@Mock
	private ProductRepository repository;
	
	private long existingId;
	private long nonExistingId;
	private long dependentId;
	private Product product;	
	private ProductDTO productDto;	
	private PageImpl<Product> page;
	private Page<ProductDTO> pageList;
	
	
	@BeforeEach
	void setUp() throws Exception{
		existingId = 1L;
		nonExistingId = 1000L; 
		dependentId = 4L;
		product = ProductFactory.createProduct();
		productDto = ProductFactory.createProductDTO();
		page = new PageImpl<>(List.of(product));		
		pageList = new PageImpl<>(List.of(productDto));
				
		
		Mockito.when(repository.find(ArgumentMatchers.any(), ArgumentMatchers.anyString(), ArgumentMatchers.any()))
					.thenReturn(page);
		
		Mockito.when(repository.getOne(existingId)).thenReturn(product);
		Mockito.when(repository.getOne(nonExistingId)).thenThrow(ResourceNotFoundException.class);
		
		Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(product);
		
		Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(product));
		Mockito.when(repository.findById(nonExistingId)).thenReturn(Optional.empty());
		
		Mockito.doNothing().when(repository).deleteById(existingId);

		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
	}
	
	@Test
	public void updateShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
		
				
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.update(nonExistingId, productDto);
		});
		
	}
	
	@Test
	public void updateShouldReturnAProductDTOWhenIdExists() {
		ProductDTO productDTO = service.update(existingId, productDto);
		
		Assertions.assertNotNull(productDTO);
	}
	
	@Test
	public void findByIdShouldThrowEntityNotFoundExceptionWhenIdDoesNotExists() {
		
				
		Assertions.assertThrows(EntityNotFoundException.class, () -> {
			service.findById(nonExistingId);
		});
		
	}
	
	@Test
	public void findByIdShouldReturnAProductDTOWhenIdExists() {
		
		ProductDTO productDTO = service.findById(existingId);
		
		Assertions.assertNotNull(productDTO);
	}
	
	@Test
	public void findAllPagedShouldReturnAllProductsPagedWhenRequested () {
		Long categoryId = 0L;
		String name = "";
		PageRequest pageRequest = PageRequest.of(0, 10);
		
		pageList = service.findAllPaged(categoryId, name, pageRequest);
		
		Assertions.assertNotNull(pageList);;
		Assertions.assertFalse(pageList.isEmpty());
		
		Mockito.verify(repository, Mockito.times(1)).find(null, name, pageRequest);
	}
	
	@Test
	public void deleteShouldThrowDatabaseExceptionWhenIdHasDependent() {
		Assertions.assertThrows(DatabaseException.class, () -> {
			service.delete(dependentId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(dependentId);
	}
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(nonExistingId);
	}
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(existingId);
	}
	
}
