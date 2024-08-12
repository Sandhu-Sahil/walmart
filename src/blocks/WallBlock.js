import React from 'react';
import * as THREE from 'three';

// Custom Wall Block with a Realistic Window at the Center
const WallWithWindowBlock = () => {
  const blockSize = 10; // Size of the cube
  const wallThickness = 1; // Thickness of the wall
  const windowSize = 4; // Size of the window
  const frameThickness = 0.5; // Thickness of the window frame
  const frameDepth = 0.2; // Depth of the window frame

  // Define the outer shape of the wall
  const wallShape = new THREE.Shape();
  wallShape.moveTo(-blockSize / 2, -blockSize / 2);
  wallShape.lineTo(blockSize / 2, -blockSize / 2);
  wallShape.lineTo(blockSize / 2, blockSize / 2);
  wallShape.lineTo(-blockSize / 2, blockSize / 2);
  wallShape.lineTo(-blockSize / 2, -blockSize / 2);

  // Create the window hole in the center of the wall
  const windowHole = new THREE.Path().moveTo(-windowSize / 2, -windowSize / 2).lineTo(windowSize / 2, -windowSize / 2).lineTo(windowSize / 2, windowSize / 2).lineTo(-windowSize / 2, windowSize / 2).lineTo(-windowSize / 2, -windowSize / 2);

  wallShape.holes.push(windowHole);

  // Extrude the shape to create the wall with depth
  const wallGeometry = new THREE.ExtrudeGeometry(wallShape, { depth: wallThickness, bevelEnabled: false });

  // Create the window frame
  const frameShape = new THREE.Shape();
  frameShape.moveTo(-windowSize / 2 - frameThickness, -windowSize / 2 - frameThickness);
  frameShape.lineTo(windowSize / 2 + frameThickness, -windowSize / 2 - frameThickness);
  frameShape.lineTo(windowSize / 2 + frameThickness, windowSize / 2 + frameThickness);
  frameShape.lineTo(-windowSize / 2 - frameThickness, windowSize / 2 + frameThickness);
  frameShape.lineTo(-windowSize / 2 - frameThickness, -windowSize / 2 - frameThickness);

  // Subtract the original window size to create the frame
  const innerWindowHole = new THREE.Path().moveTo(-windowSize / 2, -windowSize / 2).lineTo(windowSize / 2, -windowSize / 2).lineTo(windowSize / 2, windowSize / 2).lineTo(-windowSize / 2, windowSize / 2).lineTo(-windowSize / 2, -windowSize / 2);
  frameShape.holes.push(innerWindowHole);

  const frameGeometry = new THREE.ExtrudeGeometry(frameShape, { depth: frameDepth, bevelEnabled: false });

  // Center the wall within the cube
  const wallPosition = [0, 0, 0];
  const framePosition = [0, 0, wallThickness / 2 - frameDepth / 2]; // Position the frame at the surface of the wall

  // Create a texture for the wall to make it more realistic
  const wallTexture = new THREE.TextureLoader().load('path_to_wall_texture.jpg'); // Replace with the path to your texture
  wallTexture.wrapS = THREE.RepeatWrapping;
  wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(2, 2);

  const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });
  const frameMaterial = new THREE.MeshStandardMaterial({ color: 'darkgray' });

  return (
    <group position={wallPosition}>
      <mesh geometry={wallGeometry} material={wallMaterial} />
      <mesh geometry={frameGeometry} material={frameMaterial} position={framePosition} />
    </group>
  );
};

export default WallWithWindowBlock;
