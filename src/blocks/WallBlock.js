import React from 'react';
import * as THREE from 'three';

// Custom Wall Block with a Window at the Center
const WallWithWindowBlock = () => {
  const blockSize = 10; // Size of the cube
  const wallThickness = 1; // Thickness of the wall
  const windowSize = 4; // Size of the window

  // Define the outer shape of the wall
  const shape = new THREE.Shape();
  shape.moveTo(-blockSize / 2, -blockSize / 2);
  shape.lineTo(blockSize / 2, -blockSize / 2);
  shape.lineTo(blockSize / 2, blockSize / 2);
  shape.lineTo(-blockSize / 2, blockSize / 2);
  shape.lineTo(-blockSize / 2, -blockSize / 2);

  // Create the window hole in the center of the wall
  const windowHole = new THREE.Path().moveTo(-windowSize / 2, -windowSize / 2).lineTo(windowSize / 2, -windowSize / 2).lineTo(windowSize / 2, windowSize / 2).lineTo(-windowSize / 2, windowSize / 2).lineTo(-windowSize / 2, -windowSize / 2);

  shape.holes.push(windowHole);

  // Extrude the shape to create the wall with depth
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: wallThickness, bevelEnabled: false });

  // Center the wall within the cube
  const wallPosition = [0, 0, 0];

  return (
    <mesh geometry={geometry} position={wallPosition}>
      <meshStandardMaterial color="#F9F9F9" />
    </mesh>
  );
};

export default WallWithWindowBlock;
