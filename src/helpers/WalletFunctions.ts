import { ethers } from "ethers";

export const hideAddress = (address: string) => {
  if (address && address.length > 8) {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }
  return address;
};

export const getProvider = () => {
  if (typeof window !== "undefined" && window.ethereum) {
    // @ts-ignore
    return new ethers.providers.Web3Provider(window?.ethereum);
  }
  return null;
};
