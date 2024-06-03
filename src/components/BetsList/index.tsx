"use client";
import { playersData } from "@/constants";
import { StorageHelper } from "@/helpers/StorageHelper";
import { BetService } from "@/services/bet.service";
import { ChallengeService } from "@/services/challenge.service";
import { WalletService } from "@/services/wallet.service";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function BetsList() {
  const [bets, setBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const user = StorageHelper.getItem("user");
  const { push } = useRouter();

  useEffect(() => {
    async function getBets() {
      const res = await BetService.getMyBets(user.address);
      setBets(res);
    }

    getBets();
  }, []);

  return (
    <table className="table overflow-x-auto">
      <thead>
        <div className="flex items-center text-sm uppercase w-full justify-between mt-10 mb-8">
          <th className="text-[#EFEFEF] text-opacity-50">game address</th>
          <th className="text-[#EFEFEF] text-opacity-50">SHIP CLASS</th>
          <th className="text-[#EFEFEF] text-opacity-50">final score</th>
          <th className="text-[#EFEFEF] text-opacity-50">challenge time</th>
          <th className="text-[#EFEFEF] text-opacity-50">bet amount</th>
          <th className="text-[#EFEFEF] text-opacity-50">result</th>
          <th className="pl-10 text-[#EFEFEF] text-opacity-50 text-end">
            return
          </th>
        </div>
      </thead>
      <tbody>
        {bets.slice(0, 10).map((e, i) => {
          const result = Number(e.result).toFixed(2);
          return (
            <tr
              key={i}
              className="flex items-center text-sm uppercase w-full overflow-x-auto justify-between py-4 border-y"
            >
              <td className="">{e.playerAddress}</td>
              <td className="w-32 text-yellow-primary text-center">
                {e.ship_class}
              </td>
              <td className="px-10 text-center">{e.current_score}</td>
              <td className="px-10 text-yellow-primary text-center">
                {e.challenge_time}H
              </td>
              <td className="px-10">{e.bet_amount}</td>
              <td className={`${e.status === "won" && "text-yellow-primary"}`}>
                {e.status}
              </td>
              <td
                className={`${
                  Number(result) > 0 && "text-yellow-primary"
                } w-32 text-end`}
              >
                $ {result} USD
              </td>
            </tr>
          );
        })}
      </tbody>
      <div className="join w-full items-center justify-center mt-10 text-[#EFEFEF] text-opacity-50 gap-4 uppercase">
        <h1 className="text-[#EFEFEF] text-opacity-50 cursor-pointer space-x-2">
          {"<"} back
        </h1>
        <h1 className="w-8 h-8 flex items-center justify-center rounded bg-yellow-primary text-black">
          1
        </h1>
        <h1 className="text-[#EFEFEF] text-opacity-50 cursor-pointer space-x-2">
          next {">"}
        </h1>
      </div>
    </table>
  );
}
