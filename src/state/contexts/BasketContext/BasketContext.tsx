"use client";

import { createContext } from "react";
import type { BasketItem } from "@/types/basket";

export interface BasketContextType {
  basket: BasketItem[];
  addItemToBasket: (
    name: BasketItem["name"],
    quantity: BasketItem["quantity"]
  ) => void;
}

export const initialBasketState = {
  basket: [],
  addItemToBasket: () => {},
};

export const BasketContext =
  createContext<BasketContextType>(initialBasketState);
