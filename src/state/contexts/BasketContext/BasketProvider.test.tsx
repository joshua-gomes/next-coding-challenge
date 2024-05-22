import { useContext } from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { BasketContext, BasketContextType } from "./BasketContext";
import BasketContextProvider from "./BasketContextProvider";

const mockItem = {
  name: "Item 1",
  quantity: 1,
};

describe("BasketContextProvider", () => {
  afterEach(() => {
    cleanup();
  });

  const TestComponent = () => {
    const { basket, addItemToBasket } = useContext(BasketContext);

    const handleOnClick = () => {
      addItemToBasket(mockItem.name, 1);
    };

    return (
      <>
        <div data-testid="basket-state">{JSON.stringify(basket)}</div>
        <button onClick={handleOnClick}>Add Item To Basket</button>
      </>
    );
  };

  test("provides children components with the expected initial basket state", () => {
    const screen = render(
      <BasketContextProvider>
        <TestComponent />
      </BasketContextProvider>
    );

    const basketState = screen.getByTestId("basket-state");

    expect(basketState.textContent).toEqual(JSON.stringify([]));
  });

  test("provides children with the ability to add items to the basket", async () => {
    const screen = render(
      <BasketContextProvider>
        <TestComponent />
      </BasketContextProvider>
    );

    const addItemToBasketButton = screen.getByRole("button", {
      name: "Add Item To Basket",
    });
    fireEvent.click(addItemToBasketButton);

    await waitFor(() => {
      const basketState = screen.getByTestId("basket-state");
      expect(basketState.textContent).toEqual(JSON.stringify([mockItem]));
    });
  });

  test("allows children to add multiple of the same item to cart", async () => {
    const screen = render(
      <BasketContextProvider>
        <TestComponent />
      </BasketContextProvider>
    );

    const addItemToBasketButton = screen.getByRole("button", {
      name: "Add Item To Basket",
    });
    fireEvent.click(addItemToBasketButton);
    fireEvent.click(addItemToBasketButton);

    await waitFor(() => {
      const basketState = screen.getByTestId("basket-state");
      expect(basketState.textContent).toEqual(
        JSON.stringify([{ name: mockItem.name, quantity: 2 }])
      );
    });
  });
});
