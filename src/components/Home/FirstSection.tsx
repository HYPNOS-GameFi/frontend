import Image from "next/image";
import { Button } from "../Button";
import Link from "next/link";

export function FirstSection() {
  return (
    <section className="bg-home bg-cover bg-no-repeat bg-center min-h-screen relative flex items-center justify-start w-full">
      <div className="flex items-center justify-between mb-40 px-[15%]">
        <div className=" flex flex-col items-start justify-center gap-4 w-[50%]">
          <h1 className="uppercase text-[36px] font-nexa leading-tight">
            Allow Yourself to Be Hypnotized by the Challenge and Bets on HYPNOS
          </h1>
          <p className="font-sora text-sm">
            Play and invest without even realizing it. A Game-Fi with challenges
            and bets, with abstraction and ease. Have fun today and your future
            finance will thank you!
          </p>
          <div className="w-full space-x-10 mt-6">
            <Link href={"/shooter"}>
              <Button
                children={"PLAY HYPNOS SHOOTER"}
                width="w-1/2"
                bgColor="transparent"
                className="uppercase"
              />
            </Link>
            <Link href={"/ships"}>EXPLORE +</Link>
          </div>
        </div>
        
      </div>
      <div className="absolute bottom-0 flex items-center justify-center w-full px-[15%]">
        <Image
          src={"/images/hypnos_text.png"}
          alt="logo"
          width={10000}
          height={10000}
          draggable={false}
          className="w-full"
        />
      </div>
    </section>
  );
}
