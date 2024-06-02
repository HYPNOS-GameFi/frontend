"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../Button";
import { usePathname } from "next/navigation";
import { WalletService } from "@/services/wallet.service";
import { StorageHelper } from "@/helpers/StorageHelper";
import { userStore } from "@/stores/userStore";
import { hideAddress } from "@/helpers/WalletFunctions";
import { MintService } from "@/services/mint.service";
import toast from "react-hot-toast";
import { useState } from "react";

export function Header() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const { setAddress, address } = userStore();
  const { setItem, getItem } = StorageHelper;
  const user = getItem("user");
  const hiddenAddress = hideAddress(address);

  if (pathname === "/shooter") return null;

  async function onCreateWallet() {
    const { createWallet } = WalletService;
    const res = await createWallet();
    if (res) {
      setItem("user", res);
      setAddress(res.address);
    }
  }

  async function onBuyUsd() {
    setLoading(true);
    const res = await MintService.onMintUSD(user.id, address);
    console.log(res);
    toast.success(`Minted: ${res.transactionHash}`);
    console.log(res);
    setLoading(false);
  }

  return (
    <div className="w-full h-[100px] flex items-end justify-center fixed top-0 z-[9999] backdrop-blur-sm">
      <div className="flex items-center justify-center w-full gap-10 px-[15%]">
        <Image
          src={"/images/hypnos_logo.png"}
          alt="logo"
          width={10000}
          height={10000}
          draggable={false}
          className="w-[225px]"
        />
        <div className="bg-[#EFEFEF26] font-nexa rounded-md uppercase h-[64px] text-sm w-full gap-8 pr-4 pl-24 flex items-center justify-between">
          <Link href={"/"}>
            <h1 className={`${pathname === "/" && "text-yellow-primary"}`}>
              Home
            </h1>
          </Link>
          <Link href={"/#about"}>
            <h1
              className={`${pathname === "/#about" && "text-yellow-primary"}`}
            >
              About
            </h1>
          </Link>
          <Link href={"/#triad"}>
            <h1
              className={`${pathname === "/#triad" && "text-yellow-primary"}`}
            >
              Triad
            </h1>
          </Link>
          <div className="h-[24px] w-[2px] bg-[#EFEFEF80]" />
          <Link href={"/ships"}>
            <h1 className={`${pathname === "/ships" && "text-yellow-primary"}`}>
              Ships
            </h1>
          </Link>
          <Link href={"/challenge"}>
            <h1
              className={`${
                pathname === "/challenge" && "text-yellow-primary"
              }`}
            >
              Challenge
            </h1>
          </Link>
          <Link href={"/profile"}>
            <h1
              className={`${pathname === "/profile" && "text-yellow-primary"}`}
            >
              Profile
            </h1>
          </Link>
          <div className="flex items-center gap-4 pl-4">
            <Button
              children={"Buy bet usd"}
              bgColor="gray"
              loading={loading}
              height="h-[36px]"
              onClick={onBuyUsd}
              width="w-auto"
              className="uppercase"
            />

            <Button
              children={address ? hiddenAddress : "Wallet"}
              height="h-[36px]"
              width="w-auto"
              className="uppercase"
              disabled={!!address}
              onClick={onCreateWallet}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
