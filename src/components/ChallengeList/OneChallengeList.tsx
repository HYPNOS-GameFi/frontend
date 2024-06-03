import { shipsData } from "@/constants";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { WalletService } from "@/services/wallet.service";
export function OneChallengeList({ challenge, setShipId }: any) {
  const [shipInfo, setShipInfo] = useState<any>(null);

  useEffect(() => {
    WalletService.getShipInfo(challenge?._tokenId)
      .then((shipInfo) => setShipInfo(shipInfo))
      .catch((err) => console.log(err));
  }, [challenge]);
  if (!challenge) return null;
  const { tokenId2, _tokenId, _type, bets, points } = challenge;
  const title = shipsData[shipInfo?._shipClass]?.title;

  const bet1 = bets && bets[0]?._totalAmount1 | 0;
  const bet2 = bets && bets[0]?._totalAmount2 | 0;

  console.log(points)

  const points1 = points && points[0] | 0;
  const points2 = points && points[1] | 0;

  return (
    <table className="table overflow-x-auto mt-10">
      <thead>
        <div className="flex items-center text-sm uppercase w-full justify-between mt-10 mb-8">
          <th className="text-[#EFEFEF] text-opacity-50">Ship id</th>
          <th className="text-[#EFEFEF] text-opacity-50">SHIP CLASS</th>
          <th className="text-[#EFEFEF] text-opacity-50">current score</th>
          {_type === 1 && (
            <>
              <th className="text-[#EFEFEF] text-opacity-50">bet amount</th>
              <th className="text-[#EFEFEF] text-opacity-50">number of bets</th>
              <th className="text-[#EFEFEF] text-opacity-50 pr-10">
                make a bet
              </th>
            </>
          )}
        </div>
      </thead>
      <tbody>
        <tr className="flex items-center text-sm uppercase w-full overflow-x-auto justify-between py-4 border-y font-nexa">
          <td className="text-center">{_tokenId}</td>
          <td className="text-yellow-primary text-center">{title}</td>
          <td className="text-center">{points1}</td>
          {_type === 1 && (
            <>
              <td className="text-center flex items-center">$ {bet1} USD</td>
              <td className="text-center">0</td>
              <td className="flex items-center gap-4">
                <Button
                  children={"BET NOW"}
                  onClick={() => {
                    setShipId(_tokenId);
                    (document.getElementById("onBet") as any).showModal();
                  }}
                  bgColor={"yellow"}
                  width="w-[150px]"
                  height="h-[36px]"
                />
              </td>
            </>
          )}
        </tr>

        {tokenId2 && (
          <tr className="flex items-center text-sm uppercase w-full overflow-x-auto justify-between py-4 border-y font-nexa">
            <td className="text-center">{tokenId2}</td>
            <td className="text-yellow-primary">{title}</td>
            <td className="text-center">{points2}</td>
            {_type === 1 && (
              <>
                <td className="text-center flex items-center">$ {bet2} USD</td>
                <td className="text-center">0</td>
                <td className="flex items-center gap-4">
                  <Button
                    children={"BET NOW"}
                    onClick={() => {
                      setShipId(tokenId2);
                      (document.getElementById("onBet") as any).showModal();
                    }}
                    bgColor={"yellow"}
                    width="w-[150px]"
                    height="h-[36px]"
                  />
                </td>
              </>
            )}
          </tr>
        )}
      </tbody>
    </table>
  );
}
