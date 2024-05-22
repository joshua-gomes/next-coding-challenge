import styles from "./BasketItem.module.css";

interface BasketItemProps {
  name: string;
  count: number;
}

const BasketItem = ({ name, count }: BasketItemProps) => {
  return (
    <li className={styles["basket-item"]}>
      <p className={styles["basket-item-text"]}>{name}</p>
      <p className={styles["basket-item-text"]}>count: {count}</p>
    </li>
  );
};

export default BasketItem;
