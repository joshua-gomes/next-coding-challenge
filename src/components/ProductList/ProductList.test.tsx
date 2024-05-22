import { fireEvent, getByText, render, waitFor } from "@testing-library/react";
import { useBasketContext } from "@/hooks/useBasketContext";
import { productsMock } from "@/mocks/products/productsMock";
import ProductList from "./ProductList";

jest.mock("@/hooks/useBasketContext");

const useBasketContextMock = jest
  .mocked(useBasketContext)
  .mockImplementation(() => ({
    basket: [],
    addItemToBasket: jest.fn(),
  }));

describe("ProductList", () => {
  test("displays all the products passed into it as a prop", () => {
    const screen = render(<ProductList products={productsMock} />);

    productsMock.forEach((product) => {
      const productCard = screen.getByRole("button", {
        name: `Add "${product.name}" to basket`,
      });

      const productName = getByText(productCard, product.name);
      const productBlurb = getByText(productCard, product.blurb);

      expect(productName).toBeInTheDocument();
      expect(productBlurb).toBeInTheDocument();
    });
  });

  test("doesn't render anything if there aren't any products provided", async () => {
    const { container } = render(<ProductList products={[]} />);

    await waitFor(() => {
      expect(container.childElementCount).toEqual(0);
    });
  });

  test("adds item to cart when product is clicked on", async () => {
    const addItemToBasket = jest.fn();
    useBasketContextMock.mockImplementation(() => ({
      basket: [],
      addItemToBasket,
    }));

    const screen = render(<ProductList products={productsMock} />);

    const testProduct = productsMock[0];
    const productCard = screen.getByRole("button", {
      name: `Add "${testProduct.name}" to basket`,
    });

    fireEvent.click(productCard);

    await waitFor(() => {
      expect(addItemToBasket).toHaveBeenCalledWith(testProduct.name, 1);
    });
  });
});
