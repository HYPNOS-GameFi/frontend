"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CountDown } from "@/components/CountDown";
import { ChallengeService } from "@/services/challenge.service";
import { OneChallengeList } from "@/components/ChallengeList/OneChallengeList";

export default function ChallengeId({ params }: any) {
  const gameId = Number(params.gameid);
  const [challenge, setChallenge] = useState<any>();

  useEffect(() => {
    async function getArrays() {
      const { getBets, getNotAvailableShips, getChallengePoints } =
        ChallengeService;
      const bets = await getBets(gameId);
      const points = await getChallengePoints(gameId);
      const challenges = await getNotAvailableShips();
      console.log(challenges);
      const challenge = challenges?.find(
        (e: any) => Number(e.gameid) === gameId
      );
      const infoChallenge = { ...challenge, bets, points };
      console.log(infoChallenge);
      setChallenge(infoChallenge);
    }

    getArrays();
  }, [gameId]);

  console.log(challenge)

  return (
    <section className="py-40 pt-60 px-[15%] min-h-screen bg-ship bg-no-repeat bg-center bg-cover">
      <div className="flex items-center justify-center gap-40">
        <Image
          src={"/gameImages/nave1.png"}
          alt="logo"
          width={10000}
          height={10000}
          draggable={false}
          className="w-[400px]"
        />
        <div className="uppercase text-center">
          <h1 className="text-3xl">Challenge</h1>
          <h1 className="flex items-center mb-4 mt-6 text-sm gap-4 text-center justify-center text-white text-opacity-50">
            JUNE 02 - JUNE 04 <h1 className="text-sm">02 days</h1>
          </h1>
          <CountDown
            timestamp1={challenge?.blockTimestamp}
            timestamp2={challenge?.blockTimestamp2}
          />
          <h1 className="text-sm text-yellow-primary tracking-[0.5em] mt-10">
            {challenge?._choice === 0 ? "OPEN CHALLENGE" : "POINTS ONLY"}
          </h1>
        </div>
        <Image
          src={"/gameImages/nave1.png"}
          alt="logo"
          width={10000}
          height={10000}
          draggable={false}
          className="w-[400px]"
        />
      </div>

      <OneChallengeList challenge={challenge} />
    </section>
  );
}