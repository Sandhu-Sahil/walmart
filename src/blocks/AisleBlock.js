import React from 'react';
import * as THREE from 'three';

// Custom Aisle Block with Horizontal Slits, Side Colors, and Products
const AisleBlock = () => {
  // Scale the block to fit the 10x10 size
  const blockSize = 10;
  const slitHeight = 3; // Height of each slit
  const slitSpacing = 2; // Vertical spacing between slits
  const aisleDepth = 2; // Depth of the aisle (thickness)
  const sideThickness = 0.5; // Thickness of the left and right sides

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
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: aisleDepth, bevelEnabled: false });

  // Create a group to hold the aisle block and products
  const group = new THREE.Group();

  // Create the aisle block itself
  const aisleBlock = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 'red' }));
  group.add(aisleBlock);

  // Add side panels (left and right) in brown color
  const sidePanelGeometry = new THREE.BoxGeometry(sideThickness, blockSize, aisleDepth);
  const sidePanelMaterial = new THREE.MeshStandardMaterial({ color: 'brown' });

  const leftSidePanel = new THREE.Mesh(sidePanelGeometry, sidePanelMaterial);
  leftSidePanel.position.set(-blockSize / 2 + sideThickness / 2, 0, 0);
  group.add(leftSidePanel);

  const rightSidePanel = new THREE.Mesh(sidePanelGeometry, sidePanelMaterial);
  rightSidePanel.position.set(blockSize / 2 - sideThickness / 2, 0, 0);
  group.add(rightSidePanel);

  // Add random products (small cubes, cylinders) on the shelves
  const productShapes = ['cube', 'cylinder'];
  const colors = ['blue', 'green', 'yellow', 'purple'];

  for (let i = 0; i < 3; i++) {
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
      const zPos = 0; // Products should be positioned within the aisle depth
      product.position.set(xPos, i * slitHeight - blockSize / 2 + slitHeight / 2, zPos); // Position on the shelf

      group.add(product);
    }
  }

  return <primitive object={group} position={[0, 0, 0]} />;
};

export default AisleBlock;
