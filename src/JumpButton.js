import React, { useEffect } from 'react';
import { useKeyboardControls } from '@react-three/drei';

function JumpButton() {
  const [subscribeKeys, getKeys] = useKeyboardControls();

  const handleJump = () => {
    const jumpEvent = new Event('jump');
    window.dispatchEvent(jumpEvent);
  };

  useEffect(() => {
    const unsubscribe = subscribeKeys((state) => state.jump, (value) => {
      if (!value) {
        const keys = getKeys();
        keys.jump = false;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeKeys, getKeys]);

  return (
    <button
      style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        zIndex: 1002,
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        width: '100px',
        height: '100px',
        pointerEvents: 'auto',
        fontFamily: 'sans-serif', // Updated font to match App.js
        fontSize: '16px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={handleJump}
    >
      JUMP
    </button>
  );
}

export default JumpButton;