import { shipsData } from "@/constants";
import { Button } from "../Button";
export function OneChallengeList({ challenge }: any) {
  if (!challenge) return null;
  const { gameid, tokenId2, _tokenId, _type, _choice, bets, points } =
    challenge;

  const bet1 = bets && bets[0] | 0;
  const bet2 = bets && bets[1] | 0;

  const points1 = points && points[0] | 0;
  const points2 = points && points[1] | 0;

  return (
    <table className="table overflow-x-auto mt-10">
      <thead>
        <div className="flex items-center text-sm uppercase w-full justify-between mt-10 mb-8">
          <th className="text-[#EFEFEF] text-opacity-50">Ship id</th>
          <th className="text-[#EFEFEF] text-opacity-50">SHIP CLASS</th>
          <th className="text-[#EFEFEF] text-opacity-50">current score</th>
          {_choice === 0 && (
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
          <td className="text-yellow-primary text-center">
            {shipsData[_type].title}
          </td>
          <td className="text-center">{points1}</td>
          {_choice === 0 && (
            <>
              <td className="text-center flex items-center">$ {bet1} USD</td>
              <td className="text-center">0</td>
              <td className="flex items-center gap-4">
                <Button
                  children={"BET NOW"}
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
            <td className="text-yellow-primary">
              {shipsData[_type].title}
            </td>
            <td className="text-center">{points2}</td>
            {_choice === 0 && (
              <>
                <td className="text-center flex items-center">$ {bet2} USD</td>
                <td className="text-center">0</td>
                <td className="flex items-center gap-4">
                  <Button
                    children={"BET NOW"}
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