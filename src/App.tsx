import * as THREE from 'three';
import gsap from 'gsap';
import './App.css';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

import { Center, Sparkles, Text3D } from '@react-three/drei';
import CardLink from './Components/CardLink';
import PersonModel from './Models/PersonModel';

function App() {
  const spotLightRef = useRef<THREE.SpotLight>(null);

  useFrame((e) => {
    // Parallax
    gsap.to(e.camera.position, {
      x: 0 + e.pointer.x * 2,
      y: 0 + e.pointer.y * 2,
      duration: 0.5,
    });
    e.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Spotlight
    if (spotLightRef.current) {
      const targetPos = new THREE.Vector3(e.pointer.x * 5, e.pointer.y * 5, 0);
      spotLightRef.current.target.position.copy(targetPos);
      spotLightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      <Sparkles count={100} speed={0.5} opacity={0.7} scale={10} size={2} />

      <color attach='background' args={['#08040d']} />

      <ambientLight intensity={0.25} />
      <spotLight
        ref={spotLightRef}
        position={[0, 0, 5]}
        intensity={30}
        angle={Math.PI / 8}
        castShadow
        receiveShadow
      />

      <Center>
        <Text3D
          font='./fonts/Neonderthaw/Neonderthaw_Regular.json'
          size={0.6}
          height={0.2}
          position={[-1.75, 0, 0]}
          receiveShadow
          castShadow
        >
          peyton bechard
          <meshPhongMaterial
            color={'grey'}
            emissive={'teal'}
            emissiveIntensity={0.5}
          />
        </Text3D>
      </Center>

      <PersonModel />
      <CardLink position={[-4, 2, 0]} heading={'about'} />
      <CardLink position={[0, 2, 0]} heading={'education'} />
      <CardLink position={[4, 2, 0]} heading={'experience'} />
      <CardLink position={[-4, -2, 0]} heading={'projects'} />
      <CardLink position={[0, -2, 0]} heading={'blog'} />
      <CardLink position={[4, -2, 0]} heading={'contact'} />
    </>
  );
}

export default App;
