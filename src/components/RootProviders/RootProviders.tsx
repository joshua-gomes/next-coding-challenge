"use client";

import { ReactNode } from "react";
import BasketContextProvider from "@/state/contexts/BasketContext/BasketContextProvider";

interface RootProvidersProps {
  children: ReactNode;
}

const RootProviders = ({ children }: RootProvidersProps) => {
  return <BasketContextProvider>{children}</BasketContextProvider>;
};

export default RootProviders;
