import Link from "next/link";
import React from "react";

export interface ProductInterface {
  id: string;
  title: string;
  type: string;
  description: string;
  filename: string;
  size: string;
  price: number;
  information: string;
}

interface Props {
  productData: ProductInterface;
}

const Product: React.FC<Props> = ({ productData }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="product__item">
        <div className="product__item__pic">
          <img src={`/img/products/${productData.filename}`} alt="" />

          <ul className="product__item__pic__hover">
            <li>
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-retweet"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
        <Link href={`/shop/${productData.id}`}>
          <a className="product__item__text d-block">
            <h6>{productData.title}</h6>
            <h5>${productData.price}</h5>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Product;
