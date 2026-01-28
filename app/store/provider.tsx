"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { initializeUser } from "./Userdata_slice";

function StoreInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize user data from localStorage on mount
    store.dispatch(initializeUser());
  }, []);

  return <>{children}</>;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StoreInitializer>{children}</StoreInitializer>
    </Provider>
  );
}
