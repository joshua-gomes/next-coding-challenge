"use client";

import { useBasketContext } from "@/hooks/useBasketContext";
import { Product } from "@/types/product";
import styles from "./ProductList.module.css";

interface ItemsButtonsListProps {
  products: Product[];
}

const CART_QUANTITY_TO_ADD = 1;

const ProductList = ({ products = [] }: ItemsButtonsListProps) => {
  const { addItemToBasket } = useBasketContext();

  if (!products.length) {
    return null;
  }

  return (
    <ul className={styles["product-list"]}>
      {products.map((product) => (
        <li key={product.name} className={styles["product-card"]}>
          <button
            onClick={() => addItemToBasket(product.name, CART_QUANTITY_TO_ADD)}
            aria-label={`Add "${product.name}" to basket`}
            type="button"
          >
            <p className={styles["product-name"]}>
              {product.name} <span>-&gt;</span>
            </p>
            <p>{product.blurb}</p>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
