import React from 'react';
import * as THREE from 'three';

// Custom Checkout Counter Block
const CheckoutCounterBlock = () => {
  const blockSize = 10; // Size of the grid cell
  const tableHeight = 3; // Height of the checkout table
  const tableThickness = 0.5; // Thickness of the table surface
  const tableWidth = 6; // Width of the checkout table
  const tableDepth = 4; // Depth of the checkout table
  const computerWidth = 1.5; // Width of the computer screen
  const computerHeight = 1; // Height of the computer screen
  const humanHeight = 5; // Height of the human figure
  const humanRadius = 0.5; // Radius of the human figure's body

  // Group to hold the checkout counter components
  const group = new THREE.Group();

  // Create the checkout table
  const tableGeometry = new THREE.BoxGeometry(tableWidth, tableThickness, tableDepth);
  const tableMaterial = new THREE.MeshStandardMaterial({ color: 'brown' });
  const table = new THREE.Mesh(tableGeometry, tableMaterial);
  table.position.set(0, tableHeight / 2, 0); // Position table in the center

  group.add(table);

  // Create the computer
  const computerGeometry = new THREE.BoxGeometry(computerWidth, computerHeight, tableThickness);
  const computerMaterial = new THREE.MeshStandardMaterial({ color: 'black' });
  const computer = new THREE.Mesh(computerGeometry, computerMaterial);
  computer.position.set(0, tableHeight + computerHeight / 2, -tableDepth / 2 + tableThickness); // Position on the table

  group.add(computer);

  // Create the human figure (cylinder for body and sphere for head)
  const bodyGeometry = new THREE.CylinderGeometry(humanRadius, humanRadius, humanHeight, 32);
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 'blue' });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.set(0, humanHeight / 2, tableDepth / 2 + humanRadius); // Position behind the table

  const headGeometry = new THREE.SphereGeometry(humanRadius, 32, 32);
  const headMaterial = new THREE.MeshStandardMaterial({ color: 'peachpuff' });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.set(0, humanHeight + humanRadius, tableDepth / 2 + humanRadius); // Position on top of the body

  group.add(body);
  group.add(head);

  // Return the complete checkout counter as a single mesh
  return (
    <primitive object={group} position={[0,-4,0]} />
  );
};

export default CheckoutCounterBlock;
