"use client";
import { StorageHelper } from "@/helpers/StorageHelper";
import { ChallengeService } from "@/services/challenge.service";
import { WalletService } from "@/services/wallet.service";
import { useEffect, useState } from "react";

export function UserScore({
  setShips,
  ships,
}: {
  setShips: (ships: any) => void;
  ships: any[];
}) {
  const user = StorageHelper.getItem("user");
  const [challengs, setChallengs] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const address = user?.address;
    WalletService.getUserShips(address)
      .then((ships) => setShips(ships))
      .catch((e) => console.error(e));

    ChallengeService.getChallengesFinalizeds(address)
      .then((challengs) => setChallengs(challengs))
      .catch((e) => console.log(e));

    WalletService.getPointsProfile(address)
      .then((challengs) => setPoints(challengs))
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="uppercase flex items-start justify-between w-full mb-20">
      <div className="flex flex-col items-end mt-2">
        <h1 className="text-5xl">your total score</h1>
        <h1 className="text-[84px] text-yellow-primary">
          {points ? points : "0"}
        </h1>
      </div>
      <div className="flex flex-col items-start w-1/2">
        <div className="flex items-center justify-between gap-8 w-full">
          <div className="flex items-center gap-4">
            <h1 className="text-[54px]">
              {challengs === 0 ? "00" : challengs}
            </h1>
            <div className="flex flex-col items-start">
              <h1>CHALLENGES WON</h1>
              <p className="font-extralight text-white text-opacity-50">
                0 DEFEATED OPONENTS | {ships.length} Ships CREATED
              </p>
            </div>
          </div>
          <svg
            width="42"
            height="36"
            viewBox="0 0 42 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M42.0006 36L21.2167 0L0.431641 36H42.0006ZM21.2441 29.8125C24.9718 29.8125 27.9941 26.7904 27.9941 23.0625C27.9941 19.3346 24.9718 16.3125 21.2441 16.3125C17.5165 16.3125 14.4941 19.3346 14.4941 23.0625C14.4941 26.7904 17.5165 29.8125 21.2441 29.8125Z"
              fill="#FAF117"
            />
          </svg>
        </div>

        <div className="flex items-center justify-between gap-8 w-full">
          <div className="flex items-center gap-4">
            <h1 className="text-[54px]">00</h1>
            <div>
              <h1>HOURS OF SPACE FLIGHT</h1>
              <p className="font-extralight text-white text-opacity-50">
                Your ship is traveling a great distance!
              </p>
            </div>
          </div>

          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 36C18 26.059 9.94097 18 0 18C9.94097 18 18 9.94097 18 0C18 9.94097 26.059 18 36 18C26.059 18 18 26.059 18 36Z"
              fill="#FAF117"
            />
          </svg>
        </div>

        <div className="flex items-center justify-between gap-8 w-full">
          <div className="flex items-center gap-4">
            <h1 className="text-[54px]">23</h1>
            <div>
              <h1>Bets Participated In</h1>
              <p className="font-extralight text-white text-opacity-50">
                15 WON BETS | Total Amount Bet: $ 341,67 USD
              </p>
            </div>
          </div>

          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M36 0L18 18L36 18L36 0Z" fill="#FAF117" />
            <path
              d="M-7.86805e-07 18L18 18L18 -7.86805e-07L-7.86805e-07 18Z"
              fill="#FAF117"
            />
            <path d="M36 18L18 36L36 36L36 18Z" fill="#FAF117" />
            <path
              d="M-1.57361e-06 36L18 36L18 18L-1.57361e-06 36Z"
              fill="#FAF117"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
