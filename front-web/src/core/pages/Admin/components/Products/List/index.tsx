import Pagination from "core/components/Pagination";
import { ProductsResponse } from "core/types/Product";
import { makePrivateRequest, makeRequest } from "core/utils/request";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";


import Card from "../Card";
import CardLoader from "../Loaders/ProductCardLoader";
import "./styles.scss";

const List = () => {
  const history = useHistory();
  const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);

  const getProducts = useCallback(() => {
    const params = {
      page: activePage,
      linesPerPage: 4,
      direction: 'DESC',
      orderBy: 'id'
    };
    setIsLoading(true);
    makeRequest({ url: "/products", params })
      .then((response) => setProductsResponse(response.data))
      .finally(() => setIsLoading(false));
  }, [activePage])

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleCreate = () => {
    history.push("/admin/products/create");
  };
  const onRemove = (productId: number) => {
    const confirm = window.confirm('Deseja realmente excluir este produto?')
    if (confirm) {
      makePrivateRequest({ url: `/products/${productId}`, method: 'DELETE'})
      .then(() => {
        toast.info('Produto removido com sucesso!')
        history.push('/admin/products');
        getProducts();
      })
      .catch(() => {
        toast.error('Erro ao remover produto!')
      })
    }    
  }
  return (
    <div className="admin-products-list">
      <button onClick={handleCreate} className="btn btn-primary btn-lg">
        ADICIONAR
      </button>
      <div className="admin-list-container">
      {isLoading ? <CardLoader /> : (
        productsResponse?.content.map(product => (
          <Card product={product} key={product.id} onRemove={onRemove} />
       ))
      )}           
      {productsResponse && (
        <Pagination 
          totalPages={productsResponse.totalPages}
          activePage={activePage}
          onChange={page => setActivePage(page)} />
       )} 
      </div>
    </div>
  );
};

export default List;
