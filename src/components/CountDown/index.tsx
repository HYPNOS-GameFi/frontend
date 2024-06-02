import { DateFormat } from "@/helpers/DateFormat";
import { useEffect, useState } from "react";

export function CountDown({
  timestamp1,
  timestamp2,
}: {
  timestamp1: number | string;
  timestamp2: number | string;
}) {
  const { timestampToDate } = DateFormat;
  const [timer, setTimer] = useState<number>(Number(timestamp2));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeRemain = Number(timestamp2) - now;
      setTimer((prevTime) => {
        if (prevTime! <= 0) {
          clearInterval(interval);
          return 0;
        }
        return timeRemain;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp1, timestamp2]);

  const toDate = timestamp2 ? timer : Number(timestamp1);

  const { days, hours, seconds, minutes } = timestampToDate(toDate);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <h1 className="flex flex-col p-2 text-white text-opacity-50">
        <span className="countdown font-mono mb-2 text-5xl">
          <h1 style={{ "--value": days } as any}></h1>
        </span>
        day
      </h1>
      <h1 className="flex flex-col p-2 text-white text-opacity-50">
        <span className="countdown font-mono mb-2 text-5xl">
          <h1 style={{ "--value": hours } as any}></h1>
        </span>
        hr
      </h1>
      <h1 className="flex flex-col p-2 text-white text-opacity-50">
        <span className="countdown font-mono mb-2 text-5xl">
          <h1 style={{ "--value": minutes } as any}></h1>
        </span>
        min
      </h1>
      <h1 className="flex flex-col p-2 text-white text-opacity-50">
        <span className="countdown font-mono mb-2 text-5xl">
          <h1 style={{ "--value": seconds } as any}></h1>
        </span>
        sec
      </h1>
    </div>
  );
}
