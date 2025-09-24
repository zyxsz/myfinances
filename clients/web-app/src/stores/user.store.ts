import type { User } from "@/api/interfaces/entities/user.entity";
import { createStore as createZustandStore } from "zustand/vanilla";

namespace UserStore {
  export interface State {
    user: User | null;
  }

  export interface Actions {}

  export type Store = State & Actions;

  export const getInitialState = (): Store => {
    return {
      user: null,
    };
  };

  export const createStore = (initState: Store) => {
    return createZustandStore<Store>()((set) => ({
      ...initState,
    }));
  };
}

export default UserStore;
