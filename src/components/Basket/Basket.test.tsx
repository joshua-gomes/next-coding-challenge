import { render, cleanup } from "@testing-library/react";
import Basket from "./Basket";

const mockItems = [
  {
    name: "Item 1",
    quantity: 2,
  },
  {
    name: "Item 2",
    quantity: 5,
  },
  {
    name: "Item 3",
    quantity: 3,
  },
];

describe.skip("Basket", () => {
  afterEach(() => {
    cleanup();
  });

  describe("displays the correct total count of items in the basket", () => {
    test("when there is items in the basket", () => {
      const screen = render(<Basket />);

      const expectedNumberOfItemsInTheBasket = mockItems.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);

      const basketHeading = screen.getByText(
        `Basket: ${expectedNumberOfItemsInTheBasket} items`
      );

      expect(basketHeading).toBeInTheDocument();
    });

    test("when there are no items in the basket", () => {
      const screen = render(<Basket />);

      const expectedNumberOfItemsInTheBasket = 0;
      const basketHeading = screen.getByText(
        `Basket: ${expectedNumberOfItemsInTheBasket} items`
      );

      expect(basketHeading).toBeInTheDocument();
    });
  });

  test("displays each item in the basket", () => {
    const screen = render(<Basket />);

    mockItems.forEach((item) => {
      const itemName = screen.getByText(item.name);
      const itemCount = screen.getByText(`count: ${item.quantity}`);

      expect(itemName).toBeInTheDocument();
      expect(itemCount).toBeInTheDocument();
    });
  });
});
