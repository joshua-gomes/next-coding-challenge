import styles from "./BasketItem.module.css";

interface BasketItemProps {
  name: string;
  count: number;
}

const BasketItem = ({ name, count }: BasketItemProps) => {
  return (
    <li className={styles["basket-item"]}>
      {name} count: {count}
    </li>
  );
};

export default BasketItem;
