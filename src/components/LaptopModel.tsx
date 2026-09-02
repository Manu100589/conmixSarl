import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';
import { lerp } from '../lib/utils';

interface LaptopModelProps {
  progress: number;
}

export function LaptopModel({ progress }: LaptopModelProps) {
  const laptopRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const screenImgRef = useRef<HTMLImageElement>(null);

  useFrame(() => {
    if (!laptopRef.current || !lidRef.current) return;
    
    const targetRotY = lerp(-0.6, 0.0, progress);
    const targetRotX = lerp(0.1, 0.2, progress);
    const targetLidRotX = lerp(-1.2, -1.65, progress);
    const targetPosY = lerp(0, -0.3, progress);
    const targetScale = lerp(1.0, 1.1, progress);
    
    laptopRef.current.rotation.y = lerp(laptopRef.current.rotation.y, targetRotY, 0.05);
    laptopRef.current.rotation.x = lerp(laptopRef.current.rotation.x, targetRotX, 0.05);
    lidRef.current.rotation.x = lerp(lidRef.current.rotation.x, targetLidRotX, 0.05);
    laptopRef.current.position.y = lerp(laptopRef.current.position.y, targetPosY, 0.05);
    const s = lerp(laptopRef.current.scale.x, targetScale, 0.05);
    laptopRef.current.scale.set(s, s, s);

    // Update screen frame sequence based on scroll progress
    if (screenImgRef.current) {
      const frameNum = Math.min(99, Math.max(0, Math.floor(progress * 100)));
      const paddedNum = String(frameNum).padStart(3, '0');
      const frameUrl = `/vid/Man_typing_on_laptop_202608280426_${paddedNum}.jpg`;
      if (screenImgRef.current.src !== window.location.origin + frameUrl) {
        screenImgRef.current.src = frameUrl;
      }
    }
  });

  return (
    <group ref={laptopRef} position={[0, 0, 0]}>
      {/* Laptop Base */}
      <group position={[0, 0, 0]}>
        {/* Main body */}
        <RoundedBox args={[3.2, 0.15, 2.2]} radius={0.05} smoothness={4} position={[0, 0, 0]}>
          <meshPhysicalMaterial color="#1a1a1f" metalness={0.8} roughness={0.2} clearcoat={1} />
        </RoundedBox>

        {/* Keyboard Area */}
        <RoundedBox args={[2.8, 0.01, 1.6]} radius={0.02} smoothness={4} position={[0, 0.08, -0.1]}>
          <meshPhysicalMaterial color="#0d0d10" metalness={0.5} roughness={0.5} />
        </RoundedBox>

        {/* Trackpad */}
        <RoundedBox args={[0.8, 0.005, 0.5]} radius={0.02} smoothness={4} position={[0, 0.08, 0.75]}>
          <meshPhysicalMaterial color="#0d0d10" metalness={0.6} roughness={0.4} />
        </RoundedBox>

        {/* Subtle Edge Highlights */}
        <RoundedBox args={[3.22, 0.01, 2.22]} radius={0.05} smoothness={4} position={[0, -0.07, 0]}>
          <meshBasicMaterial color="#333344" transparent opacity={0.3} />
        </RoundedBox>
      </group>

      {/* Screen Lid (hinged) */}
      <group ref={lidRef} position={[0, 0.075, -1.1]}>
        <group position={[0, 1.05, 0]}>
          {/* Screen Bezel */}
          <RoundedBox args={[3.2, 2.1, 0.1]} radius={0.05} smoothness={4} position={[0, 0, 0]}>
            <meshPhysicalMaterial color="#1a1a1f" metalness={0.8} roughness={0.2} clearcoat={1} />
          </RoundedBox>

          {/* Logo on the back */}
          <mesh position={[0, 0, -0.055]}>
            <circleGeometry args={[0.15, 32]} />
            <meshStandardMaterial color="#00B8FF" emissive="#00B8FF" emissiveIntensity={0.5} />
          </mesh>

          {/* Screen Display */}
          <mesh position={[0, 0, 0.051]}>
            <planeGeometry args={[2.85, 1.78]} />
            <meshBasicMaterial color="#111116" />
          </mesh>

          {/* Screen Content HTML using the /vid/ image sequence */}
          <Html
            transform
            occlude
            distanceFactor={1.5}
            position={[0, 0, 0.052]}
            style={{ width: '570px', height: '356px' }}
          >
            <div style={{ width: '570px', height: '356px', borderRadius: '4px', overflow: 'hidden', position: 'relative', background: '#000' }}>
              <img
                ref={screenImgRef}
                src="/vid/Man_typing_on_laptop_202608280426_000.jpg"
                alt="Man typing on laptop"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Glass reflection overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)',
                pointerEvents: 'none'
              }} />
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
}
