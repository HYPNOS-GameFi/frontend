import { Button } from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export function ObjectThree() {
  return (
    <div className="flex items-center justify-between gap-32">
      <Image
        src={"/images/object3.png"}
        alt="logo"
        width={10000}
        height={10000}
        draggable={false}
        className="w-[400px]"
      />
      <div className="flex flex-col items-start gap-8 w-3/5">
        <h1 className="flex items-center gap-4 text-lg uppercase">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M24 0L12 12L24 12L24 0Z" fill="#FAF117" />
            <path
              d="M-5.24537e-07 12L12 12L12 -5.24537e-07L-5.24537e-07 12Z"
              fill="#FAF117"
            />
            <path d="M24 12L12 24L24 24L24 12Z" fill="#FAF117" />
            <path
              d="M-1.04907e-06 24L12 24L12 12L-1.04907e-06 24Z"
              fill="#FAF117"
            />
          </svg>
          MAKE HIGH BETS
        </h1>
        <h1 className="text-4xl uppercase">
          Don't have a ship? No problem, bet on the challenges and earn money!
        </h1>
        <p className="text-sm">
          Each challenge has its betting time window and will be open for any
          user to bet on their favorite ship. If you win, you will receive a
          significant slice of the total bet.
        </p>
        <div className="w-full space-x-10 flex items-center">
          <Link href={"/challenge"} className="w-1/2">
            <Button
              children={"DO YOUR BET NOW"}
              bgColor="transparent"
              className="uppercase"
            />
          </Link>

          <Link href={"/profile"} className="flex items-center gap-2">
            MANAGE YOUR BETS
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
      </div>
    </div>
  );
}
