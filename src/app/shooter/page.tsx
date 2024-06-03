"use client";
import { Button } from "@/components/Button";
import Game from "@/components/Game";
import { userStore } from "@/stores/userStore";
import Link from "next/link";

export default function Shooter() {
  const { playingShip } = userStore();
  return (
    <div className="h-screen w-full bg-game bg-no-repeat bg-cover bg-center">
      <Game />
      <Link href={"/"}>
        <h1 className="fixed top-14 left-2 font-[pixelate] cursor-pointer">
          Back to home
        </h1>
      </Link>
      <dialog
        id="savingScore"
        className="modal flex items-center justify-center"
      >
        <div className="modal-box h-auto flex flex-col justify-between">
          <h1 className="text-2xl">Saving your score</h1>
          <h1 className="text-2xl">Ship ID: {playingShip}</h1>
        </div>
      </dialog>
      <audio id="dyingSound" src="/musics/dying.mp3"></audio>
      <audio id="explosionSound" src="/musics/explosion.mp3"></audio>
      <audio id="gunSound" src="/musics/gun.mp3"></audio>
      <audio id="menuSound" src="/musics/menu.mp3"></audio>
    </div>
  );
}
