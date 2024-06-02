"use client";
import { StorageHelper } from "@/helpers/StorageHelper";
import { BetService } from "@/services/bet.service";
import { ChallengeService } from "@/services/challenge.service";
import Image from "next/image";

type Props = {
  address: string;
  shipName: string;
  hours: number;
  score: number;
  challenges: number;
  shipImg: string;
};

export function UserCard({
  address,
  shipName,
  hours,
  score,
  challenges,
  shipImg,
}: Props) {
  const user = StorageHelper.getItem("user");

  async function onChallenge() {
    const res = await ChallengeService.onPlayChallenge(user.id, 1, 0, 2);
    console.log(res);
  }

  async function onBet() {
    /* const res = await BetService.onBetOnChallenge(user.id, 1, 10, 7);
    console.log(res); */
  }

  return (
    <div className="rounded-md overflow-hidden bg-shipCard bg-no-repeat bg-center bg-cover h-[444px] relative flex flex-col items-start justify-center p-8">
      <div className="absolute top-0 left-0 flex items-center justify-center p-4 px-6 bg-white text-black font-nexa text-xs uppercase gap-4 rounded-br-md">
        {hours} HOURS CHALLENGE
        <svg
          width="62"
          height="12"
          viewBox="0 0 62 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.8563 12L6.92834 0L0 12H13.8563ZM6.9375 9.9375C8.18005 9.9375 9.1875 8.93015 9.1875 7.6875C9.1875 6.44485 8.18005 5.4375 6.9375 5.4375C5.69495 5.4375 4.6875 6.44485 4.6875 7.6875C4.6875 8.93015 5.69495 9.9375 6.9375 9.9375Z"
            fill="#111111"
          />
          <path
            d="M31.8564 12C31.8564 8.68635 29.1701 6 25.8564 6C29.1701 6 31.8564 3.31366 31.8564 0C31.8564 3.31366 34.5428 6 37.8564 6C34.5428 6 31.8564 8.68635 31.8564 12Z"
            fill="#111111"
          />
          <path d="M61.8564 0L55.8564 6L61.8564 6L61.8564 0Z" fill="#111111" />
          <path
            d="M49.8564 6L55.8564 6L55.8564 -2.62268e-07L49.8564 6Z"
            fill="#111111"
          />
          <path
            d="M61.8564 6L55.8564 12L61.8564 12L61.8564 6Z"
            fill="#111111"
          />
          <path
            d="M49.8564 12L55.8564 12L55.8564 6L49.8564 12Z"
            fill="#111111"
          />
        </svg>
      </div>

      <div className="flex flex-col uppercase mb-20">
        <h1 className="text-[32px]" children={address} />
        <h1
          className="text-sm text-yellow-primary tracking-widest"
          children={shipName}
        />

        <h1 className="text-sm mt-4" children={"CURRENT SCORE:"} />
        <h1
          className="text-sm text-yellow-primary"
          children={`${score} HYPNOS POINTS`}
        />

        <h1 className="text-sm" children={"Challenges Won:"} />
        <h1
          className="text-sm text-yellow-primary"
          children={`${challenges} CHALLENGES`}
        />
      </div>

      <div className="absolute bottom-0 left-0 w-1/2 flex flex-col gap-4">
        <button
          onClick={onChallenge}
          className="flex items-center justify-center p-4 px-6 bg-yellow-primary text-black font-nexa text-xs uppercase gap-4 rounded-r-md"
        >
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.47461 12C6.47461 8.68635 3.78826 6 0.474609 6C3.78826 6 6.47461 3.31366 6.47461 0C6.47461 3.31366 9.16095 6 12.4746 6C9.16095 6 6.47461 8.68635 6.47461 12Z"
              fill="#111111"
            />
          </svg>
          challenge player
        </button>

        <button
          onClick={onBet}
          className="flex items-center justify-center p-4 px-6 bg-yellow-primary text-black font-nexa text-xs uppercase gap-4 rounded-tr-md"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0L6 6L12 6L12 0Z" fill="#111111" />
            <path
              d="M-2.62268e-07 6L6 6L6 -2.62268e-07L-2.62268e-07 6Z"
              fill="#111111"
            />
            <path d="M12 6L6 12L12 12L12 6Z" fill="#111111" />
            <path
              d="M-5.24537e-07 12L6 12L6 6L-5.24537e-07 12Z"
              fill="#111111"
            />
          </svg>
          Make a bet
        </button>
      </div>

      <Image
        src={shipImg}
        alt="logo"
        width={10000}
        height={10000}
        draggable={false}
        className="absolute right-0 top-0 w-[35%]"
      />
    </div>
  );
}
