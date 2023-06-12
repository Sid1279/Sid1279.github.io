import { useState } from "react";
import {Tilt} from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src="https://media.discordapp.net/attachments/1057488327835652127/1117663499762540605/github.png?width=640&height=640"
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
}

// const Works = () => {
//   const [startIndex, setStartIndex] = useState(0);
//   const visibleProjects = projects.concat(projects.slice(0, 2)).slice(startIndex, startIndex + 3);

//   const handleNext = () => {
//     setStartIndex((prevIndex) => (prevIndex + 1) % (projects.length));
//   };

//   const handlePrev = () => {
//     setStartIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
//   };

//   return (
//     <>
//       <motion.div variants={textVariant()}>
//         <p className={`${styles.sectionSubText} `}>My Personal</p>
//         <h2 className={`${styles.sectionHeadText}`}>Projects</h2>
//       </motion.div>

//       <div className='w-full flex'>
//          <motion.p
//           variants={fadeIn("", "", 0.1, 1)}
//           className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
//           >
//             Following projects showcases my skills and experience through
//             real-world examples of my work. Each project is briefly described with
//             links to code repositories and live demos in it. It reflects my
//             ability to solve complex problems, work with different technologies,
//             and manage projects effectively.
//           </motion.p>
//       </div>
//       <div className="mt-20 flex flex-wrap gap-7">
//         {visibleProjects.map((project, index) => (
//           <ProjectCard key={`project-${index}`} index={index} {...project} />
//         ))}
//       </div>

//       {/* Previous and Next buttons */}
//       <div className="flex justify-center mt-5">
//         <button
//           className={`mr-2 px-3 py-2 rounded-md bg-white text-tertiary`}
//           onClick={handlePrev}
//         >
//           <AiOutlineArrowLeft />
//         </button>
//         <button
//           className={`ml-2 px-3 py-2 rounded-md bg-white text-tertiary`}
//           onClick={handleNext}
//         >
//           <AiOutlineArrowRight />
//         </button>
//       </div>
//     </>
//   );
// };

// export default SectionWrapper(Works, "");

