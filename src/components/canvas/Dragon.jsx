import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { PerspectiveCamera } from "three";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./lego/scene.gltf");

  return (
    <mesh position={[-5, -8, 0]}>
      <hemisphereLight intensity={1} groundColor="#9051d9" color="#8530d1"/>
      {/* <spotLight position={[-40, 50, 10]} angle={0.12} penumbra={1} intensity={0.8} castShadow />
      <spotLight position={[40, 50, 10]} angle={0.12} penumbra={1} intensity={0.8} castShadow /> */}
      <spotLight
        position={[0, 50, -40]}
        angle={0.12}
        penumbra={1}
        intensity={0.8}
        color="purple"
        castShadow
      />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#bda8ee"/>
      <primitive
        object={computer.scene}
        scale={isMobile ? 2 : 0.04}
        position={isMobile ? [0, 0, -2.2] : [0, -3.25, -1.5]}
        rotation={[0.2,2.1,-0.2]}
      />
    </mesh>
  );
};

const Dragon = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [-100, -100, -20], fov: 15 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default Dragon;
