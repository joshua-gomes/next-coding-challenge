import { fireEvent, getByText, render, waitFor } from "@testing-library/react";
import * as useBasketContextModule from "@/hooks/useBasketContext";
import ProductList from "./ProductList";

jest.mock("@/hooks/useBasketContext", () => ({
  useBasketContext: () => {
    return { basket: [], addItemToBasket: jest.fn() };
  },
}));

const mockProducts = [
  { name: "Item 1", blurb: "Blue" },
  { name: "Item 2", blurb: "Red" },
  { name: "Item 3", blurb: "Green" },
];

describe("ProductList", () => {
  test("displays all the products passed into it as a prop", () => {
    const screen = render(<ProductList products={mockProducts} />);

    mockProducts.forEach((product) => {
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

  // For some reason I can't spy on the module. Usually I am able to
  test.skip("adds item to cart when product is clicked on", async () => {
    const addItemToBasket = jest.fn();
    jest
      .spyOn(useBasketContextModule, "useBasketContext")
      .mockImplementation(() => ({
        basket: [],
        addItemToBasket: () => {},
      }));

    const screen = render(<ProductList products={mockProducts} />);

    const testProduct = mockProducts[0];
    const productCard = screen.getByRole("button", {
      name: `Add "${testProduct.name}" to basket`,
    });

    fireEvent.click(productCard);

    await waitFor(() => {
      expect(addItemToBasket).toHaveBeenCalledWith(testProduct.name, 1);
    });
  });
});
