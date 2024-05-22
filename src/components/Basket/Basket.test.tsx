import { render, cleanup } from "@testing-library/react";
import { useBasketContext } from "@/hooks/useBasketContext";
import { basketMock } from "@/mocks/basket/basketMock";
import Basket from "./Basket";

jest.mock("@/hooks/useBasketContext");

const useBaskedContextMock = jest.mocked(useBasketContext);

describe("Basket", () => {
  afterEach(() => {
    cleanup();
    useBaskedContextMock.mockReset();
  });

  describe("displays the correct total count of items in the basket", () => {
    test("when there is items in the basket", () => {
      useBaskedContextMock.mockReturnValue({
        basket: basketMock,
        addItemToBasket: jest.fn(),
      });

      const screen = render(<Basket />);

      const expectedNumberOfItemsInTheBasket = basketMock.reduce(
        (acc, item) => {
          return acc + item.quantity;
        },
        0
      );

      const basketHeading = screen.getByText(
        `Basket: ${expectedNumberOfItemsInTheBasket} items`
      );

      expect(basketHeading).toBeInTheDocument();
    });

    test("when there are no items in the basket", () => {
      useBaskedContextMock.mockReturnValue({
        basket: [],
        addItemToBasket: jest.fn(),
      });

      const screen = render(<Basket />);

      const expectedNumberOfItemsInTheBasket = 0;
      const basketHeading = screen.getByText(
        `Basket: ${expectedNumberOfItemsInTheBasket} items`
      );

      expect(basketHeading).toBeInTheDocument();
    });
  });

  test("displays each item in the basket", () => {
    useBaskedContextMock.mockReturnValue({
      basket: basketMock,
      addItemToBasket: jest.fn(),
    });

    const screen = render(<Basket />);

    basketMock.forEach((item) => {
      const basketItem = screen.getByText(
        `${item.name} count: ${item.quantity}`
      );
      expect(basketItem).toBeInTheDocument();
    });
  });
});
