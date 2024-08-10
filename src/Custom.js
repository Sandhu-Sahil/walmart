import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
// import BlockWithCircles from './BlockWithCircles';
// import BlockWithVerticalHoles from './BlockWithHoles';
import AisleBlock from './AisleBlock';

const CustomBlock = () => {
  // Define the shape
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(1, 0);
  shape.lineTo(1, 2);
  shape.lineTo(0.5, 2);
  shape.lineTo(0.5, 1);
  shape.lineTo(0, 1);
  shape.lineTo(0, 0);

  // Create the geometry by extruding the shape
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false });

  return (
    <mesh geometry={geometry} position={[0, 0.5, 0]}>
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

const BBlock = () => {
//   return (
//     <Canvas camera={{ position: [0, 10, 10], fov: 50 }}>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} />

//       {/* Add your custom block */}
//       <CustomBlock />

//       <OrbitControls />
//     </Canvas>
//   );

return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Block 1: Square with four circular cutouts
      <BlockWithCircles />

      {/* Block 2: Square with three vertical hollow sections */}
      {/* <BlockWithVerticalHoles /> */} 

      <OrbitControls />

      <AisleBlock position={[-2, 0.25, 0]} />
    </Canvas>
  );

};

export default BBlock;
