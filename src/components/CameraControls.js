import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

const CameraControls = () => {
  const { camera } = useThree();

  const handleMoveCamera = (direction) => {
    const step = 10; // Define how much the camera should move per step
    switch (direction) {
      case 'left':
        camera.position.x -= step;
        break;
      case 'right':
        camera.position.x += step;
        break;
      case 'up':
        camera.position.z -= step;  // Moving up means reducing z to move forward
        break;
      case 'down':
        camera.position.z += step;  // Moving down means increasing z to move backward
        break;
      default:
        break;
    }
    camera.updateProjectionMatrix();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          handleMoveCamera('left');
          break;
        case 'ArrowRight':
          handleMoveCamera('right');
          break;
        case 'ArrowUp':
          handleMoveCamera('up');
          break;
        case 'ArrowDown':
          handleMoveCamera('down');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [camera]);

  return null; // This component doesn't render anything visible
};

export default CameraControls;
