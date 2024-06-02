"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button";
import { ShipCard } from "@/components/ShipCard";
import { shipsData } from "@/constants";
import { MintService } from "@/services/mint.service";
import { StorageHelper } from "@/helpers/StorageHelper";

export default function Ships() {
  async function onBuyRandomShip() {
    const user = await StorageHelper.getItem("user");
    console.log(user);
    const res = await MintService.onMintRandomize(user.id);
    console.log(res);
  }

  return (
    <div className="py-40 px-[15%] min-h-screen bg-ship bg-no-repeat bg-center bg-cover ">
      <div className="flex items-center justify-between ">
        <div className=" flex flex-col items-start justify-center gap-4 w-[50%]">
          <h1 className="uppercase text-[36px] font-nexa leading-tight">
            Dominate the Space: Choose from Different Models to Maximize Your
            Potential
          </h1>
          <p className="font-sora text-sm">
            Invest in the Best Ship to Boost Your Rewards: The Better Your Ship,
            the Greater Your Achievements and Rewards in the Game!
          </p>
          <div className="w-full space-x-10 mt-6 flex items-center">
            <Link href={"/shooter"} className="w-1/2">
              <Button
                children={"PLAY HYPNOS SHOOTER"}
                bgColor="transparent"
                className="uppercase"
              />
            </Link>

            <Link href={"/ships"}>VIEW YOUR SHIPS</Link>
          </div>
        </div>
        <Image
          src={"/images/three_triangules.png"}
          alt="logo"
          width={10000}
          height={10000}
          draggable={false}
          className="w-[500px]"
        />
      </div>
      <div className="grid grid-cols-2 gap-10 mt-20">
        {shipsData.map((e, i) => (
          <ShipCard key={i} {...e} />
        ))}
      </div>
      <div className="flex items-center justify-center mt-20">
        <Button
          children={"buy random ship (0.25 ETH)"}
          onClick={onBuyRandomShip}
          width="w-1/3"
        />
      </div>
    </div>
  );
}
