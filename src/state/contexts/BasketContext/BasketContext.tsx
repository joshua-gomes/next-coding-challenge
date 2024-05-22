"use client";

import { createContext } from "react";
import type { CartItem } from "@/types/cart";

export interface BasketContextType {
  basket: CartItem[];
  addItemToBasket: (
    name: CartItem["name"],
    quantity: CartItem["quantity"]
  ) => void;
}

export const initialBasketState = {
  basket: [],
  addItemToBasket: () => {},
};

export const BasketContext =
  createContext<BasketContextType>(initialBasketState);
