"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button";
import { UserCard } from "@/components/UserCard";
import { Carousel } from "@/components/Carousel";
import { ChallengeList } from "@/components/ChallengeList";

export default function Ships() {
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
            <Link href={"/profile"}>YOUR ACTIVE CHALLENGES</Link>
          </div>
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

      <div className="mt-20 h-full">
        <h1 className="text-5xl mb-10">TOP 10 HYPNOS SHOOTER PLAYERS</h1>
        <Carousel>
          <UserCard
            shipImg="/images/nave4.png"
            address="0x5A56b1e4..."
            challenges={30}
            hours={12}
            score={37}
            shipName="ZEPHYR-7 (STANDARD SHIP)"
          />
          <UserCard
            shipImg="/images/nave2.png"
            address="0x5A56b1e4..."
            challenges={30}
            hours={12}
            score={37}
            shipName="ZEPHYR-7 (STANDARD SHIP)"
          />
          <UserCard
            shipImg="/images/nave2.png"
            address="0x5A56b1e4..."
            challenges={30}
            hours={12}
            score={37}
            shipName="ZEPHYR-7 (STANDARD SHIP)"
          />
        </Carousel>
      </div>
      <div className="flex items-center justify-between gap-4 mt-40">
        <h1 className="text-5xl w-full">AVAILABLE GAMES</h1>
        <Link href={"/pick-challenge"} className="w-full">
          <Button children={"JOIN A BLANK CHALLENGE"} bgColor="transparent" />
        </Link>
      </div>
      <ChallengeList />
    </div>
  );
}
