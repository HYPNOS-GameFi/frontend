import Image from "next/image";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/shooter") return null;
  
  return (
    <div className="h-[276px] bg-footer bg-cover bg-no-repeat w-full gap-8 flex flex-col items-center justify-center">
      <Image
        src={"/images/hypnos_logo.png"}
        alt="logo"
        width={10000}
        height={10000}
        draggable={false}
        className="w-[400px]"
      />
      <div className="w-3/5 h-[2px] bg-[#EFEFEF] bg-opacity-30" />
      <p className="text-sm">2024 © HYPNOS | All Rights Reserved</p>
    </div>
  );
}
