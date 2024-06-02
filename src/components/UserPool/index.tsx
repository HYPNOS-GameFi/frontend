import { StorageHelper } from "@/helpers/StorageHelper";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { BetService } from "@/services/bet.service";
import toast from "react-hot-toast";

type Props = {
  claimBet: (values: any) => void;
  claimPool: () => void;
  loading: boolean;
};

export function UserPool({ claimBet, claimPool }: Props) {
  const { register, handleSubmit } = useForm();
  const user = StorageHelper.getItem("user");
  const [loading, setLoading] = useState(false);
  const [hash, setHash] = useState("");

  async function onClaimPolygon(values: any) {
    setLoading(true);
    const res = await BetService.onClaimPolygon(
      user.id,
      values.address,
      values.amount
    );
    toast.success("Success! Check on polygonscan");
    setHash(res?.hash);
    setLoading(false);
  }

  return (
    <div className="uppercase flex items-start justify-between w-full my-20">
      <dialog id="claimBet" className="modal flex items-center justify-center">
        <div className="modal-box h-auto flex flex-col justify-between">
          <form
            onSubmit={handleSubmit(onClaimPolygon)}
            className="flex flex-col items-center justify-center text-center"
          >
            <h1 className="text-4xl">CLAIM VALUES</h1>
            <h1 className="text-xs mt-4">
              Withdraw the available funds in your HYPNOS account. Select the
              type, the amount you wish to withdraw, and confirm the
              transaction.
            </h1>
            <div className="w-full flex flex-col gap-4 mt-8">
              <input
                type="text"
                {...register("address")}
                placeholder="ADDRESS"
                className="rounded bg-[#EFEFEF] bg-opacity-20 text-[#EFEFEF] font-nexa p-4 px-6 w-full"
              />
              <input
                type="number"
                {...register("amount")}
                placeholder="AMOUNT USD"
                className="rounded bg-[#EFEFEF] bg-opacity-20 text-[#EFEFEF] font-nexa p-4 px-6 w-full"
              />
            </div>
            <a
              target="_blank"
              href={`https://amoy.polygonscan.com/tx/${hash}`}
              className={`w-full flex items-start justify-start mb-8 mt-2 transition-all duration-300 ease-in-out ${
                hash ? "opacity-100" : "opacity-0"
              }`}
            >
              <h1 className="text-xs normal-case text-blue-400 tracking-wide">
                {" "}
                See on amoy polygonscan {"->"}
              </h1>
            </a>

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
      <div className="flex flex-col items-end mt-2">
        <h1 className="text-5xl">LOCKED POOL</h1>
        <h1 className="text-[84px] text-yellow-primary">
          <span className="text-white text-3xl">$USD </span> 2.632,00
        </h1>
        <h1 className="text-5xl mt-8">AVAILABLE VALUE</h1>
        <h1 className="text-[84px] text-yellow-primary">
          <span className="text-white text-3xl">$USD </span> 1.532,00
        </h1>
        <Button
          onClick={claimPool}
          children={"CLAIM VALUES"}
          bgColor="transparent"
          width="w-full"
        />
      </div>
      <div className="flex items-start w-[55%] h-full uppercase gap-8">
        <div className="bg-[#EFEFEF] h-[460px] backdrop-blur-md p-8 w-full bg-opacity-20 text-[32px] rounded-md flex flex-col items-start justify-between">
          <div className="flex items-center justify-between w-full">
            <h1>ETHEREUM</h1>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="24" fill="#FAF117" />
              <path
                d="M24.3171 12L17 24.2927L24.3171 28.6829L31.6341 24.2927L24.3171 12ZM17 25.7561L24.3171 36L31.6341 25.7561L24.3171 30.1463L17 25.7561Z"
                fill="#111111"
              />
            </svg>
          </div>
          <Button
            children={"WALLET"}
            bgColor="transparent"
            width="w-full"
            height="h-[36px]"
          />
          <h1 className="text-sm text-white text-opacity-50">
            HYPNOS POINTS <br />
            23.345 HP
          </h1>

          <h1 className="text-sm text-white text-opacity-50">
            BET USD
            <br />$ 2.673,00 USD
          </h1>

          <h1 className="text-sm text-white text-opacity-50">
            RWA - ETF TREASURY BOND
            <br />$ 1.849,99 USD
          </h1>
          <Button
            onClick={claimPool}
            loading={loading}
            children={"CLAIM VALUES"}
            width="w-full"
            height="h-[36px]"
          />
        </div>

        <div className="bg-[#EFEFEF] h-[460px] backdrop-blur-md p-8 w-full bg-opacity-20 text-[32px] rounded-md flex flex-col items-start justify-between">
          <div className="flex items-center justify-between w-full">
            <h1>POLYGON</h1>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="24" fill="#EFEFEF" />
              <path
                d="M29.82 27.9694L35.512 24.6824C35.6601 24.5965 35.783 24.4732 35.8686 24.325C35.9543 24.1767 35.9996 24.0086 36 23.8374V17.2624C35.9997 17.0911 35.9545 16.9228 35.8689 16.7743C35.7833 16.6259 35.6602 16.5025 35.512 16.4164L29.819 13.1304C29.6704 13.045 29.5019 13 29.3305 13C29.1591 13 28.9906 13.045 28.842 13.1304L23.15 16.4164C23.0016 16.5023 22.8783 16.6257 22.7925 16.7741C22.7067 16.9226 22.6614 17.091 22.661 17.2624V29.0094L18.67 31.3134L14.678 29.0094V24.3994L18.67 22.0954L21.303 23.6154V20.5234L19.158 19.2854C19.0094 19.2 18.8409 19.155 18.6695 19.155C18.4981 19.155 18.3296 19.2 18.181 19.2854L12.488 22.5724C12.3398 22.6585 12.2167 22.7819 12.1311 22.9303C12.0455 23.0788 12.0003 23.2471 12 23.4184V29.9914C12.0001 30.163 12.0452 30.3315 12.1309 30.4801C12.2165 30.6288 12.3396 30.7523 12.488 30.8384L18.181 34.1244C18.3296 34.2099 18.4981 34.2549 18.6695 34.2549C18.8409 34.2549 19.0094 34.2099 19.158 34.1244L24.85 30.8384C24.9984 30.7525 25.1217 30.6292 25.2075 30.4807C25.2933 30.3323 25.3386 30.1639 25.339 29.9924V18.2454L25.411 18.2044L29.331 15.9414L33.321 18.2464V22.8554L29.331 25.1594L26.701 23.6424V26.7344L28.841 27.9704C28.9897 28.0561 29.1584 28.1011 29.33 28.1011C29.5016 28.1011 29.6703 28.0561 29.819 27.9704L29.82 27.9694Z"
                fill="#111111"
              />
            </svg>
          </div>
          <Button
            children={"WALLET FOR CLAIM"}
            bgColor="white-transparent"
            width="w-full"
            height="h-[36px]"
          />
          <h1 className="text-sm text-white text-opacity-50">
            HYPNOS POINTS <br />
            23.345 HP
          </h1>

          <h1 className="text-sm text-white text-opacity-50">
            BET USD
            <br />$ 2.673,00 USD
          </h1>

          <h1 className="text-sm text-white text-opacity-50">
            <br /> <br />
          </h1>
          <Button
            loading={loading}
            onClick={() =>
              (document.getElementById("claimBet") as any).showModal()
            }
            children={"CLAIM VALUES"}
            width="w-full"
            height="h-[36px]"
          />
        </div>
      </div>
    </div>
  );
}
