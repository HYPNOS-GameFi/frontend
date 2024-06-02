import { hideAddress } from "@/helpers/WalletFunctions";
import { create } from "zustand";

export interface IUserStore {
  address: string;
  hiddenAddress: string;
  setAddress: (address: string) => void;
  playingShip: number;
  setPlayingShip: (playingShip: number) => void;
}

export const userStore = create<IUserStore>((set, get) => ({
  address: "",
  hiddenAddress: "",
  setAddress: (address) =>
    set(() => ({
      address,
      hideAddress: hideAddress(address),
    })),
  playingShip: 0,
  setPlayingShip: (playingShip) => set({ playingShip }),
}));
