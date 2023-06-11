// import React, { Suspense, useRef, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import * as THREE from 'three';
// import {
//   Decal,
//   Float,
//   OrbitControls,
//   Preload,
//   useTexture,
// } from "@react-three/drei";

// import CanvasLoader from "../Loader";

// const Ball =  React.memo((props) => {
//   const [decal] = useTexture([props.imgUrl]);
//   // decal.minFilter = THREE.LinearFilter;
//   // decal.magFilter = THREE.LinearFilter;

//   return (
//     <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
//       <ambientLight intensity={0.25} />
//       <directionalLight position={[0, 0, 0.05]} />
//       <mesh castShadow receiveShadow scale={2.75}>
//         <icosahedronGeometry args={[1, 1]} />
//         {/* <sphereGeometry args={[1, 64, 64]} /> */}
//         <meshStandardMaterial
//           color='#fff8eb'
//           polygonOffset
//           polygonOffsetFactor={-5}
//           flatShading = {false}
//         />
//         <Decal
//           position={[0, 0, 1]}
//           rotation={[2 * Math.PI, 0, 6.25]}
//           scale={1}
//           map={decal}
//           flatShading = {false}
//         />
//       </mesh>
//     </Float>
//   );
// });

// const BallCanvas = ({ icon }) => {
//   return (
//     <Canvas frameloop="always" dpr={window.devicePixelRatio}>
//       <Suspense fallback={<CanvasLoader />}>
//         <OrbitControls enableZoom={false} />
//         <Ball imgUrl={icon} />
//       </Suspense>

//       <Preload all />
//     </Canvas>
//   );
// };

// // const BallCanvas = ({ icon }) => {
// //   const canvasRef = useRef(null);

// //   useEffect(() => {
// //     const canvas = canvasRef.current;

// //     return () => {
// //       canvas?.remove();
// //     };
// //   }, []);
// //   return (
// //     <div ref={canvasRef} style={{ width: "100%", height: "100%" }}>
// //       <Canvas
// //         frameloop="always"
// //         dpr={window.devicePixelRatio}
// //         gl={{ preserveDrawingBuffer: true }}
// //       >
// //         <Suspense fallback={<CanvasLoader />}>
// //           <OrbitControls enableZoom={false} />
// //           <Ball imgUrl={icon} />
// //         </Suspense>

// //         <Preload all />
// //       </Canvas>
// //     </div>
// //   );
// // };

// export default BallCanvas;


import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Ball = React.memo((props) => {
  const [decal] = useTexture([props.imgUrl]);
  decal.minFilter = THREE.LinearFilter;
  decal.magFilter = THREE.LinearFilter;

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        {/* <icosahedronGeometry args={[1, 1]} /> */}
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading={false}
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading={false}
        />
      </mesh>
    </Float>
  );
});

const BallCanvas = ({ icon }) => {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    let observer;

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true); // Component is visible in the viewport
        } else {
          setVisible(false); // Component is not visible in the viewport
        }
      });
    };

    observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust threshold as needed
    });

    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={canvasRef} style={{ width: "100%", height: "100%" }}>
      {visible && (
        <Canvas frameloop="always" dpr={window.devicePixelRatio}>
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls enableZoom={false} />
            <Ball imgUrl={icon} />
          </Suspense>
          <Preload all />
        </Canvas>
      )}
    </div>
  );
};

export default BallCanvas;

