"use client";
import { shipsData } from "@/constants";
import { StorageHelper } from "@/helpers/StorageHelper";
import { IShipInfo } from "@/interfaces/IShip";
import { ChallengeService } from "@/services/challenge.service";
import { WalletService } from "@/services/wallet.service";
import { userStore } from "@/stores/userStore";
import { useEffect, useState } from "react";

const Game = () => {
  const [infoShip, setInfoShip] = useState<IShipInfo | null>(null);
  const user = StorageHelper.getItem("user");
  const { playingShip } = userStore();
  const ship_class = infoShip && infoShip._shipClass;
  const ship = shipsData[ship_class!];

  useEffect(() => {
    WalletService.getShipInfo(playingShip)
      .then((info) => setInfoShip(info))
      .catch((e) => console.error(e));
  }, [playingShip]);

  useEffect(() => {
    const startGame = () => {
      let c: HTMLCanvasElement | null = document.querySelector("canvas");
      let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
      if (!c || !canvas) return;
      c.width = innerWidth;
      c.height = innerHeight;
      let ctx: CanvasRenderingContext2D | null | any = c.getContext("2d");
      if (!ctx) return;

      let mouse = {
        x: innerWidth / 2,
        y: innerHeight - 33,
      };

      let touch = {
        x: innerWidth / 2,
        y: innerHeight - 33,
      };

      canvas.addEventListener("mousemove", function (event) {
        mouse.x = event.clientX;
      });
      canvas.addEventListener("touchmove", function (event) {
        let rect = canvas.getBoundingClientRect();
        let root = document.documentElement;
        let touch = event.changedTouches[0];
        let touchX = parseInt(touch.clientX.toString());
        let touchY =
          parseInt(touch.clientY.toString()) - rect.top - root.scrollTop;
        event.preventDefault();
        mouse.x = touchX;
        mouse.y = touchY;
      });
      let player_width = 128;
      let player_height = 128;
      let playerImg = new Image();
      let score = 0;
      let health = ship.hp;
      playerImg.src = ship.shipGameImg;

      let _bullets: Bullet[] = [];
      let bullet_width = 6;
      let bullet_height = 8;
      let bullet_speed = 20;

      let dyingSound = document.getElementById(
        "dyingSound"
      ) as HTMLAudioElement;
      if (dyingSound) dyingSound.volume = 0.05;
      let explosionSound = document.getElementById(
        "explosionSound"
      ) as HTMLAudioElement;
      if (explosionSound) {
        explosionSound.playbackRate = ship.shots >= 2 ? 2.0 : 1.0;
        explosionSound.volume = 0.2;
      }
      let gunSound = document.getElementById("gunSound") as HTMLAudioElement;
      if (gunSound) {
        gunSound.playbackRate = 2.0;
        gunSound.volume = 0.05;
      }
      let menuSound = document.getElementById("menuSound") as HTMLAudioElement;
      if (menuSound) {
        menuSound.volume = 0.05;
        menuSound.play();
        console.log("menu volume", menuSound.volume);
      }

      let _enemies: Enemy[] = [];
      let enemyImg1 = new Image();
      enemyImg1.src = "/gameImages/meteoro_3.png";
      let enemyImg2 = new Image();
      enemyImg2.src = "/gameImages/meteoro.png";
      let enemyImg3 = new Image();
      enemyImg3.src = "/gameImages/meteoro_2.png";
      let enemy_width = 64;
      let enemy_height = 64;

      let _healthkits: Healthkit[] = [];
      let healthkitImg = new Image();
      healthkitImg.src = "/gameImages/medkit.png";
      let healthkit_width = 32;
      let healthkit_height = 32;

      interface Entity {
        x: number;
        y: number;
        width: number;
        height: number;
        speed: number;
        draw(): void;
        update(): void;
      }

      class Player implements Entity {
        x: number;
        y: number;
        width: number;
        height: number;
        speed: any;

        constructor(x: number, y: number, width: number, height: number) {
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
        }

        draw() {
          ctx.beginPath();
          let mouseX = mouse.x - this.width / 2 - 3;
          let mouseY = mouse.y - this.height;
          ctx.drawImage(playerImg, mouseX, mouseY, this.width, this.height);
        }

        update() {
          this.draw();
        }
      }

      class Bullet implements Entity {
        x: number;
        y: number;
        width: number;
        height: number;
        speed: number;

        constructor(
          x: number,
          y: number,
          width: number,
          height: number,
          speed: number
        ) {
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
          this.speed = speed;
        }

        draw() {
          ctx.beginPath();
          ctx.rect(this.x, this.y, this.width, this.height);
          ctx.fillStyle = "white";
          ctx.fill();
        }

        update() {
          this.y -= this.speed;
          this.draw();
        }
      }

      class Enemy implements Entity {
        x: number;
        y: number;
        width: number;
        height: number;
        speed: number;
        imageIndex: number;

        constructor(
          x: number,
          y: number,
          width: number,
          height: number,
          speed: number
        ) {
          this.x = x;
          this.y = y;
          const size = Math.floor(Math.random() * (128 - 64 + 1)) + 64;
          this.width = size;
          this.height = size;
          this.speed = speed;
          this.imageIndex = Math.floor(Math.random() * 3);
        }

        draw() {
          ctx.beginPath();
          let imgToDraw;
          if (this.imageIndex === 0) {
            imgToDraw = enemyImg1;
          } else if (this.imageIndex === 1) {
            imgToDraw = enemyImg2;
          } else {
            imgToDraw = enemyImg3;
          }
          ctx.drawImage(imgToDraw, this.x, this.y, this.width, this.height);
        }

        update() {
          this.y += this.speed;
          this.draw();
        }
      }

      class Healthkit implements Entity {
        x: number;
        y: number;
        width: number;
        height: number;
        speed: number;

        constructor(
          x: number,
          y: number,
          width: number,
          height: number,
          speed: number
        ) {
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
          this.speed = speed;
        }

        draw() {
          ctx.beginPath();
          ctx.drawImage(healthkitImg, this.x, this.y, this.width, this.height);
        }

        update() {
          this.y += this.speed;
          this.draw();
        }
      }

      let __player = new Player(mouse.x, mouse.y, player_width, player_height);

      function drawEnemies() {
        for (let _ = 0; _ < 2; _++) {
          let x = Math.random() * (innerWidth - enemy_width);
          let y = -enemy_height;
          let width = enemy_width;
          let height = enemy_height;
          let speed = Math.random() * 2;
          let __enemy = new Enemy(x, y, width, height, speed);
          _enemies.push(__enemy);
        }
      }
      setInterval(drawEnemies, 1300);

      function drawHealthkits() {
        for (let _ = 0; _ < 1; _++) {
          let x = Math.random() * (innerWidth - enemy_width);
          let y = -enemy_height;
          let width = healthkit_width;
          let height = healthkit_height;
          let speed = Math.random() * 2.6;
          let __healthkit = new Healthkit(x, y, width, height, speed);
          _healthkits.push(__healthkit);
        }
      }
      setInterval(drawHealthkits, 15000);

      function fire() {
        for (let _ = 0; _ < 1; _++) {
          let x = mouse.x - bullet_width;
          let y = mouse.y - player_height;
          let __bullet = new Bullet(
            x,
            y,
            bullet_width,
            bullet_height,
            bullet_speed
          );
          _bullets.push(__bullet);
          gunSound.play();
        }
      }
      setInterval(fire, 1000 / ship.shots);

      function collision(a: Entity, b: Entity) {
        return (
          a.x < b.x + b.width &&
          a.x + a.width > b.x &&
          a.y < b.y + b.height &&
          a.y + a.height > b.y
        );
      }

      ctx.font = "2em pixelate";
      ctx.globalCompositeOperation = "source-over";

      function animate() {
        ctx.beginPath();
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        ctx.fillStyle = "white";
        ctx.fillText("Health: " + health, 5, 35);
        ctx.fillText("Score: " + score, innerWidth - 200, 35);
        requestAnimationFrame(animate);

        __player.update();

        for (let i = 0; i < _bullets.length; i++) {
          _bullets[i].update();
          if (_bullets[i].y < 0) {
            _bullets.splice(i, 1);
          }
        }

        for (let k = 0; k < _enemies.length; k++) {
          _enemies[k].update();
          if (_enemies[k].y > innerHeight) {
            _enemies.splice(k, 1);
            health -= 10;
            if (health < 30) {
              menuSound.pause();
              dyingSound.play();
            }
            if (health == 0) {
              ChallengeService.onPlayPoints(user.id, playingShip, score)
                .then((res) => console.log(res))
                .catch((e) => console.log(e));

              alert("You DIED!\nYour score was " + score);
            }
          }
        }

        for (let j = _enemies.length - 1; j >= 0; j--) {
          for (let l = _bullets.length - 1; l >= 0; l--) {
            if (collision(_enemies[j], _bullets[l])) {
              _enemies.splice(j, 1);
              _bullets.splice(l, 1);
              if (explosionSound) {
                explosionSound.play();
              }

              score = score + ship.multiplier;
            }
          }
        }

        for (let h = 0; h < _healthkits.length; h++) {
          _healthkits[h].update();
        }
        for (let hh = _healthkits.length - 1; hh >= 0; hh--) {
          for (let hhh = _bullets.length - 1; hhh >= 0; hhh--) {
            if (collision(_healthkits[hh], _bullets[hhh])) {
              _healthkits.splice(hh, 1);
              _bullets.splice(hhh, 1);
              health += 10;
            }
          }
        }
      }

      animate();
    };

    if (ship) startGame();
  }, [ship]);

  return <canvas />;
};

export default Game;
