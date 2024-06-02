import { shipsData } from "@/constants";
import Image from "next/image";
import { Button } from "../Button";

type Props = {
  id: string;
  title: string;
  subtitle: string;
  shipId: number;
};

export function Modal({ id, title, subtitle, shipId }: Props) {
  return (
    <dialog
      id={id}
      className="h-screen w-full rounded-lg fixed top-0 bg-black bg-cover"
    >
      <div className="h-full w-full rounded-lg bg-modal bg-center bg-cover bg-opacity-0 p-10 flex items-center justify-center gap-40 ">
        <div className="w-1/3 text-center flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col">
            <h1
              className="text-[84px] uppercase leading-none"
              children={title}
            />
            <h1
              className="text-[36px] text-yellow-primary tracking-widest"
              children={subtitle}
            />
          </div>
          <h1 className="text-[36px] tracking-widest text-center">
            Your new ship is ready for action. Enjoy!
          </h1>
          <Button
            children={"OK, GOT IT!"}
            width="w-[80%]"
            type="button"
            onClick={() => (document.getElementById(id) as any).close()}
            bgColor="yellow"
            className="uppercase mt-10"
          />
          <h1 className="text-sm text-center">SHIP ID: {shipId}</h1>
        </div>
        <Image
          src={shipsData[shipId].shipGameImg}
          alt="logo"
          width={10000}
          height={10000}
          draggable={false}
          className="w-[444px]"
        />
      </div>
    </dialog>
  );
}
