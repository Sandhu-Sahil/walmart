import React from 'react';
import * as THREE from 'three';

// Custom Circular Pillar Block for joining walls at corners
const PillarBlock = () => {
  const blockSize = 10; // Size of the grid cell
  const pillarRadius = 5; // Radius of the pillar
  const pillarHeight = blockSize; // Height of the pillar, matching the grid cell size

  // Create a cylinder geometry representing the circular pillar
  const geometry = new THREE.CylinderGeometry(pillarRadius, pillarRadius, pillarHeight, 32);

  // Position the pillar at the center of the grid cell
  const pillarPosition = [0, 0, 0];

  return (
    <mesh geometry={geometry} position={pillarPosition}>
      <meshStandardMaterial color="#D3D3D3" />
    </mesh>
  );
};

export default PillarBlock;
