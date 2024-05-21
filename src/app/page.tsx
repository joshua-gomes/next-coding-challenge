"use client";
import { useState } from "react";
import { CartItem } from "@/types/cart";
import Basket from "@/components/Basket";
import styles from "./page.module.css";

const itemsList = [
  {
    name: "Item 1",
    blurb: "Foo",
  },
  {
    name: "Item 2",
    blurb: "Bar",
  },
  {
    name: "Item 3",
    blurb: "Baz",
  },
  {
    name: "Item 4",
    blurb: "Qux",
  },
];

export default function Home() {
  const [items, setItems] = useState<CartItem[]>([]);

  const handleOnClickAddToCart = (product: string) => {
    const alreadyInCart = items.find((item) => item.name === product);
    if (alreadyInCart) {
      // @TODO need to find out how to update cart items
    } else {
      setItems([...items, { name: product, quantity: 1 }]);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Michael&apos;s Amazing Web Store</p>
        <Basket items={items} />
      </div>

      <div className={styles.grid}>
        <button
          className={styles.card}
          onClick={() => handleOnClickAddToCart("Item 1")}
          aria-label="Add to basket"
        >
          <h2>
            Item 1 <span>-&gt;</span>
          </h2>
          <p>Foo</p>
        </button>
        <button
          className={styles.card}
          onClick={() => handleOnClickAddToCart("Item 2")}
          aria-label="Add to basket"
        >
          <h2>
            Item 2 <span>-&gt;</span>
          </h2>
          <p>Bar</p>
        </button>
        <button
          className={styles.card}
          onClick={() => handleOnClickAddToCart("Item 3")}
          aria-label="Add to basket"
        >
          <h2>
            Item 3 <span>-&gt;</span>
          </h2>
          <p>Baz</p>
        </button>
        <button
          className={styles.card}
          onClick={() => handleOnClickAddToCart("Item 4")}
          aria-label="Add to basket"
        >
          <h2>
            Item 4 <span>-&gt;</span>
          </h2>
          <p>Qux</p>
        </button>
      </div>
    </main>
  );
}
