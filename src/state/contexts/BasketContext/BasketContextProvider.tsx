"use client";

import { ReactNode, useState } from "react";
import { CartItem } from "@/types/cart";
import {
  BasketContext,
  initialBasketState,
  BasketContextType,
} from "./BasketContext";

interface CartContextProviderProps {
  children: ReactNode;
  value?: BasketContextType;
}

/**
 * I have managed the state of the cart in app, but it is ideal to manage the cart
 * using a backend endpoint and syncing our state with the cart data returned from the backend.
 *
 * This prevents unncessary business logic from being on our frontend. However, since there is no
 * backend endpoint in this test I have decided to manage the cart in state.
 */
const BasketContextProvider = ({
  children,
  value,
}: CartContextProviderProps) => {
  const { basket } = value ?? initialBasketState;
  const [basketItems, setBasketItems] = useState<CartItem[]>(basket);

  const addItemToBasket = (productName: string, quantity: number) => {
    const matchedItemIndex = basketItems.findIndex((basketItem) => {
      return basketItem?.name === productName;
    });

    if (matchedItemIndex >= 0) {
      /**
       * It isn't recommended to have complex set state callbacks unless necessary due to potential performance implications.
       * To help ensure correct manipulation of the basket quantity and to avoid state synchronisation issues
       * I have used it this time. Again, it would be better for the cart to be managed by a backend service and we just
       * sync the cart with the data from the api.
       * */
      setBasketItems((prev) => {
        const matchedItem = prev[matchedItemIndex];

        // Have to check item wasn't deleted as part of another basket state update
        if (!matchedItem) return prev;

        const updatedItem = {
          ...matchedItem,
          quantity: matchedItem.quantity + quantity,
        };

        const updatedItems = basketItems.slice();
        updatedItems.splice(matchedItemIndex, 1, updatedItem);

        return updatedItems;
      });
    } else {
      setBasketItems((prev) => [...prev, { name: productName, quantity }]);
    }
  };

  return (
    <BasketContext.Provider
      value={{
        basket: basketItems,
        addItemToBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;
