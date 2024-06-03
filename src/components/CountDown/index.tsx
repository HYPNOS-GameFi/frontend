import { DateFormat } from "@/helpers/DateFormat";
import { useEffect, useState } from "react";

export function CountDown(challenge: any) {
  const { blockTimestamp2, _choice } = challenge;
  const { timestampToDate } = DateFormat;
  const timestamp = blockTimestamp2 * 1000;
  const choice =
    _choice === 0 ? 3600 * 12 : _choice === 1 ? 3600 * 24 : 3600 * 48;
  const choiceTimestamp = choice * 1000;

  const [timer, setTimer] = useState<number>(choice);

  const timeEnd = new Date(timestamp + choiceTimestamp).getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeRemain = timeEnd - now;
      setTimer((prevTime) => {
        if (prevTime! <= 0) {
          clearInterval(interval);
          return 0;
        }
        return timeRemain;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [blockTimestamp2, timeEnd]);

  const toDate = blockTimestamp2 ? timer : choice;
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
        hrs
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
