import * as THREE from 'three';
import {
  Center,
  Cylinder,
  Float,
  RoundedBox,
  Sphere,
  Text3D,
} from '@react-three/drei';
import { useState } from 'react';

interface Props {
  position: [number, number, number];
  heading: string;
}

const CardLink: React.FC<Props> = ({ position, heading }) => {
  const [buttonLight, setButtonLight] = useState<number>(0);
  const [buttonColor, setButtonColor] = useState<string>('red');
  const [headingLight, setHeadingLight] = useState<number>(0);

  return (
    <Float>
      <RoundedBox
        position={[...position]}
        args={[2.5, 1, 0.2]}
        material={
          new THREE.MeshStandardMaterial({
            color: 'lightgrey',
            roughness: 0.3,
            metalness: 0.9,
          })
        }
        onPointerEnter={() => setHeadingLight(0.5)}
        onPointerLeave={() => setHeadingLight(0)}
        receiveShadow
        castShadow
      >
        <Center position={[0, 0.575, 0.2]}>
          <Text3D
            font='./fonts/Neonderthaw/Neonderthaw_Regular.json'
            size={0.4}
            height={0.05}
            receiveShadow
            castShadow
          >
            {heading}
            <meshPhongMaterial
              color={'grey'}
              emissive={'yellow'}
              emissiveIntensity={headingLight}
            />
          </Text3D>
        </Center>
      </RoundedBox>

      <Cylinder
        args={[0.2, 0.2, 0.2]}
        position={[position[0], position[1], position[2] + 0.125]}
        rotation={[Math.PI / 2, 0, 0]}
        material={new THREE.MeshStandardMaterial({ color: 'lightgrey' })}
        receiveShadow
        castShadow
      />
      <Sphere
        args={[0.175]}
        position={[position[0], position[1], position[2] + 0.15]}
        rotation={[Math.PI / 2, 0, 0]}
        material={
          new THREE.MeshStandardMaterial({
            color: buttonColor,
            emissive: buttonColor,
            emissiveIntensity: buttonLight,
          })
        }
        onPointerEnter={() => {
          setButtonLight(1.5);
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          setButtonLight(0);
          document.body.style.cursor = 'auto';
        }}
        onPointerDown={() => setButtonColor('darkgreen')}
        onPointerUp={() => setButtonColor('red')}
        receiveShadow
        castShadow
      />
    </Float>
  );
};

export default CardLink;
