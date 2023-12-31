'use client'

import { Canvas } from '@react-three/fiber'
import Scene from './scene'
import Effects from './effects'
import '@/styles/theme/style.css'

const ThemeCanvas = () => {
  return (
    <Canvas orthographic camera={{ zoom: 5, position: [0, 0, 200], far: 300, near: 50 }}>
      <Scene />
      <Effects />
    </Canvas>
  );
};

export default ThemeCanvas;
