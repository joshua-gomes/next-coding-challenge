import {
  fireEvent,
  getByRole,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import Home from "@/app/page";
import RootProviders from "@/components/RootProviders";
import { productsMock } from "@/mocks/products/productsMock";

/**
 * For an intergration test I would stub the actual endpoint itself and test against it.
 * Since we aren't calling an API yet in this project I am just using the same mock used by the
 * homepage at the moment.
 */
const [itemOne, itemTwo] = productsMock;

describe("Home", () => {
  it("initially renders an empty basket", () => {
    render(
      <RootProviders>
        <Home />
      </RootProviders>
    );

    const expectedHeader = "Basket: 0 items";
    const basketButton = screen.getByRole("heading", {
      name: expectedHeader,
    });

    expect(basketButton).toHaveTextContent(expectedHeader);
  });

  it("increments the basket items counter when an item is added to the basket", async () => {
    render(
      <RootProviders>
        <Home />
      </RootProviders>
    );

    const button = screen.getByRole("button", {
      name: `Add "${itemOne.name}" to basket`,
    });
    fireEvent.click(button);

    const expectedHeading = "Basket: 1 items";
    const basketButton = await screen.findByRole("heading", {
      name: "Basket: 1 items",
    });

    expect(basketButton).toHaveTextContent(expectedHeading);
  });

  it("increments the basket items counter correctly when multiple products are added to the basket", () => {
    render(
      <RootProviders>
        <Home />
      </RootProviders>
    );

    const itemOneProductCard = screen.getByRole("button", {
      name: `Add "${itemOne.name}" to basket`,
    });
    fireEvent.click(itemOneProductCard);

    const itemTwoProductCard = screen.getByRole("button", {
      name: `Add "${itemTwo.name}" to basket`,
    });
    fireEvent.click(itemTwoProductCard);
    fireEvent.click(itemTwoProductCard);

    const expectedHeader = "Basket: 3 items";
    const basketButton = screen.getByRole("heading", {
      name: expectedHeader,
    });

    expect(basketButton).toBeInTheDocument();
  });

  it("when adding an item to the basket it is displayed in the basket", async () => {
    render(
      <RootProviders>
        <Home />
      </RootProviders>
    );

    const productCard = screen.getByRole("button", {
      name: `Add "${itemOne.name}" to basket`,
    });
    fireEvent.click(productCard);

    const basket = screen.getByRole("list", {
      name: "Basket items",
    });

    const basketItem = getByRole(basket, "listitem");

    expect(basketItem).toHaveTextContent(`${itemOne.name} count: 1`);
  });

  it("when adding different items with varying quantities to the basket it renders the basket items correctly", async () => {
    render(
      <RootProviders>
        <Home />
      </RootProviders>
    );

    const itemOneProductCard = screen.getByRole("button", {
      name: `Add "${itemOne.name}" to basket`,
    });
    fireEvent.click(itemOneProductCard);

    const itemTwoProductCard = screen.getByRole("button", {
      name: `Add "${itemTwo.name}" to basket`,
    });
    fireEvent.click(itemTwoProductCard);
    fireEvent.click(itemTwoProductCard);

    const basket = screen.getByRole("list", {
      name: "Basket items",
    });

    const itemOneBasketItem = getByText(basket, `${itemOne.name} count: 1`);
    const itemTwoBasketItem = getByText(basket, `${itemTwo.name} count: 2`);

    expect(itemOneBasketItem).toBeInTheDocument();
    expect(itemTwoBasketItem).toBeInTheDocument();
  });
});
