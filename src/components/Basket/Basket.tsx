"use client";

import { useMemo } from "react";
import { useBasketContext } from "@/hooks/useBasketContext";
import BasketItem from "./components/BasketItem";
import styles from "./Basket.module.css";

const Basket = () => {
  const { basket } = useBasketContext();

  const itemCount = useMemo(() => {
    return basket.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  }, [basket]);

  /**
   * Not sure if the list should be sorted by name, so I have left it unsorted.
   * This is something I would usually check with design.
   */
  return (
    <section>
      <h2 className={styles.basket}>Basket: {itemCount} items</h2>
      {basket.length > 0 && (
        <ul aria-label="Basket items">
          {basket.map((item) => (
            <BasketItem
              key={item.name}
              name={item.name}
              count={item.quantity}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Basket;
