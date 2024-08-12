import React from 'react';
import * as THREE from 'three';

// Custom Transparent Block
const TransparentBlock = () => {
  const blockSize = 10; // Size of the block

  // Create a simple box geometry
  const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);

  // Create a transparent material with opacity set to 0
  const material = new THREE.MeshStandardMaterial({ color: 'white', transparent: true, opacity: 0 });

  // Position the block at the center of the grid cell
  const blockPosition = [0, 0, 0];

  return (
    <mesh geometry={geometry} material={material} position={blockPosition}>
    </mesh>
  );
};

export default TransparentBlock;
