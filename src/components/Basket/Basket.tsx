import { memo } from "react";
import { CartItem } from "@/types/cart";
import BasketItem from "./components/BasketItem";
import styles from "./Basket.module.css";

interface BasketProps {
  items: CartItem[];
}

const Basket = memo(({ items = [] }: BasketProps) => {
  const itemCount = items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  /**
   * Not sure if the list should be sorted by name, so I have left it unsorted.
   * This is something I would usually check with design.
   */
  return (
    <section>
      <h2 className={styles.basket}>Basket: {itemCount} items</h2>
      {items.length > 0 && (
        <ul aria-label="Basket items">
          {items.map((item) => (
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
});

export default Basket;
