"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CountDown } from "@/components/CountDown";
import { ChallengeService } from "@/services/challenge.service";
import { OneChallengeList } from "@/components/ChallengeList/OneChallengeList";
import { Button } from "@/components/Button";
import { StorageHelper } from "@/helpers/StorageHelper";
import { useForm } from "react-hook-form";
import { BetService } from "@/services/bet.service";
import toast from "react-hot-toast";

export default function ChallengeId({ params }: any) {
  const gameId = Number(params.gameid);
  const [challenge, setChallenge] = useState<any>();
  const { register, handleSubmit } = useForm();
  const user = StorageHelper.getItem("user");
  const [loading, setLoading] = useState(false);
  const [hash, setHash] = useState("");
  const [shipId, setShipId] = useState(0);

  useEffect(() => {
    async function getArrays() {
      const { getBets, getNotAvailableShips, getChallengePoints } =
        ChallengeService;
      const bets = await getBets(gameId);
      console.log(bets)
      const points = await getChallengePoints(gameId);
      const challenges = await getNotAvailableShips();
      const challenge = challenges?.find(
        (e: any) => Number(e.gameid) === gameId
      );
      const infoChallenge = { ...challenge, bets, points };
      setChallenge(infoChallenge);
    }

    getArrays();
  }, [gameId]);

  async function onBet(values: any) {
    setLoading(true);
    const res = await BetService.onBetOnChallenge(
      user.id,
      gameId,
      values.amount,
      shipId
    );
    console.log(res);
    toast.success("Success! Check on polygonscan");
    setHash(res);
    setLoading(false);
  }
  const choice =
    challenge?._choice === 0 ? 12 : challenge?._choice === 1 ? 24 : 48;

  return (
    <section className="py-40 pt-60 px-[15%] min-h-screen bg-ship bg-no-repeat bg-center bg-cover">
      <dialog id="onBet" className="modal flex items-center justify-center">
        <div className="modal-box h-auto flex flex-col justify-between">
          <form
            onSubmit={handleSubmit(onBet)}
            className="flex flex-col items-center justify-center text-center"
          >
            <h1 className="text-4xl">SET YOUR BET!</h1>
            <h1 className="text-sm mt-4">
              Choose your favorite ship or player and set the amount of your
              wager. Fortune favors the bold - bet now and get ready for big
              rewards!
            </h1>
            <div className="w-full flex flex-col gap-4 mt-8">
              <input
                type="number"
                min={101}
                {...register("amount")}
                placeholder="AMOUNT USD"
                className="rounded bg-[#EFEFEF] bg-opacity-20 text-[#EFEFEF] font-nexa p-4 px-6 w-full"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-start">
              <h1 className="text-xs normal-case text-start tracking-wide my-4">
                SHIP ID: {shipId}
              </h1>
              {hash && (
                <a
                  target="_blank"
                  href={`https://amoy.polygonscan.com/tx/${hash}`}
                  className="text-xs normal-case text-blue-400 text-start tracking-wide mb-4"
                >
                  See on amoy polygonscan {"->"}
                </a>
              )}
            </div>
            <Button
              loading={loading}
              children={"Claim now"}
              bgColor="yellow"
              type="submit"
              className="mb-4"
            />
            <Button children={"cancel"} bgColor="gray" />
          </form>
        </div>
      </dialog>
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
            {choice} Hours
          </h1>
          <CountDown {...challenge} />
          <h1 className="text-sm text-yellow-primary tracking-[0.5em] mt-10">
            {challenge?._type === 1 ? "OPEN CHALLENGE" : "POINTS ONLY"}
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

      <OneChallengeList setShipId={setShipId} challenge={challenge} />
    </section>
  );
}
