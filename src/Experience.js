/* eslint-disable react/no-unknown-property */
import { OrbitControls, Sparkles, RandomizedLight } from '@react-three/drei';
import Lights from './Lights.js';
import { Level } from './Level.js';
import { Physics, Debug } from '@react-three/rapier';
import Player from './Player.js';
import useGame from './hooks/useGame.js';
import Effects from './Effects.js';
import { useState, useEffect } from 'react';
import gsap from 'gsap';

export default function Experience({ glitchActive }) {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  const [chiptune] = useState(() => new Audio('/kim-lightyear-angel-eyes-chiptune-edit.mp3'));
  const niceColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF5'];
  const [sparkleColor, setSparkleColor] = useState(() => niceColors[Math.floor(Math.random() * niceColors.length)]);

  const SoundTrack = () => {
    chiptune.currentTime = 0;
    chiptune.volume = 0.2;
    chiptune.play();
  };

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <SoundTrack />
      <color args={['#000000']} attach="background" />
      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
      <Sparkles 
        size={16}
        scale={[5, 2, 50 * 4]}
        position={[0, 1, -50 * 2]}
        color={sparkleColor}
        intensity={5}
      />
      <RandomizedLight />
      {/* <Effects /> */}
    </>
  );
}
