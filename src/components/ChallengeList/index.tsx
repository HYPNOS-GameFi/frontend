import { shipsData } from "@/constants";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { ChallengeService } from "@/services/challenge.service";
import { WalletService } from "@/services/wallet.service";
import { StorageHelper } from "@/helpers/StorageHelper";
export function ChallengeList() {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [ships, setShips] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [shipId, setShipId] = useState(0);
  const [shipsChallenges, setShipsChallenges] = useState<any[]>([]);
  const user = StorageHelper.getItem("user");

  useEffect(() => {
    async function getChallenges() {
      const res = await ChallengeService.getAvailableChallenges();
      const challengArray: any[] = [];
      res.forEach((e: any) => {
        WalletService.getShipInfo(e._tokenId)
          .then((shipInfo) => challengArray.push({ ...e, ...shipInfo }))
          .catch((err) => console.log(err));
      });

      const ships = await WalletService.getUserShips(user.address);
      const challenges = await ChallengeService.getNotAvailableShips();
      const uniqueShips = ships?.filter(
        (ship) =>
          !challenges.some(
            (challenge: any) =>
              Number(challenge._tokenId) === Number(ship._tokenId)
          )
      );
      setShips(ships!);
      setShipsChallenges(uniqueShips!);
      setChallenges(challengArray);
    }

    getChallenges();
  }, []);

  async function onPickChallenge(gameId: number, shipId: number) {
    setLoading(true);
    const { onPickChallenge } = ChallengeService;
    const challenge = await onPickChallenge(user.id, gameId, shipId);
    /* console.log(challenge) */
    setLoading(false);
  }

  const ship = ships.find((e: any) => Number(e._tokenId) === Number(shipId));
  const selected = shipsData[ship?._shipClass]?.title;

  return (
    <table className="table overflow-x-auto">
      <thead>
        <div className="flex items-center text-sm uppercase w-full justify-between mt-10 mb-8">
          <th className="text-[#EFEFEF] text-opacity-50">game Id</th>
          <th className="text-[#EFEFEF] text-opacity-50">SHIP CLASS</th>
          <th className="text-[#EFEFEF] text-opacity-50">current score</th>
          <th className="text-[#EFEFEF] text-opacity-50">challenge time</th>
          <th className="text-[#EFEFEF] text-opacity-50">challenge</th>
          <th className="text-[#EFEFEF] text-opacity-50 pr-10">make a bet</th>
        </div>
      </thead>
      <tbody>
        {challenges.slice(0, 10).map((e, i) => {
          const time =
            e._choice === 0 ? "12H" : e._choice === 1 ? "24H" : "48H";

          return (
            <tr
              key={i}
              className="flex items-center text-sm uppercase w-full overflow-x-auto justify-between py-4 border-y font-nexa"
            >
              <dialog
                id="selectShip"
                className="modal flex items-center justify-center"
              >
                <div className="modal-box h-auto flex flex-col justify-between">
                  <h1 className="text-2xl">SELECT YOUR SHIP</h1>
                  <details className="dropdown w-full cursor-pointer my-10">
                    <summary className="bg-[#EFEFEF] bg-opacity-80 py-2 text-sm flex items-center justify-center w-full rounded text-center">
                      <h1 className="text-black">
                        {shipId ? `id:${shipId} ${selected}` : "Select"}
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

                  <Button
                    disabled={e.disabled}
                    loading={loading}
                    onClick={() => onPickChallenge(e.gameid, shipId)}
                    children={"READY FOR CHALLENGE"}
                    bgColor="transparent"
                  />
                </div>
              </dialog>
              <td className="w-20">{e.gameid}</td>
              <td className="w-32 text-yellow-primary text-center">
                {shipsData[e._shipClass].title}
              </td>
              <td className="w-10 pl-20 text-center">0</td>
              <td className="w-10 pl-20 text-yellow-primary">{time}</td>
              <td className="w-32 pl-10">
                <Button
                  disabled={e.disabled}
                  onClick={() =>
                    (document.getElementById("selectShip") as any).showModal()
                  }
                  children={"Challenge"}
                  bgColor="yellow"
                  width="[150px]"
                  height="h-[36px]"
                />
              </td>
              <td className="flex items-center gap-4">
                <Button
                  disabled={Number(e._type) === 0}
                  children={Number(e._type) === 0 ? "disabled" : "BET NOW"}
                  bgColor={Number(e._type) === 0 ? "gray" : "yellow"}
                  width="w-[150px]"
                  height="h-[36px]"
                />
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
        <h1 className="w-8 h-8 flex items-center justify-center text-white text-opacity-50 rounded border border-[#EFEFEF] border-opacity-50 ">
          2
        </h1>
        <h1 className="w-8 h-8 flex items-center justify-center text-white text-opacity-50 rounded border border-[#EFEFEF] border-opacity-50 ">
          3
        </h1>
        <h1 className="w-8 h-8 flex items-center justify-center text-white text-opacity-50 rounded border border-[#EFEFEF] border-opacity-50 ">
          4
        </h1>
        <h1 className="w-8 h-8 flex items-center justify-center text-white text-opacity-50 rounded border border-[#EFEFEF] border-opacity-50 ">
          5
        </h1>
        <h1 className="text-[#EFEFEF] text-opacity-50 cursor-pointer space-x-2">
          next {">"}
        </h1>
      </div>
    </table>
  );
}
