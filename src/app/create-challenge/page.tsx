"use client";
import { Button } from "@/components/Button";
import { Carousel } from "@/components/Carousel";
import { ShipCard } from "@/components/ShipCard";
import { shipsData } from "@/constants";
import { StorageHelper } from "@/helpers/StorageHelper";
import { ChallengeService } from "@/services/challenge.service";
import { WalletService } from "@/services/wallet.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CreateChallenge() {
  const [ships, setShips] = useState<any[]>([]);
  const [shipId, setShipId] = useState(0);
  const [bet, setBet] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timeChallenge, setTimeChallenge] = useState(0);
  const [shipsChallenges, setShipsChallenges] = useState<any[]>([]);
  const user = StorageHelper.getItem("user");
  const { push } = useRouter();

  useEffect(() => {
    const { address } = user;
    async function getArrays() {
      const ships = await WalletService.getUserShips(address);
      const challenges = await ChallengeService.getNotAvailableShips();
      const uniqueShips = ships?.filter(
        (ship) =>
          !challenges.some(
            (challenge: any) =>
              Number(challenge._tokenId) === Number(ship._tokenId)
          )
      );
      console.log(uniqueShips);
      setShipsChallenges(uniqueShips!);
      setShips(ships!);
    }

    getArrays();
  }, []);

  async function onOpenChallenge() {
    setLoading(true);
    const res = await ChallengeService.onOpenChallenge(
      user.id,
      shipId,
      bet,
      timeChallenge
    );
    push("/challenge");
    toast.success("Success: ", res);
    setLoading(false);
  }

  const ship = ships.find((e: any) => Number(e._tokenId) === Number(shipId));
  const selected = shipsData[ship?._shipClass]?.title;

  return (
    <div className="py-40 px-[15%] min-h-screen bg-ship bg-no-repeat bg-center bg-cover uppercase">
      <h1 className="text-5xl mb-10">Create your challenge</h1>
      <form className="flex items-center justify-between gap-10 mb-20">
        <div className="p-8 space-y-2 bg-[#EFEFEF] bg-opacity-20 backdrop-blur-md rounded-md w-full">
          <h1 className="text-white text-sm text-opacity-50">
            type of challenge
          </h1>
          <details className="dropdown w-full cursor-pointer">
            <summary className="bg-[#EFEFEF] bg-opacity-80 p-1 text-sm flex items-center justify-center w-full rounded text-center">
              <h1 className="text-black ">
                {bet === 1 ? `points and bet` : "Only points"}
              </h1>
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] mt-4 rounded-box bg-[#EFEFEF] bg-opacity-80 backdrop-blur-md w-full">
              <li onClick={() => setBet(0)} className="text-black">
                <h1 className="flex items-center text-black">Only points</h1>
              </li>
              <li onClick={() => setBet(1)} className="text-black">
                <h1 className="flex items-center text-black">points and bet</h1>
              </li>
            </ul>
          </details>
        </div>

        <div className="p-8 space-y-2 bg-[#EFEFEF] bg-opacity-20 backdrop-blur-md rounded-md w-full">
          <h1 className="text-white text-sm text-opacity-50">TYPE OF SHIP</h1>
          <details className="dropdown w-full cursor-pointer">
            <summary className="bg-[#EFEFEF] bg-opacity-80 p-1 text-sm flex items-center justify-center w-full rounded text-center">
              <h1 className="text-black ">
                {shipId ? `id:${shipId} ${selected}` : "Choose ship"}
              </h1>
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] mt-4 rounded-box bg-[#EFEFEF] bg-opacity-80 backdrop-blur-md w-full">
              {shipsChallenges.map((e: any) => (
                <li
                  key={e._tokenId}
                  onClick={() => setShipId(e._tokenId)}
                  className="text-black"
                >
                  <h1 className="flex items-center text-black">
                    {e._tokenId}
                    <h1 className="text-black">
                      {shipsData[e._shipClass].title}
                    </h1>
                  </h1>
                </li>
              ))}
            </ul>
          </details>
        </div>

        <div className="p-8 space-y-2 bg-[#EFEFEF] bg-opacity-20 backdrop-blur-md rounded-md w-full">
          <h1 className="text-white text-sm text-opacity-50">CHALLENGE TIME</h1>
          <div className="flex items-center justify-between gap-2">
            <h1
              onClick={() => setTimeChallenge(0)}
              className={`cursor-pointer bg-[#EFEFEF] ${
                timeChallenge === 0
                  ? "bg-opacity-80 text-black"
                  : "bg-opacity-20"
              } backdrop-blur-md px-8 py-[2px] transition-all duration-300 ease-in-out rounded-md flex items-center justify-center`}
            >
              12H
            </h1>

            <h1
              onClick={() => setTimeChallenge(1)}
              className={`cursor-pointer bg-[#EFEFEF] ${
                timeChallenge === 1
                  ? "bg-opacity-80 text-black"
                  : "bg-opacity-20"
              } backdrop-blur-md px-8 py-[2px] transition-all duration-300 ease-in-out rounded-md flex items-center justify-center`}
            >
              24H
            </h1>

            <h1
              onClick={() => setTimeChallenge(2)}
              className={`cursor-pointer bg-[#EFEFEF] ${
                timeChallenge === 2
                  ? "bg-opacity-80 text-black"
                  : "bg-opacity-20"
              } backdrop-blur-md px-8 py-[2px] transition-all duration-300 ease-in-out rounded-md flex items-center justify-center`}
            >
              48H
            </h1>
          </div>
        </div>
      </form>
      <Carousel>
        {ships.map((e: any, i: number) => (
          <ShipCard
            key={i}
            {...shipsData[e._shipClass]}
            isChallenge
            openChallenge={onOpenChallenge}
            id={e._tokenId}
            myShip
            challenges={0}
            score={0}
          />
        ))}
      </Carousel>

      <div className="w-full flex items-center justify-center mt-32">
        <Button
          loading={loading}
          onClick={onOpenChallenge}
          children={"set your challenge"}
          bgColor="yellow"
          className="uppercase"
          width="w-1/2"
        />
      </div>
    </div>
  );
}
