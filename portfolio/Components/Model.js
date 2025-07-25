/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef,useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'


import {useFrame} from "@react-three/fiber"

export default  function Model({viseme}) {
  
  
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/maleidle.glb')
  
  
  
  const { actions, names, mixer } = useAnimations(animations, group);

  // 🔁 Play first animation on load
  useEffect(() => {
    if (names.length > 0) {
      const action = actions[names[0]];
      action?.reset().play();
      console.log("▶️ Playing animation:", names[0]);
      
    }
  }, [actions, names]);

  // 🕒 Update animation mixer
  useFrame((_, delta) => {
    mixer?.update(delta);
  });

  // 🗣️ Apply viseme morph targets
  useEffect(() => {
    
    if (!viseme) return;

    const meshes = [
      nodes.Wolf3D_Head,
      nodes.Wolf3D_Teeth,
      nodes.EyeLeft,
      nodes.EyeRight,
    ];

    meshes.forEach((mesh) => {
      if (!mesh?.morphTargetDictionary || !mesh?.morphTargetInfluences) return;

      const dict = mesh.morphTargetDictionary;
      const infl = mesh.morphTargetInfluences;

      for (let i = 0; i < infl.length; i++) infl[i] = 0;

      const index = dict[viseme];
      if (index !== undefined) {
        infl[index] = 1;
        console.log(`✅ Viseme applied: ${viseme}`);
      } else {
        console.warn(`⚠️ Viseme not found: ${viseme}`);
      }
    });
  }, [viseme, nodes]);

  // 🧠 Log available viseme keys
  useEffect(() => {
    const head = nodes?.Wolf3D_Head;
    const dict = head?.morphTargetDictionary;
    if (dict) {
      const visemes = Object.keys(dict).filter((k) => k.startsWith("viseme_"));
      console.log("🧩 Available visemes:", visemes);
    }
  }, [nodes]);

  
  
  return (
    <group ref={group}  dispose={null}>
      <group name="Scene">
        <group
          name="Armature"
          position={[0, 0, 3]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}>
          <skinnedMesh
            name="EyeLeft"
            geometry={nodes.EyeLeft.geometry}
            material={materials['Wolf3D_Eye.003']}
            skeleton={nodes.EyeLeft.skeleton}
            morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
          />
          <skinnedMesh
            name="EyeRight"
            geometry={nodes.EyeRight.geometry}
            material={materials['Wolf3D_Eye.003']}
            skeleton={nodes.EyeRight.skeleton}
            morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
          />
          <skinnedMesh
            name="Wolf3D_Body"
            geometry={nodes.Wolf3D_Body.geometry}
            material={materials.Wolf3D_Body}
            skeleton={nodes.Wolf3D_Body.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Glasses"
            geometry={nodes.Wolf3D_Glasses.geometry}
            material={materials.Wolf3D_Glasses}
            skeleton={nodes.Wolf3D_Glasses.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Hair"
            geometry={nodes.Wolf3D_Hair.geometry}
            material={materials.Wolf3D_Hair}
            skeleton={nodes.Wolf3D_Hair.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Head"
            geometry={nodes.Wolf3D_Head.geometry}
            material={materials.Wolf3D_Skin}
            skeleton={nodes.Wolf3D_Head.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Bottom"
            geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
            material={materials.Wolf3D_Outfit_Bottom}
            skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Footwear"
            geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
            material={materials.Wolf3D_Outfit_Footwear}
            skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Top"
            geometry={nodes.Wolf3D_Outfit_Top.geometry}
            material={materials.Wolf3D_Outfit_Top}
            skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Teeth"
            geometry={nodes.Wolf3D_Teeth.geometry}
            material={materials['Wolf3D_Teeth.003']}
            skeleton={nodes.Wolf3D_Teeth.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/maleidle.glb')

