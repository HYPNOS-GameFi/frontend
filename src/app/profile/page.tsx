"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Carousel } from "@/components/Carousel";
import { ChallengeList } from "@/components/ChallengeList";
import { ShipCard } from "@/components/ShipCard";
import { UserScore } from "@/components/UserScore";
import { UserPool } from "@/components/UserPool";
import { BetsList } from "@/components/BetsList";
import { StorageHelper } from "@/helpers/StorageHelper";
import { ChallengeService } from "@/services/challenge.service";
import { MintService } from "@/services/mint.service";
import { BetService } from "@/services/bet.service";
import { useState } from "react";
import { shipsData } from "@/constants";

export default function Profile() {
  const user = StorageHelper.getItem("user");
  const [ships, setShips] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  async function onPick() {
    setLoading(true);
    const res = await ChallengeService.onPickChallenge(user.id, 1, 2);
    console.log(res);
    setLoading(false);
  }

  async function onClaimBet(values: any) {
    setLoading(true);
    console.log(values);
    const res = await BetService.onClaimBet(user.id, 1);
    console.log(res);
    setLoading(false);
  }

  async function onClaimPool() {
    setLoading(true);
    const res = await MintService.onClaimPool(user.id);
    console.log(res);
    setLoading(false);
  }

  return (
    <div className="py-40 px-[15%] w-full min-h-screen bg-ship bg-no-repeat bg-center bg-cover">
      <UserScore setShips={setShips} ships={ships} />
      <div>
        <div id="your-ships" className="flex items-center mb-10 gap-8">
          <h1 className="text-5xl">YOUR SHIPS</h1>
          <Link className="text-sm flex items-center gap-2" href={"/ships"}>
            BUY MORE SHIPS
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-2.46153e-07 5.63131L-1.90961e-07 4.36869L7.57576 4.36869L4.10354 0.896464L5 -2.18557e-07L10 5L5 10L4.10353 9.10354L7.57576 5.63131L-2.46153e-07 5.63131Z"
                fill="#EFEFEF"
              />
            </svg>
          </Link>
        </div>
        <Carousel>
          {ships.map((e: any, i: number) => (
            <ShipCard
              key={i}
              {...shipsData[e._shipClass]}
              isChallenge={false}
              id={e._tokenId}
              myShip
              challenges={0}
              score={0}
            />
          ))}
        </Carousel>
      </div>
      <div className="flex items-center justify-between mt-32">
        <div className=" flex flex-col items-start justify-center gap-4 w-[50%]">
          <h1 className="uppercase text-[36px] font-nexa leading-tight">
            Exchange Your Score for an Exciting New Ship!
          </h1>
          <p className="font-sora text-sm">
            Burn your current ship and receive a random new ship for a minimal
            fee. Your score will be reset, but the reward might be worth it!
          </p>
          <Link href={"/profile#your-ships"} className="w-full space-x-10 mt-6">
            <Button
              children={"Burn your ships now"}
              bgColor="transparent"
              className="uppercase"
            />
          </Link>
        </div>
        <Image
          src={"/images/challenges_home.png"}
          alt="logo"
          width={10000}
          height={10000}
          draggable={false}
          className="w-[500px]"
        />
      </div>
      <div className="flex items-center justify-between gap-4 mt-40">
        <h1 className="text-5xl w-full">YOUR CHALLENGES</h1>
        <Button
          onClick={onPick}
          children={"JOIN A BLANK CHALLENGE"}
          bgColor="transparent"
          width="w-full"
        />
      </div>
      <ChallengeList />
      <UserPool
        loading={loading}
        claimBet={onClaimBet}
        claimPool={onClaimPool}
      />
      <h1 className="text-5xl w-full">YOUR BETS HISTORY</h1>
      <BetsList />
    </div>
  );
}
