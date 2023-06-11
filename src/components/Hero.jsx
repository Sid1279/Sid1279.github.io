import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const TypewriterText = () => {
  const texts = [
    "  I'm a 2A Computer Engineering Student at the University of Waterloo.",
    "  I'm a Data Scientist intern at Tyson Foods.",
    "  I'm a Robotics enthusiast!",
    "  I love LEGO :)"
  ];

  const [textIndex, setTextIndex] = useState(0);
  const currentText = texts[textIndex];
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId;

    const typeText = () => {
      if (currentIndex < currentText.length-1) {
        setDisplayedText((prevText) => prevText + currentText[currentIndex]);
        currentIndex++;
        timeoutId = setTimeout(typeText, 100);
      } else {
        timeoutId = setTimeout(backspaceText, 1000);
      }
    };

    const backspaceText = () => {
      if (currentIndex >= 0) {
        setDisplayedText((prevText) => prevText.slice(0, -1));
        currentIndex--;
        timeoutId = setTimeout(backspaceText, 50);
      } else {
        clearTimeout(timeoutId);
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setDisplayedText("");
      }
    };

    timeoutId = setTimeout(typeText, 1000);

    return () => clearTimeout(timeoutId);
  }, [currentText]);

  return (
    <p className={`${styles.heroSubText} mt-2 text-white-100`}>
      {displayedText}
    </p>
  );
};




const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#FC6A03]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hey! I'm <span className='text-[#915EFF]'>Siddharth</span>
          </h1>
          <TypewriterText />
        </div>
      </div>
      <ComputersCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
