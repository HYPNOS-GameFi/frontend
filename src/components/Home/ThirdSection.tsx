import { ObjectOne } from "./Objects/ObjectOne";
import { ObjectThree } from "./Objects/ObjectThree";
import { ObjectTwo } from "./Objects/ObjectTwo";

export function ThirdSection() {
  return (
    <section id="triad" className="min-h-screen bg-home2 bg-cover bg-no-repeat bg-center">
      <div className="bg-[#111111] bg-opacity-80 flex flex-col justify-between gap-32 px-[15%] py-40">
        <ObjectOne />
        <ObjectTwo />
        <ObjectThree />
      </div>
    </section>
  );
}
