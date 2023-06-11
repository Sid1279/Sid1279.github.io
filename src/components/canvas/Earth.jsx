import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./earf/scene.gltf");

  return (
    <primitive object={earth.scene} scale={2} position-y={0} rotation-y={0} />
  );
};


const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={true}
          enableRotate = {true}
          enablePan = {true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;


// import React, { Suspense, useEffect, useState, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

// import CanvasLoader from "../Loader";

// const Earth = () => {
//   const earth = useGLTF("./earf/scene.gltf");

//   return (
//     <primitive object={earth.scene} scale={2} position-y={0} rotation-y={0} />
//   );
// };

// const EarthCanvas = () => {
//   const canvasRef = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     let observer;

//     const handleIntersection = (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           setVisible(true); // Component is visible in the viewport
//         } else {
//           setVisible(false); // Component is not visible in the viewport
//         }
//       });
//     };

//     observer = new IntersectionObserver(handleIntersection, {
//       root: null,
//       rootMargin: "0px",
//       threshold: 0.5, // Adjust threshold as needed
//     });

//     observer.observe(canvas);

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <div ref={canvasRef}>
//       {visible && (
//         <Canvas
//           shadows
//           frameloop="demand"
//           dpr={[1, 2]}
//           gl={{ preserveDrawingBuffer: true }}
//           camera={{
//             fov: 45,
//             near: 0.1,
//             far: 200,
//             position: [-4, 3, 6],
//           }}
//         >
//           <Suspense fallback={<CanvasLoader />}>
//             <OrbitControls
//               autoRotate
//               enableZoom={true}
//               enableRotate={true}
//               enablePan={true}
//               maxPolarAngle={Math.PI / 2}
//               minPolarAngle={Math.PI / 2}
//             />
//             <Earth />

//             <Preload all />
//           </Suspense>
//         </Canvas>
//       )}
//     </div>
//   );
// };

// export default EarthCanvas;
