import React, { useState } from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";

const Tech = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 5);
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 5, 0));
  };

  const visibleTechnologies = technologies.slice(startIndex, startIndex + 5);
  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex + 5 >= technologies.length;

  return (
    <div>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>What I have used in the past</p>
        <h2 className={`${styles.sectionHeadText}`}>Tools and Technologies</h2>
      </motion.div>
      <div className="flex flex-col items-center mt-12">
        <div className="flex justify-center mt-4">
          <button
            className={`mr-10 ${isPrevDisabled ? "text-gray-400" : ""}`}
            onClick={handlePrev}
            disabled={isPrevDisabled}
          >
            {isPrevDisabled ? (
              <AiOutlineArrowLeft style={{ opacity: 0.5 }} />
            ) : (
              <AiOutlineArrowLeft />
            )}
          </button>
          <div className="flex flex-row flex-wrap justify-center gap-10">
            {visibleTechnologies.map((technology) => (
              <div className="w-28 h-28 flex flex-col justify-center" key={technology.name}>
                <BallCanvas icon={technology.icon} size={3} />
                <span className="mt-2 text-center">{technology.name}</span>
              </div>
            ))}
          </div>
          <button
            className={`ml-10 ${isNextDisabled ? "text-gray-400" : ""}`}
            onClick={handleNext}
            disabled={isNextDisabled}
          >
            {isNextDisabled ? (
              <AiOutlineArrowRight style={{ opacity: 0.5 }} />
            ) : (
              <AiOutlineArrowRight />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