const Works = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedType, setSelectedType] = useState("all");

  const softwareProjects = projects.filter((project) => project.type === "software");
  const hardwareProjects = projects.filter((project) => project.type === "hardware");

  let visibleProjects;
  if (selectedType === "software") {
    visibleProjects = softwareProjects.concat(softwareProjects.slice(0, 2)).slice(startIndex, startIndex + 3);
  } else if (selectedType === "hardware") {
    visibleProjects = hardwareProjects.concat(hardwareProjects.slice(0, 2)).slice(startIndex, startIndex + 3);
  } else {
    visibleProjects = projects.concat(projects.slice(0, 2)).slice(startIndex, startIndex + 3);
  }

  const handleNext = (proj) => {
    setStartIndex((prevIndex) => (prevIndex + 1) % proj.length);
  };

  const handlePrev = (proj) => {
    setStartIndex((prevIndex) => (prevIndex === 0 ? proj.length - 1 : prevIndex - 1));
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    setStartIndex(0);
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My Personal</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      {/* Type Filter Buttons */}
      <div className="flex justify-center mt-5">
        <button
          className={`mr-2 px-3 py-2 rounded-md bg-tertiary text-white ${selectedType === "all" ? "bg-white text-tertiary" : ""}`}
          onClick={() => handleTypeFilter("all")}
        >
          All
        </button>
        <button
          className={`mx-2 px-3 py-2 rounded-md bg-tertiary text-white  ${selectedType === "software" ? "bg-white text-tertiary" : ""}`}
          onClick={() => handleTypeFilter("software")}
        >
          Software
        </button>
        <button
          className={`ml-2 px-3 py-2 rounded-md bg-tertiary text-white  ${selectedType === "hardware" ? "bg-white text-tertiary" : ""}`}
          onClick={() => handleTypeFilter("hardware")}
        >
          Hardware
        </button>
      </div>

      {/* Carousel */}
      <div className="mt-20 flex flex-wrap gap-7">
      {visibleProjects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      {/* Previous and Next buttons */}
      <div className="flex justify-center mt-5">
        <button
          className={`mr-2 px-3 py-2 rounded-md bg-tertiary text-white`}
          onClick={() => handlePrev(selectedType === "software" ? softwareProjects : selectedType === "hardware" ? hardwareProjects : projects)}
        >
          <AiOutlineArrowLeft />
        </button>
        <button
          className={`ml-2 px-3 py-2 rounded-md bg-tertiary text-white`}
          onClick={() => handleNext(selectedType === "software" ? softwareProjects : selectedType === "hardware" ? hardwareProjects : projects)}
        >
          <AiOutlineArrowRight />
        </button>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");

























// import React, { useState, useEffect } from "react";
// import { Tilt } from "react-tilt";
// import { motion } from "framer-motion";
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

// import { styles } from "../styles";
// import { SectionWrapper } from "../hoc";
// import { projects } from "../constants";
// import { fadeIn, textVariant } from "../utils/motion";

// const ProjectCard = ({
//   index,
//   name,
//   description,
//   tags,
//   image,
//   source_code_link,
// }) => {
//   return (
//     <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
//       <Tilt
//         options={{
//           max: 45,
//           scale: 1,
//           speed: 450,
//         }}
//         className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
//       >
//         <div className='relative w-full h-[230px]'>
//           <img
//             src={image}
//             alt='project_image'
//             className='w-full h-full object-cover rounded-2xl'
//           />

//           <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
//             <div
//               onClick={() => window.open(source_code_link, "_blank")}
//               className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
//             >
//               <img
//                 src="https://media.discordapp.net/attachments/1057488327835652127/1117663499762540605/github.png?width=640&height=640"
//                 alt='source code'
//                 className='w-1/2 h-1/2 object-contain'
//               />
//             </div>
//           </div>
//         </div>

//         <div className='mt-5'>
//           <h3 className='text-white font-bold text-[24px]'>{name}</h3>
//           <p className='mt-2 text-secondary text-[14px]'>{description}</p>
//         </div>

//         <div className='mt-4 flex flex-wrap gap-2'>
//           {tags.map((tag) => (
//             <p
//               key={`${name}-${tag.name}`}
//               className={`text-[14px] ${tag.color}`}
//             >
//               #{tag.name}
//             </p>
//           ))}
//         </div>
//       </Tilt>
//     </motion.div>
//   );
// };

// const Works = () => {
//   const [category, setCategory] = useState("software"); // Default category is "software"

//   const renderProjects = () => {
//     const selectedProjects = projects.filter((project) => project.type === category);

//     return selectedProjects.map((project, index) => (
//       <ProjectCard key={`project-${index}`} {...project} />
//     ));
//   };

//   return (
//     <>
//       <motion.div variants={textVariant()}>
//         <p className={`${styles.sectionSubText} `}>My Personal</p>
//         <h2 className={`${styles.sectionHeadText}`}>Projects</h2>
//       </motion.div>
//       <div className="flex gap-4 mt-4">
//         <button
//           className={`py-3 px-8 rounded-xl outline-none w-fit font-bold shadow-md shadow-primary ${
//             category === "software" ? "bg-white text-tertiary" : "bg-tertiary text-white"
//           }`}
//           onClick={() => setCategory("software")}
//         >
//           Software
//         </button>

//         <button
//           className={`py-3 px-8 rounded-xl outline-none w-fit font-bold shadow-md shadow-primary ${
//             category === "hardware" ? "bg-white text-tertiary" : "bg-tertiary text-white"
//           }`}
//           onClick={() => setCategory("hardware")}
//         >
//           Hardware
//         </button>
//       </div>

//       <div className="mt-20 flex flex-wrap gap-7">{renderProjects()}</div>
//     </>
//   );
// };

// export default SectionWrapper(Works, "");