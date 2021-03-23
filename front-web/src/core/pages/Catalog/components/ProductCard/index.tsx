import "./styles.scss";

import { ReactComponent as ProductImage } from "../../../../assets/images/product.svg";
import ProductPrice from "../../../../components/ProductPrice";

const ProductCard = () => (
  <div className="card-base border-radius-10 product-card">
    <ProductImage />
    <div className="product-info">
      <h6 className="product-name">Computador Desktop - Intel Core i7</h6>
      <ProductPrice price="2.779,00" />
    </div>
  </div>
);

export default ProductCard;
