/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
THREE.ColorManagement.legacyMode = false;

import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { Float, Text, useGLTF } from '@react-three/drei';
import ExplosionConfetti from './Confetti';
import useGame from './hooks/useGame';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({
  color: '#d20b7a', // Complementary neon color of '#2b9720'
  metalness: 0.5,
  roughness: 0.5,
});
const floor2Material = new THREE.MeshStandardMaterial({
  color: '#a10c73', // Complementary neon color of '#5ef38c'
  metalness: 0.5,
  roughness: 0.5,
});
const obstacleMaterial = new THREE.MeshStandardMaterial({
  color: '#11faaa', // Complementary neon color of '#ee6055'
  metalness: 0.5,
  roughness: 1,
});
const wallMaterial = new THREE.MeshStandardMaterial({
  color: '#04D9FF', // Neon blue color
  metalness: 0.9,
  roughness: 0.01,
});

const boxMaterial = new THREE.MeshStandardMaterial({
  color: '#dcd60b', // Complementary neon color of '#2291fc'
  metalness: Math.random(),
  roughness: Math.random(),
});

export function BlockStart({ position = [0, 0, 0] }) {
  const blockRef = useRef();

  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font="./bebas-neue-v9-latin-regular.woff"
          scale={0.24}
          position={[0.55, 0.65, 0]}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          rotation-y={-0.55}
          color="#fff33a"
        >
          Super secret Marble Ninja Game
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <Float floatIntensity={0.75} rotationIntensity={0.5}>
        <Text
          font="./bebas-neue-v9-latin-regular.woff"
          scale={0.2}
          position={[-0.5, 0.65, 0.4]}
          maxWidth={0.5}
          lineHeight={0.75}
          textAlign="left"
          rotation-y={0.55}
        >
          Stefan, can you beat 48s?
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <mesh
        ref={blockRef}
        geometry={boxGeometry}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
        material={floor1Material}
      />
    </group>
  );
}

export function BlockEnd({ position = [0, 0, 0] }) {
  const blockRef = useRef();

  const hamburger = useGLTF('/hamburger.glb', true);
  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });
  const phase = useGame((state) => state.phase);

  const finishBoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

  const props = {
    // type: 'kinematicPosition',
    colliders: 'hull',
    friction: 1,
    restitution: 0.2,
    mass: 0.025,
    gravityScale: 0.3,
  };

  const endTime = useGame((state) => state.endTime);
  const startTime = useGame((state) => state.startTime);
  const timeElapsed = (endTime - startTime) / 1000;
  return (
    <group position={position}>
      <Text font="./bebas-neue-v9-latin-regular.woff" scale={0.5} position={[0, 2.25, 0]}>
        Finish
        <meshBasicMaterial toneMapped={false} />
      </Text>
      {phase === 'ended' && timeElapsed <= 48 && (
        <>
          <ExplosionConfetti 
            position={[0, 4, 0]}             
            rate={2.5}
            amount={45}
            scale={10}
            fallingHeight={10}
            enableShadows
            isExploding
            colors={['#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#DB7093']}
          />
        </>
      )}
      <Float>
        {phase === 'ended' && timeElapsed <= 48 && (
          <>
            <Text font="./bebas-neue-v9-latin-regular.woff" scale={0.5} position={[0, 1, 0]}>
              {`We're Expecting!`}
              <meshBasicMaterial toneMapped={false} />
            </Text>
            <Text font="./bebas-neue-v9-latin-regular.woff" scale={0.3} position={[0, 0.6, 0]}>
              {`It's a girl!`}
              <meshBasicMaterial toneMapped={false} />
            </Text>
          </>

        )}
      </Float>
      <mesh
        ref={blockRef}
        geometry={boxGeometry}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
        material={floor1Material}
      />
      <RigidBody {...props} position={[-0.51, 0.25, 0]} rotation-y={[-0.25]}>
        <mesh castShadow material={boxMaterial} geometry={finishBoxGeometry} />
      </RigidBody>
      <RigidBody {...props} position={[0, 0.25, 0]}>
        <mesh castShadow material={boxMaterial} geometry={finishBoxGeometry} />
      </RigidBody>
      <RigidBody {...props} position={[0.52, 0.25, 0]} rotation-y={[0.29]}>
        <mesh castShadow material={boxMaterial} geometry={finishBoxGeometry} />
      </RigidBody>
      <RigidBody {...props} position={[-0.275, 0.75, 0]} rotation-y={[-0.19]}>
        <mesh castShadow material={boxMaterial} geometry={finishBoxGeometry} />
      </RigidBody>
      <RigidBody {...props} position={[0.251, 0.75, 0]} rotation-y={[0.09]}>
        <mesh castShadow material={boxMaterial} geometry={finishBoxGeometry} />
      </RigidBody>
      <RigidBody {...props} position={[0, 1.25, 0]} rotation-y={[0.1]}>
        <mesh castShadow material={boxMaterial} geometry={finishBoxGeometry} />
      </RigidBody>
    </group>
  );
}

export function BlockSpinner({ position = [0, 0, 0] }) {
  const obstacle = useRef();

  const [speed] = useState(() => (Math.random() + 0.3) * (Math.random() < 0.5 ? -1 : 1));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle.current.setNextKinematicRotation(rotation);
  });

  const [hitSound] = useState(() => new Audio('/hit.mp3'));
  const hitEnter = () => {
    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  };

  return (
    <group position={position}>
      <mesh
        receiveShadow
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
        onCollisionEnter={hitEnter}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
        />
      </RigidBody>
    </group>
  );
}

export function BlockLimbo({ position = [0, 0, 0] }) {
  const [hitSound] = useState(() => new Audio('/hit.mp3'));
  const hitEnter = () => {
    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  };
  const obstacle = useRef();

  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const y = Math.sin(time + timeOffset) + 1.15;
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        receiveShadow
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
        onCollisionEnter={hitEnter}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
        />
      </RigidBody>
    </group>
  );
}

export function BlockAxe({ position = [0, 0, 0] }) {
  const [hitSound] = useState(() => new Audio('/hit.mp3'));
  const hitEnter = () => {
    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  };
  const obstacle = useRef();

  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(time + timeOffset) * 1.25;
    obstacle.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        receiveShadow
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
        onCollisionEnter={hitEnter}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
        />
      </RigidBody>
    </group>
  );
}

function Bounds({ length = 1 }) {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          position={[2.15, 0.75, -(length * 2) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[0.3, 1.5, 4 * length]}
          castShadow
        />
        <mesh
          position={[-2.15, 0.75, -(length * 2) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[0.3, 1.5, 4 * length]}
          receiveShadow
        />
        <mesh
          position={[0, 0.75, -(length * 4) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[4, 1.5, 0.3]}
          receiveShadow
        />
        <CuboidCollider args={[2, 0.1, 2 * length]} position={[0, -0.1, -(length * 2) + 2]} />
      </RigidBody>
    </>
  );
}

export function Level({ count = 5, types = [BlockSpinner, BlockLimbo, BlockAxe], seed = 0 }) {
  const blocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }
    return blocks;
  }, [count, seed]);

  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, i) => (
        <Block key={i} position={[0, 0, -(i + 1) * 4]} />
      ))}
      <BlockEnd position={[0, 0, -(count + 1) * 4]} />
      <Bounds length={count + 2} />
    </>
  );
}
