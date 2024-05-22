import Basket from "@/components/Basket";
import ProductList from "@/components/ProductList";
import { productsMock } from "@/mocks/products/productsMock";
import styles from "./page.module.css";

export default function Home() {
  /**
   * This should be fetched via an api but I am just using a local version of the products mock for now.
   * Something like json-server can be also helpful to power your app off of mocks
   *
   * It can be found here:
   * https://www.npmjs.com/package/json-server
   **/
  const itemsList = productsMock;

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Michael&apos;s Amazing Web Store</h1>
        <Basket />
      </div>

      <section className={styles["products-section"]}>
        <ProductList products={itemsList} />
      </section>
    </main>
  );
}
