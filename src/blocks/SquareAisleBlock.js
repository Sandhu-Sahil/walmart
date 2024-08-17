import React from 'react';
import * as THREE from 'three';

// Custom Square Shelf Block with Rotation and Products
const SquareShelfBlock = () => {
  const blockSize = 10; // Size of the grid cell
  const shelfThickness = 0.5; // Thickness of each shelf
  const shelfHeight = 2; // Height between each shelf
  const numShelves = 4; // Number of shelves
  const pillarThickness = 0.5; // Thickness of the vertical supports

  // Create a group to hold the shelf, pillars, and products
  const group = new THREE.Group();

  // Create shelves
  for (let i = 0; i <= numShelves; i++) {
    const shelfGeometry = new THREE.BoxGeometry(blockSize, shelfThickness, blockSize);
    const shelfMaterial = new THREE.MeshStandardMaterial({ color: '#A6DABE' });
    const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);

    shelf.position.set(0, -i * shelfHeight, 0); // Inverted position to simulate 360-degree rotation

    group.add(shelf);
  }

  // Create vertical supports (pillars) at each corner
  const pillarGeometry = new THREE.BoxGeometry(pillarThickness, blockSize, pillarThickness);
  const pillarMaterial = new THREE.MeshStandardMaterial({ color: '#35684C' });

  const positions = [
    [-blockSize / 2 + pillarThickness / 2, -blockSize / 2, -blockSize / 2 + pillarThickness / 2],
    [-blockSize / 2 + pillarThickness / 2, -blockSize / 2, blockSize / 2 - pillarThickness / 2],
    [blockSize / 2 - pillarThickness / 2, -blockSize / 2, -blockSize / 2 + pillarThickness / 2],
    [blockSize / 2 - pillarThickness / 2, -blockSize / 2, blockSize / 2 - pillarThickness / 2],
  ];

  positions.forEach(position => {
    const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    pillar.position.set(...position);

    group.add(pillar);
  });

  // Add random products (small cubes, cylinders, etc.) on the shelves
  const productShapes = ['cube', 'cylinder']; // Define product shapes
  const colors = ['blue', 'green', 'yellow', 'purple']; // Define product colors

  for (let i = 0; i <= numShelves; i++) {
    const numProducts = Math.floor(Math.random() * 4) + 1; // Random number of products per shelf

    for (let j = 0; j < numProducts; j++) {
      const shape = productShapes[Math.floor(Math.random() * productShapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];

      let product;

      if (shape === 'cube') {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color });
        product = new THREE.Mesh(geometry, material);
      } else if (shape === 'cylinder') {
        const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
        const material = new THREE.MeshStandardMaterial({ color });
        product = new THREE.Mesh(geometry, material);
      }

      const xPos = (Math.random() - 0.5) * (blockSize - 2);
      const zPos = (Math.random() - 0.5) * (blockSize - 2);
      product.position.set(xPos, -i * shelfHeight + shelfHeight / 2, zPos); // Position on the shelf

      group.add(product);
    }
  }

  // Return the complete shelf as a single mesh
  return (
    <primitive object={group} position={[0, blockSize / 2, 0]} />
  );
};

export default SquareShelfBlock;
