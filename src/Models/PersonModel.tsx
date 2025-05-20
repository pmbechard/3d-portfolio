import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import {
  EffectComposer,
  Glitch,
  Select,
  Selection,
} from '@react-three/postprocessing';

const PersonModel = () => {
  const { scene } = useGLTF('./models/person.glb');
  // @ts-ignore
  scene.children[0].children[0].material = new THREE.MeshStandardMaterial({
    color: 'red',
  });

  return (
    <>
      <Selection>
        <EffectComposer>
          <Glitch />
        </EffectComposer>
      </Selection>
      <Select enabled>
        <primitive object={scene.children[0]} scale={0.001} />
      </Select>
    </>
  );
};

export default PersonModel;
