// src/Map.js
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faRedo } from '@fortawesome/free-solid-svg-icons';

const Map = () => {
  const [objects, setObjects] = useState([]); // Current objects on the map
  const [history, setHistory] = useState([]); // History stack
  const [redoStack, setRedoStack] = useState([]); // Redo stack
  const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {
    // Change cursor to "grabbing" when a component is selected
    if (selectedObject) {
      document.body.style.cursor = 'grabbing';
    } else {
      document.body.style.cursor = 'auto';
    }

    // Cleanup cursor style on component unmount
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [selectedObject]);

  const handlePlaneClick = (event) => {
    if (!selectedObject) return;

    // Convert the 2D screen coordinates to 3D world coordinates
    const [x, y, z] = event.point.toArray();

    // Create a new object based on the selected type
    let newObject;
    switch (selectedObject) {
      case 'cube':
        newObject = {
          id: Math.random(),
          geometry: <boxGeometry args={[10, 10, 10]} />,
          material: <meshStandardMaterial color="blue" />,
          position: [x, 5, z], // Position at the clicked location
        };
        break;
      case 'sphere':
        newObject = {
          id: Math.random(),
          geometry: <sphereGeometry args={[5, 32, 32]} />,
          material: <meshStandardMaterial color="red" />,
          position: [x, 5, z], // Position at the clicked location
        };
        break;
      // Add more cases for different components
      default:
        break;
    }

    // Add the new object to the history and reset the redo stack
    setHistory([...history, objects]);
    setRedoStack([]);
    setObjects([...objects, newObject]);
    setSelectedObject(null); // Reset selection after placing the object
  };

  const undo = () => {
    if (history.length === 0) return;
    const lastState = history[history.length - 1];
    setRedoStack([objects, ...redoStack]); // Push the current state to the redo stack
    setObjects(lastState); // Revert to the last state
    setHistory(history.slice(0, -1)); // Remove the last state from the history
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack[0];
    setHistory([...history, objects]); // Push the current state to the history stack
    setObjects(nextState); // Move forward to the next state
    setRedoStack(redoStack.slice(1)); // Remove the state from the redo stack
  };

  return (
    <>
      <Canvas camera={{ position: [0, 100, 100], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* The Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow onPointerDown={handlePlaneClick}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="green" />
        </mesh>

        {/* Render objects */}
        {objects.map((obj) => (
          <mesh key={obj.id} position={obj.position} castShadow>
            {obj.geometry}
            {obj.material}
          </mesh>
        ))}

        <OrbitControls />
      </Canvas>
      <div className="panel">
        <button onClick={() => setSelectedObject('cube')}>Add Cube</button>
        <button onClick={() => setSelectedObject('sphere')}>Add Sphere</button>
        <button onClick={undo} disabled={history.length === 0}>
          <FontAwesomeIcon icon={faUndo} />
        </button>
        <button onClick={redo} disabled={redoStack.length === 0}>
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>
    </>
  );
};

export default Map;
