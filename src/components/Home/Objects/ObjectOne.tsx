import { Button } from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export function ObjectOne() {
  return (
    <div className="flex items-center justify-between gap-32">
      <Image
        src={"/images/object1.png"}
        alt="logo"
        width={10000}
        height={10000}
        draggable={false}
        className="w-[400px]"
      />
      <div className="flex flex-col items-start gap-8 w-3/5">
        <h1 className="flex items-center gap-4 text-lg uppercase">
          <svg
            width="28"
            height="24"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M27.7126 24L13.8567 0L0 24H27.7126ZM13.875 19.875C16.3601 19.875 18.375 17.8603 18.375 15.375C18.375 12.8897 16.3601 10.875 13.875 10.875C11.3899 10.875 9.375 12.8897 9.375 15.375C9.375 17.8603 11.3899 19.875 13.875 19.875Z"
              fill="#FAF117"
            />
          </svg>
          mint ships
        </h1>
        <h1 className="text-4xl uppercase">
          Mint your ship with the class that suits you best. better the class,
          better THE benefits and greater earnings!
        </h1>
        <p className="text-sm">
          There are 4 types of classes with different values, each class can
          only challenge another ship of the same class. Your ship accumulates
          points as you play on our platform.
        </p>
        <div className="w-full space-x-10 flex items-center">
          <Link href={"/ships"} className="w-1/2">
            <Button
              children={"CHOOSE YOUR SHIP"}
              bgColor="transparent"
              className="uppercase"
            />
          </Link>
          <Link href={"/ships"} className="flex items-center gap-2">
            VIEW YOUR SHIPS
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
