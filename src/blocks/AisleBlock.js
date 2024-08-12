import React from 'react';
import * as THREE from 'three';

// Custom Aisle Block with Horizontal Slits, matching 10x10x10 grid size
const AisleBlock = () => {
  // Scale the block to fit the 10x10 size
  const blockSize = 10;
  const slitHeight = 3; // Height of each slit
  const slitSpacing = 2; // Vertical spacing between slits

  // Define the outer shape of the block
  const shape = new THREE.Shape();
  shape.moveTo(-blockSize / 2, -blockSize / 2);
  shape.lineTo(blockSize / 2, -blockSize / 2);
  shape.lineTo(blockSize / 2, blockSize / 2);
  shape.lineTo(-blockSize / 2, blockSize / 2);
  shape.lineTo(-blockSize / 2, -blockSize / 2);

  // Create horizontal hollow sections (slits)
  const hole1 = new THREE.Path().moveTo(-blockSize / 2, blockSize / 2 - slitSpacing).lineTo(blockSize / 2, blockSize / 2 - slitSpacing).lineTo(blockSize / 2, blockSize / 2 - slitSpacing - slitHeight).lineTo(-blockSize / 2, blockSize / 2 - slitSpacing - slitHeight).lineTo(-blockSize / 2, blockSize / 2 - slitSpacing);
  const hole2 = new THREE.Path().moveTo(-blockSize / 2, slitHeight / 2).lineTo(blockSize / 2, slitHeight / 2).lineTo(blockSize / 2, -slitHeight / 2).lineTo(-blockSize / 2, -slitHeight / 2).lineTo(-blockSize / 2, slitHeight / 2);
  const hole3 = new THREE.Path().moveTo(-blockSize / 2, -blockSize / 2 + slitSpacing).lineTo(blockSize / 2, -blockSize / 2 + slitSpacing).lineTo(blockSize / 2, -blockSize / 2 + slitSpacing + slitHeight).lineTo(-blockSize / 2, -blockSize / 2 + slitSpacing + slitHeight).lineTo(-blockSize / 2, -blockSize / 2 + slitSpacing);

  shape.holes.push(hole1, hole2, hole3);

  // Extrude the shape to give it depth
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: 2, bevelEnabled: false });

  return (
    <mesh geometry={geometry} position={[0, 0, 0]}>
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default AisleBlock;

