import * as THREE from 'three'
import { Plane, useAspect, useTexture } from '@react-three/drei'
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import FliesEffect from '../flieseffect'
import '../layermaterial'

const Scene = () => {
  const bgUrl = '/resources/sky1.png'
  const policepandaUrl = '/resources/policepanda.svg'
  const teacherpandaUrl = '/resources/teacherpanda.svg'
  const sunUrl = '/resources/sun.png'
  const backUrl = '/resources/back2.png'
  const cloud2Url = '/resources/cloud4.png'
  const cloud3Url = '/resources/cloud5.png'
  const cloud4Url = '/resources/cloud6.png'
  const scaleN1 = useAspect(450, 300, 0.5)
  const scaleN2 = useAspect(500, 350, 0.5)
  const scaleW = useAspect(2000, 1100, 1.03)
  const textures = useTexture([bgUrl, policepandaUrl, backUrl, cloud2Url, cloud3Url, cloud4Url, teacherpandaUrl, sunUrl])
  const group = useRef()
  const layersRef = useRef([])
  const [movement] = useState(() => new THREE.Vector3())
  const [temp] = useState(() => new THREE.Vector3())
  const layers = [
    { texture: textures[0], z: 28, scale: scaleW },
    { texture: textures[1], z: 45, factor: -0.10, scaleFactor: 0.5, scale: scaleN1 },
    { texture: textures[2], factor: 0.02, scaleFactor: 1.05, z: 44, wiggle: 0.5, scale: scaleW },
    { texture: textures[3], factor: 0.04, scaleFactor: 1.07, z: 40, wiggle: 0.4, scale: scaleW },
    { texture: textures[4], factor: 0.05, scaleFactor: 0.98, z: 42, wiggle: 0.6, scale: scaleW },
    { texture: textures[5], factor: 0.05, scaleFactor: 0.95, z: 41, wiggle: 0.6, scale: scaleW },
    { texture: textures[6], z: 45, factor: -0.10, scaleFactor: 0.5, scale: scaleN2 },
    { texture: textures[7], factor: 0.05, scaleFactor: 0.99, z: 43, wiggle: 1, scale: scaleW },
  ]

  useFrame((state, delta) => {
    movement.lerp(temp.set(state.mouse.x, state.mouse.y * 0.2, 0), 0.2)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.mouse.y * 10, 0.2)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x / 10, state.mouse.y / 20, 0.2)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.x, -state.mouse.x / 2, 0.2)
    layersRef.current[2].uniforms.time.value = layersRef.current[3].uniforms.time.value = layersRef.current[4].uniforms.time.value = layersRef.current[5].uniforms.time.value += delta
  }, 1)

  return (
    <group ref={group}>
      <FliesEffect count={100} radius={80} colors={['white']} />
      {layers.map(({ onClick = null,scale, texture, ref, factor = 0, scaleFactor = 1, wiggle = 0, z }, i) => (
        <Plane onClick={onClick} scale={scale} args={[1, 1, wiggle ? 10 : 1, wiggle ? 10 : 1]} position={[i === 1 ? 160 : i === 6 ? -45 : 0 , i === 1 ? -46 : i === 6 ? -45 : 0, z]} key={i} ref={ref}>
          <layerMaterial movement={movement} textr={texture} factor={factor} ref={(el) => (layersRef.current[i] = el)} wiggle={wiggle} scale={scaleFactor} />
        </Plane>
      ))}
    </group>
  )
};

export default Scene;
