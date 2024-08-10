// src/Map.js
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faRedo, faSave, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import CameraControls from './CameraControls';
import AisleBlock from './AisleBlock';
import WallWithWindowBlock from './WallBlock';

const Map = () => {
  const gridSize = 10; // Size of each grid cell
  const gridCount = 10; // Number of cells along one axis (assuming a square grid)
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

  const snapToGrid = (position) => {
    return Math.round(position / gridSize) * gridSize;
  };

  const handlePlaneClick = (event) => {
    if (!selectedObject) return;

    // Get the click position and snap it to the grid
    let [x, y, z] = event.point.toArray();
    x = snapToGrid(x);
    z = snapToGrid(z);

    // Check if the grid cell is already occupied
    // Check if the grid cell is already occupied by a different type of object
    // const isOccupied = objects.some(obj => 
    //   obj.position[0] === x && 
    //   obj.position[2] === z &&
    //   obj.type !== selectedObject // Allow placement if the types match
    // );
    // if (isOccupied) return; // If occupied by a different type, do nothing

    let yFactor = 1;
    if (selectedObject === 'wall') {
      // repeat till we find empty y position
      let isOccupied = true;
      y = gridSize/2;
      while (isOccupied) {
        isOccupied = objects.some(obj => 
          obj.position[0] === x && 
          obj.position[1] === y &&
          obj.position[2] === z
        );
        if (isOccupied) {
          y += gridSize;
          yFactor += 2;
        }
      }

    }

    // Create a new object based on the selected type
    let newObject;
    switch (selectedObject) {
      case 'cube':
        newObject = {
          id: Math.random(),
          geometry: <boxGeometry args={[gridSize, gridSize, gridSize]} />,
          material: <meshStandardMaterial color="blue" />,
          position: [x, yFactor * gridSize / 2, z], // Position at the center of the grid cell
          type: 'cube',
        };
        break;
      case 'sphere':
        newObject = {
          id: Math.random(),
          geometry: <sphereGeometry args={[gridSize / 2, 32, 32]} />,
          material: <meshStandardMaterial color="red" />,
          position: [x, yFactor * gridSize / 2, z], // Position at the center of the grid cell
          type: 'sphere',
        };
        break;
      
      case 'aisle':
        newObject ={
          id: Math.random(),
          geometry: <AisleBlock />,
          material: <meshStandardMaterial color="red" />,
          position: [x, yFactor * gridSize / 2, z],
          type: 'aisle',
        };
        break;
      case 'wall':
        newObject = {
          id: Math.random(),
          geometry: <WallWithWindowBlock />,
          material: <meshStandardMaterial color="gray" />,
          position: [x, yFactor * gridSize / 2, z],
          type: 'wall',
        };
        break;

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

  const saveMapState = (mapId) => {
    const mapState = {
      id: mapId,
      objects: objects.map(obj => {
        // Check if material and color are defined
        const color = obj.material && obj.material.color ? obj.material.color.getHex() : 0xffffff; // Default to white if color is undefined
        return {
          type: obj.type,  
          position: obj.position,
          // size: obj.geometry.props.args,  // Store the size (e.g., width, height, depth, etc.)
          color: color
        };
      })
    };
  
    localStorage.setItem(`map_${mapId}`, JSON.stringify(mapState));
  };
  
  
  const loadMapState = (mapId) => {
    const savedMap = localStorage.getItem(`map_${mapId}`);
    if (!savedMap) return;
  
    const { objects: savedObjects } = JSON.parse(savedMap);
    const loadedObjects = savedObjects.map(obj => {
      let geometry;
      let material;
      console.log(obj);
      switch (obj.type) {
        case 'cube':
          geometry = <boxGeometry args={[gridSize, gridSize, gridSize]} />
          material = <meshStandardMaterial color="blue" />;
          break;
        case 'sphere':
          geometry = <sphereGeometry args={[gridSize / 2, 32, 32]} />;
          material = <meshStandardMaterial color="red" />;
          break;
        case 'aisle':
          geometry = <AisleBlock />;
          material = <meshStandardMaterial color="red" />;
          break;
        case 'wall':
          geometry = <WallWithWindowBlock />;
          material = <meshStandardMaterial color="gray" />;
          break;
        
        default:
          break;
      }
  
  
      return {
        id: Math.random(),
        geometry: geometry,
        material: material,
        position: obj.position,
      };
    });
  
    setObjects(loadedObjects);
  };
  
  console.log(objects);
  return (
    <>
      <Canvas camera={{ position: [0, 150, 400], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* The Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow onPointerDown={handlePlaneClick}>
          <planeGeometry args={[5 * gridSize * gridCount, 5 * gridSize * gridCount]} />
          <meshStandardMaterial color="green" />
        </mesh>

        {/* Render objects */}
        {objects.map((obj) => (
          <mesh key={obj.id} position={obj.position} castShadow>
            {obj.geometry}
            {obj.material}
          </mesh>
        ))}

        <OrbitControls
            enablePan={true}            // Enable panning
            screenSpacePanning={true}  // Set to false for world space panning
            enableZoom={true}           // Enable zooming
            enableRotate={true}         // Enable rotation
            panSpeed={1.0}              // Adjust panning speed if needed
            zoomSpeed={1.2}             // Adjust zoom speed if needed
            rotateSpeed={1.0}           // Adjust rotation speed if needed
          />

        <CameraControls /> 
      </Canvas>
      <div className="panel">
        <button onClick={() => setSelectedObject('cube')}>Add Cube</button>
        <button onClick={() => setSelectedObject('sphere')}>Add Sphere</button>
        <button onClick={() => setSelectedObject('aisle')}>Add Aisle</button>
        <button onClick={() => setSelectedObject('wall')}>Add Wall</button>
        <button onClick={undo} disabled={history.length === 0}>
          <FontAwesomeIcon icon={faUndo} />
        </button>
        <button onClick={redo} disabled={redoStack.length === 0}>
          <FontAwesomeIcon icon={faRedo} />
        </button>
        <button onClick={() => saveMapState('myMap')}>
          <FontAwesomeIcon icon={faSave} />
        </button>
        <button onClick={() => loadMapState('myMap')}>
          <FontAwesomeIcon icon={faFolderOpen} />
        </button>
      </div>
    </>
  );
};

export default Map;
