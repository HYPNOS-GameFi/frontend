import { StorageHelper } from "@/helpers/StorageHelper";
import { MintService } from "@/services/mint.service";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "../Modal";
import { userStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { ChallengeService } from "@/services/challenge.service";
import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  multiplier: number;
  description: string;
  shots: number;
  hp: number;
  cooldown: number;
  price: number;
  shipImg: string;
  myShip?: boolean;
  score?: number;
  challenges?: number;
  id: number;
  isChallenge?: boolean;
  openChallenge?: (user: any, shipId: number) => void;
};

export function ShipCard({
  title,
  subtitle,
  multiplier,
  description,
  shots,
  hp,
  cooldown,
  price,
  shipImg,
  myShip = false,
  score,
  challenges,
  id,
  isChallenge = false,
  openChallenge,
}: Props) {
  const [shipId, setShipId] = useState(0);
  const [loading, setLoading] = useState(false);
  const user = StorageHelper.getItem("user");
  const modalId = `ship_modal${id}`;
  const { setPlayingShip } = userStore();
  const { push } = useRouter();

  async function onSetPlay() {
    setPlayingShip(id);
    push("/shooter");
  }

  async function onBuyShip() {
    try {
      setLoading(true);
      const res = await MintService.onMintClass(user.id, id);
      toast.success(`Success: ${res?.hash}`);
      const modal: any = document.getElementById(modalId);
      await modal.showModal();
      setShipId(res?.id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function onBurnClass() {
    try {
      setLoading(true);
      const res = await MintService.onRandomizeClass(user.id, id);
      toast.success(`Success: ${res.transactionHash}`);
      const modal: any = document.getElementById(modalId);
      if (res) await modal.showModal();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function onOpenChallenge() {
    try {
      setLoading(true);
      const res = await ChallengeService.onOpenChallenge(user.id, id, 0, 0);
      toast.success(`Success: ${res.transactionHash}`);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="rounded-md overflow-hidden bg-shipCard bg-no-repeat bg-center bg-cover h-[444px] relative flex flex-col items-start justify-center p-8">
      {!myShip && (
        <Modal id={modalId} title={title} subtitle={subtitle} shipId={shipId} />
      )}
      <div className="absolute top-0 left-0 flex items-center justify-center p-4 px-6 bg-white text-black font-nexa text-xs uppercase gap-4 rounded-br-md">
        {multiplier}x score multiplier
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

      <div className="flex flex-col">
        <h1 className="text-[32px] uppercase" children={title} />
        <h1
          className="text-sm text-yellow-primary tracking-widest"
          children={subtitle}
        />
        {myShip ? (
          <>
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
          </>
        ) : (
          <p className="font-sora text-sm mt-6 w-3/5" children={description} />
        )}
      </div>
      {!myShip && (
        <div className="uppercase flex flex-col gap-2 mt-10">
          <div className="flex items-center gap-8">
            <h1 className="text-[14px]">ATK: {shots} shot/sec</h1>
            <h1 className="text-[14px]">HP: {hp}</h1>
          </div>
          <h1 className="text-[14px] text-white text-opacity-50">
            <span className="text-yellow-primary font-nexa">{cooldown}</span>{" "}
            HOURS COOLDOWN
          </h1>
        </div>
      )}

      {myShip ? (
        <div className="absolute bottom-0 left-0 w-1/2 flex flex-col gap-4">
          <Link href={"/create-challenge"} className="w-full">
            <button className="flex items-center justify-center p-4 px-6 bg-yellow-primary text-black font-nexa text-xs uppercase gap-4 rounded-r-md w-full">
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
          </Link>

          <button
            onClick={onBurnClass}
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

            {loading ? "Loading..." : `Burn the ship`}
          </button>
        </div>
      ) : isChallenge && openChallenge ? (
        <button
          onClick={() => openChallenge(user, id)}
          className="absolute bottom-0 left-0 w-1/2 flex items-center justify-center p-4 px-6 bg-yellow-primary text-black font-nexa text-xs uppercase gap-4 rounded-tr-md"
        >
          <svg
            width="15"
            height="12"
            viewBox="0 0 15 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.4286 12L7.50061 0L0.572266 12H14.4286ZM7.50977 9.9375C8.75232 9.9375 9.75977 8.93015 9.75977 7.6875C9.75977 6.44485 8.75232 5.4375 7.50977 5.4375C6.26721 5.4375 5.25977 6.44485 5.25977 7.6875C5.25977 8.93015 6.26721 9.9375 7.50977 9.9375Z"
              fill="#111111"
            />
          </svg>
          {loading ? "Loading..." : `APPLY FOR CHALLENGE`}
        </button>
      ) : (
        <button
          onClick={onBuyShip}
          className="absolute bottom-0 left-0 w-1/2 flex items-center justify-center p-4 px-6 bg-yellow-primary text-black font-nexa text-xs uppercase gap-4 rounded-tr-md"
        >
          <svg
            width="15"
            height="12"
            viewBox="0 0 15 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.4286 12L7.50061 0L0.572266 12H14.4286ZM7.50977 9.9375C8.75232 9.9375 9.75977 8.93015 9.75977 7.6875C9.75977 6.44485 8.75232 5.4375 7.50977 5.4375C6.26721 5.4375 5.25977 6.44485 5.25977 7.6875C5.25977 8.93015 6.26721 9.9375 7.50977 9.9375Z"
              fill="#111111"
            />
          </svg>
          {loading ? "Loading..." : `BUY SHIP (${price} ETH)`}
        </button>
      )}

      {myShip && (
        <button
          onClick={onSetPlay}
          className="flex items-center justify-center absolute bottom-0 right-0 p-4 px-6 bg-yellow-primary text-black font-nexa z-50 text-xs uppercase gap-4 rounded-tl-md"
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
          Play
        </button>
      )}

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
