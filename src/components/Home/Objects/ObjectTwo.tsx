import { Button } from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export function ObjectTwo() {
  return (
    <div className="flex items-center justify-between gap-32">
      <Image
        src={"/images/object2.png"}
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
            <path
              d="M12 24C12 17.3727 6.62731 12 0 12C6.62731 12 12 6.62731 12 0C12 6.62731 17.3727 12 24 12C17.3727 12 12 17.3727 12 24Z"
              fill="#FAF117"
            />
          </svg>
          PLAY IN YOUR own WAY
        </h1>
        <h1 className="text-4xl uppercase">
          Take on challenges and in addition to points, earn money and compete
          for airdrops!
        </h1>
        <p className="text-sm">
          All your score is linked to your address and the challenges you've
          participated in, think of this as your reputation. The value you earn
          in the challenges is partly sent directly to you and another part goes
          to your future finances on our platform. Everything is transparent and
          audited.
        </p>
        <div className="w-full space-x-10 flex items-center">
          <Link href={"/shooter"} className="w-1/2">
            <Button
              children={"PLAY HYPNOS SHOOTER"}
              bgColor="transparent"
              className="uppercase"
            />
          </Link>

          <Link href={"/challenge"} className="flex items-center gap-2">
            GET A CHALLENGE
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
