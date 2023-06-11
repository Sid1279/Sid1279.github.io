import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-32 h-32 flex flex-col justify-center' key={technology.name}>
          <BallCanvas icon={technology.icon} size={3} />
          <span className="mt-2 text-center">{technology.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
