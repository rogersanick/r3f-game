import React, { useEffect } from 'react';
import { useKeyboardControls } from '@react-three/drei';
import { Joystick } from 'react-joystick-component';

function JoyStickComponent() {
  const [subscribeKeys, getKeys] = useKeyboardControls();

  const handleMove = (event) => {
    const { x, y } = event;
    const keys = getKeys();

    // Map joystick movement to keyboard controls with reversed up and down
    if (y < 0) {
      keys.forward = false;
      keys.backward = true;
    } else if (y > 0) {
      keys.forward = true;
      keys.backward = false;
    } else {
      keys.forward = false;
      keys.backward = false;
    }

    if (x < 0) {
      keys.left = true;
      keys.right = false;
    } else if (x > 0) {
      keys.left = false;
      keys.right = true;
    } else {
      keys.left = false;
      keys.right = false;
    }
  };

  const handleStop = () => {
    const keys = getKeys();
    keys.forward = false;
    keys.backward = false;
    keys.left = false;
    keys.right = false;
  };

  useEffect(() => {
    const unsubscribe = subscribeKeys((state) => state, (value) => {
      // Update the state based on joystick input
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeKeys]);

  return (
    <Joystick
      size={100}
      sticky={true}
      baseColor="red"
      stickColor="blue"
      move={handleMove}
      stop={handleStop}
    />
  );
}

export default JoyStickComponent;
