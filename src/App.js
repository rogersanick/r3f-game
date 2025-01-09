import './App.css';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.js';
import { KeyboardControls } from '@react-three/drei';
import Interface from './Interface';
import { EffectComposer, Glitch } from '@react-three/postprocessing';
import { useEffect, useMemo, useState } from 'react';
import useGame from './hooks/useGame.js';

function App() {
  const setGlitchActive = useGame((state) => state.setGlitchActive);
  const phase = useGame((state) => state.phase);
  const isGlitchActive = useGame((state) => state.glitchActive);
  const [message, setMessage] = useState('');

  const messages = useMemo(() => [
    `Almost there, detective! Or are you?`,
    `Keep going, you might stumble upon something!`,
    `You’re on the right track, sort of!`,
    `Keep it up, you might surprise us all!`,
    `You’re doing great, kind of!`,
    `Nice try, keep going, maybe you’ll get it!`,
    `Almost there, champ! Or not!`,
    `You can do it, eventually, we hope!`,
    `Keep it up, sort of, the secret awaits!`,
    `You’re closer than you think, or are you?`,
    `Keep pushing, you might find something big!`,
    `You’re almost there, in a way!`,
    `Keep trying, the secret is almost yours!`,
    `You’re doing well, kind of, keep going!`,
    `Almost there, genius! Or maybe not!`,
    `Keep going, you might just crack it!`,
    `You’re on the verge of something, maybe!`,
    `Keep it up, the secret is just around the corner!`,
    `You’re doing great, sort of, keep at it!`,
    `Almost there, the big reveal is near, or is it?`
  ], []);

  useEffect(() => {
    let glitchTimeout;
    const interval = setInterval(() => {
      if (phase !== 'ended') {
        setGlitchActive(true);
        glitchTimeout = setTimeout(() => {
          setGlitchActive(false);
        }, 1000);
      }
    }, 4000); // 1 second active + 3 seconds delay

    return () => {
      clearInterval(interval);
      clearTimeout(glitchTimeout);
    };
  }, [phase, setGlitchActive]);

  useEffect(() => {
    if (isGlitchActive) {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setMessage(messages[randomIndex]);
    } else {
      setMessage('');
    }
  }, [isGlitchActive, messages]);

  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['KeyW', 'ArrowUp'] }, 
        { name: 'backward', keys: ['KeyS', 'ArrowDown'] }, 
        { name: 'left', keys: ['KeyA', 'ArrowLeft'] }, 
        { name: 'right', keys: ['KeyD', 'ArrowRight'] },
        { name: 'jump', keys: ['Space'] },
      ]}
    >
      {isGlitchActive && message && <div className="message-overlay">
        {message}
      </div>}
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        <Experience />
      </Canvas>
      <Interface />
    </KeyboardControls>
  );
}

export default App;
