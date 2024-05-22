import { useContext } from "react";
import { BasketContext } from "@/state/contexts/BasketContext";

export const useBasketContext = () => {
  return useContext(BasketContext);
};
