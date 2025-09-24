"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import UserStore from "./user.store";
import { useStore as useZustandStore } from "zustand";

export type UserStoreApi = ReturnType<typeof UserStore.createStore>;

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined
);

export const UserStoreProvider = ({
  children,
  defaultState,
}: {
  children: ReactNode;
  defaultState: Partial<UserStore.State>;
}) => {
  const storeRef = useRef<UserStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = UserStore.createStore({
      ...UserStore.getInitialState(),
      ...defaultState,
    });
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = <T,>(
  selector: (store: UserStore.Store) => T
): T => {
  const counterStoreContext = useContext(UserStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useZustandStore(counterStoreContext, selector);
};
