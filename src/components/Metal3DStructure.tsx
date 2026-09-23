import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Metal3DStructure: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 600;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for the 3D metal structure
    const structureGroup = new THREE.Group();
    scene.add(structureGroup);

    // Materials: Burnished Industrial Steel & Glowing Welds
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a5058,
      metalness: 0.92,
      roughness: 0.28,
      wireframe: false,
    });

    const highlightMaterial = new THREE.MeshStandardMaterial({
      color: 0xc82333,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x6b0f1a,
      emissiveIntensity: 0.6,
    });

    const weldMaterial = new THREE.MeshBasicMaterial({
      color: 0xff3b4e,
    });

    // Generate Architectural Truss / Structural Lattice
    const nodes: THREE.Vector3[] = [];
    const nodeCount = 14;
    const radius = 2.4;
    const heightSpan = 4.2;

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 4;
      const y = ((i / (nodeCount - 1)) - 0.5) * heightSpan;
      const r = radius * (1 - Math.abs(y) / (heightSpan * 1.4));
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const pos = new THREE.Vector3(x, y, z);
      nodes.push(pos);

      // Sphere at each node (weld joint)
      const jointGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const jointMesh = new THREE.Mesh(jointGeo, i % 3 === 0 ? highlightMaterial : steelMaterial);
      jointMesh.position.copy(pos);
      structureGroup.add(jointMesh);

      // Glowing weld pulse point
      if (i % 2 === 0) {
        const weldGeo = new THREE.SphereGeometry(0.035, 8, 8);
        const weldMesh = new THREE.Mesh(weldGeo, weldMaterial);
        weldMesh.position.copy(pos);
        structureGroup.add(weldMesh);
      }
    }

    // Connect nodes with steel beams (Cylinder beams)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 2.5) {
          const p1 = nodes[i];
          const p2 = nodes[j];
          const dir = new THREE.Vector3().subVectors(p2, p1);
          const orientation = new THREE.Matrix4();
          orientation.lookAt(p1, p2, new THREE.Vector3(0, 1, 0));

          const beamGeo = new THREE.CylinderGeometry(0.022, 0.022, dist, 8);
          const beamMesh = new THREE.Mesh(
            beamGeo,
            i % 4 === 0 ? highlightMaterial : steelMaterial
          );

          beamMesh.position.copy(p1).add(dir.clone().multiplyScalar(0.5));
          beamMesh.quaternion.setFromRotationMatrix(orientation);
          beamMesh.rotateX(Math.PI / 2);
          structureGroup.add(beamMesh);
        }
      }
    }

    // Secondary I-Beam ring representing industrial girder frame
    const ringGeo = new THREE.TorusGeometry(2.1, 0.04, 16, 48);
    const ringMesh1 = new THREE.Mesh(ringGeo, steelMaterial);
    ringMesh1.rotation.x = Math.PI / 2;
    ringMesh1.position.y = -1.2;
    structureGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, steelMaterial);
    ringMesh2.rotation.x = Math.PI / 2;
    ringMesh2.position.y = 1.2;
    structureGroup.add(ringMesh2);

    // Industrial Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const crimsonLight = new THREE.PointLight(0xc82333, 4, 10);
    crimsonLight.position.set(-2, 1, 3);
    scene.add(crimsonLight);

    const rimLight = new THREE.PointLight(0x4a90e2, 2.5, 10);
    rimLight.position.set(3, -2, -3);
    scene.add(rimLight);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Continuous subtle kinetic rotation
      structureGroup.rotation.y = elapsed * 0.18 + targetRotY;
      structureGroup.rotation.x = Math.sin(elapsed * 0.12) * 0.12 + targetRotX;
      structureGroup.position.y = Math.sin(elapsed * 0.5) * 0.15;

      // Smooth lerp to mouse
      targetRotY += (mouseX * 0.35 - targetRotY) * 0.05;
      targetRotX += (mouseY * 0.25 - targetRotX) * 0.05;

      // Pulsing crimson laser weld light
      crimsonLight.intensity = 3 + Math.sin(elapsed * 4) * 1.5;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="w-[46%] sm:w-[48%] right-0 pointer-events-none overflow-hidden absolute inset-y-0 z-10 flex items-center justify-center opacity-85 select-none"
    >
      <div
        ref={mountRef}
        className="w-full h-full min-h-[500px] flex items-center justify-center pointer-events-none"
      />
    </div>
  );
};
