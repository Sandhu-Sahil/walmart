import React from 'react';
import * as THREE from 'three';

// Custom Storage Unit Block with 90-Degree Rotation in XZ Plane
const StorageUnitBlock2 = () => {
  const blockSize = 10; // Size of the grid cell
  const unitHeight = 10; // Total height of the storage unit
  const cradleHeight = 2.5; // Height between each cradle
  const cradleDepth = 4; // Depth of each cradle
  const cradleThickness = 0.5; // Thickness of the cradle beams
  const supportThickness = 0.5; // Thickness of the vertical supports

  // Group to hold the storage unit components
  const group = new THREE.Group();

  // Create vertical supports (pillars)
  const supportGeometry = new THREE.BoxGeometry(supportThickness, unitHeight, supportThickness);
  const supportMaterial = new THREE.MeshStandardMaterial({ color: '#96741E' });

  const supportPositions = [
    [-blockSize / 2 + supportThickness / 2, unitHeight / 2 - unitHeight / 2, -cradleDepth / 2], // Touching bottom
    [-blockSize / 2 + supportThickness / 2, unitHeight / 2 - unitHeight / 2, cradleDepth / 2],  // Touching bottom
    [blockSize / 2 - supportThickness / 2, unitHeight / 2 - unitHeight / 2, -cradleDepth / 2],  // Touching bottom
    [blockSize / 2 - supportThickness / 2, unitHeight / 2 - unitHeight / 2, cradleDepth / 2],   // Touching bottom
  ];

  supportPositions.forEach(position => {
    const support = new THREE.Mesh(supportGeometry, supportMaterial);
    support.position.set(...position);
    group.add(support);
  });

  // Create cradles
  for (let i = 0; i < 3; i++) {
    const cradleGeometry = new THREE.BoxGeometry(blockSize - supportThickness, cradleThickness, cradleDepth);
    const cradleMaterial = new THREE.MeshStandardMaterial({ color: '#FFDF8B' });
    const cradle = new THREE.Mesh(cradleGeometry, cradleMaterial);

    cradle.position.set(0, i * cradleHeight + cradleHeight / 2 - unitHeight / 2, 0); // Position the cradle starting from the bottom
    group.add(cradle);
  };

  // Create bulk boxes
  const boxGeometry = new THREE.BoxGeometry(cradleDepth - 1, cradleHeight - 1, cradleDepth - 1);
  const boxMaterial = new THREE.MeshStandardMaterial({ color: '#FFB35F' });

  for (let i = 0; i < 3; i++) {
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(0, i * cradleHeight + cradleHeight - unitHeight / 2, 0); // Position the boxes on the cradles starting from the bottom
    group.add(box);
  }

  // Apply 90-degree rotation in the XZ plane (around the Y-axis)
  group.rotation.y = Math.PI / 2;

  // Return the complete storage unit as a single mesh
  return (
    <primitive object={group} />
  );
};

export default StorageUnitBlock2;
