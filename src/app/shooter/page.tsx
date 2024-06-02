"use client";
import Game from "@/components/Game";
import Link from "next/link";

export default function Shooter() {
  return (
    <div className="h-screen w-full bg-game bg-no-repeat bg-cover bg-center">
      <Game />
      <Link href={"/"}>
        <h1 className="fixed top-14 left-2 font-[pixelate] cursor-pointer">
          Back to home
        </h1>
      </Link>
      <audio id="dyingSound" src="/musics/dying.mp3"></audio>
      <audio id="explosionSound" src="/musics/explosion.mp3"></audio>
      <audio id="gunSound" src="/musics/gun.mp3"></audio>
      <audio id="menuSound" src="/musics/menu.mp3"></audio>
    </div>
  );
}
