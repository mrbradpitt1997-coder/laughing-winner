"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { ArrowRight, Zap, TrendingUp, Shield, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";


// --- CosmosVisualization code ---
interface StarData {
  id?: number;
  name?: string;
  ra: number;
  dec: number;
  mag: number;
  bv: number;
  spectralClass?: string;
  distance?: number;
}

function generateSampleStarData(): StarData[] {
  const famousStars = [
    { name: "Sirius", ra: 6.75, dec: -16.72, mag: -1.46, bv: 0.0, spectralClass: "A1V" },
    { name: "Canopus", ra: 6.4, dec: -52.7, mag: -0.74, bv: 0.15, spectralClass: "A9II" },
    { name: "Arcturus", ra: 14.26, dec: 19.18, mag: -0.05, bv: 1.23, spectralClass: "K1.5III" },
    { name: "Vega", ra: 18.62, dec: 38.78, mag: 0.03, bv: 0.0, spectralClass: "A0V" },
    { name: "Capella", ra: 5.28, dec: 45.99, mag: 0.08, bv: 0.8, spectralClass: "G5III" },
    { name: "Rigel", ra: 5.24, dec: -8.2, mag: 0.13, bv: -0.03, spectralClass: "B8Iae" },
    { name: "Procyon", ra: 7.65, dec: 5.23, mag: 0.34, bv: 0.42, spectralClass: "F5IV-V" },
    { name: "Betelgeuse", ra: 5.92, dec: 7.41, mag: 0.5, bv: 1.85, spectralClass: "M1-2Ia-Iab" },
    { name: "Achernar", ra: 1.63, dec: -57.24, mag: 0.46, bv: -0.19, spectralClass: "B6Vep" },
    { name: "Altair", ra: 19.85, dec: 8.87, mag: 0.77, bv: 0.22, spectralClass: "A7V" },
  ];
  const sampleStars: StarData[] = [...famousStars];
  for (let i = 0; i < 500; i++) {
    sampleStars.push({
      id: i + famousStars.length,
      name: `Star-${i}`,
      ra: Math.random() * 24,
      dec: (Math.random() - 0.5) * 180,
      mag: Math.random() * 6 + 1,
      bv: (Math.random() - 0.3) * 2,
      spectralClass: ["O", "B", "A", "F", "G", "K", "M"][Math.floor(Math.random() * 7)],
    });
  }
  return sampleStars;
}

const CosmosVisualization = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Mobile UI: make canvas fill viewport height and remove border on mobile
    if (window.innerWidth < 768) {
      mount.style.height = '100vh';
      mount.style.border = 'none';
      mount.style.borderRadius = '0';
      mount.style.boxShadow = 'none';
    }
    // Make the scene circular (clip/crop to a circle)
    mount.style.overflow = 'hidden';
    mount.style.borderRadius = '50%';

    // Scene setup
    const scene = new THREE.Scene();
    const bgColor = new THREE.Color(0x000005);
    scene.background = bgColor;
  // Fine-tuned fog: starts farther, ends before max zoom for a smoother haze
  scene.fog = new THREE.Fog(bgColor, 2200, 4800);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      window.innerWidth < 768 ? 85 : 75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      5000
    );
  camera.position.set(0, 0, 1200);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: window.devicePixelRatio < 2,
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // Enhanced mobile & desktop touch controls
    let isInteracting = false;
    let autoRotate = true;
    let autoRotateSpeed = 0.002;
    let previousTouches: Touch[] = [];
    let rotationVelocity = { x: 0, y: 0 };
    const dampingFactor = 0.95;
  // Increase frame-to-frame zoom/rotation volume for more responsive zoom interactions
  const rotationSpeed = window.innerWidth < 768 ? 0.012 : 0.008;

    let lastInteractionTime = Date.now();
    let lastTap = 0;

    const handleStart = (clientX: number, clientY: number) => {
      isInteracting = true;
      autoRotate = false;
      rotationVelocity = { x: 0, y: 0 };
      previousTouches = [{ clientX, clientY } as Touch];
    };

    // Trackball-style infinite rotation using quaternions and persistent up vector
    const cameraQuatRef = { quat: camera.quaternion.clone() };
    const upRef = { up: new THREE.Vector3(0, 1, 0) };
    const handleMove = (clientX: number, clientY: number) => {
      if (!isInteracting || previousTouches.length === 0) return;
      const deltaX = clientX - previousTouches[0].clientX;
      const deltaY = clientY - previousTouches[0].clientY;
      // Trackball: rotate around up for X, and around right for Y
      const qY = new THREE.Quaternion();
      qY.setFromAxisAngle(upRef.up, -deltaX * rotationSpeed);
      // Right axis is always perpendicular to up and camera direction
      const camDir = new THREE.Vector3();
      camera.getWorldDirection(camDir);
      const right = new THREE.Vector3().crossVectors(upRef.up, camDir).normalize();
      const qX = new THREE.Quaternion();
      qX.setFromAxisAngle(right, -deltaY * rotationSpeed);
      cameraQuatRef.quat.premultiply(qY).premultiply(qX);
      camera.quaternion.copy(cameraQuatRef.quat);
      // Update up vector to match camera orientation
      upRef.up.copy(new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion).normalize());
      camera.up.copy(upRef.up);
      // Keep camera at same distance from origin
      const distance = camera.position.length();
      camera.position.set(0, 0, 1).applyQuaternion(camera.quaternion).multiplyScalar(distance);
      camera.lookAt(0, 0, 0);
      rotationVelocity.x = deltaX * rotationSpeed * 0.1;
      rotationVelocity.y = deltaY * rotationSpeed * 0.1;
      previousTouches = [{ clientX, clientY } as Touch];
      lastInteractionTime = Date.now();
      // Always update persistent quaternion from camera after move
      cameraQuatRef.quat.copy(camera.quaternion);
    };

    const handleEnd = () => {
      isInteracting = false;
      previousTouches = [];
      setTimeout(() => {
        if (Date.now() - lastInteractionTime > 2000) {
          autoRotate = true;
        }
      }, 2000);
    };

    // Event handlers
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    };
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleMouseUp = () => handleEnd();

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      // Double-tap to zoom in (mobile)
      if (e.touches.length === 1) {
        const now = Date.now();
        if (now - lastTap < 350) {
          // Double-tap detected: zoom in
          camera.position.multiplyScalar(0.7);
          const distance = camera.position.length();
          if (distance < 120) camera.position.normalize().multiplyScalar(120);
          else if (distance > 3100) camera.position.normalize().multiplyScalar(3100);
        } else {
          handleStart(e.touches[0].clientX, e.touches[0].clientY);
        }
        lastTap = now;
      }
      // Pinch-to-zoom start
      if (e.touches.length === 2) {
        previousTouches = [e.touches[0], e.touches[1]];
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2 && previousTouches.length === 2) {
        // Pinch-to-zoom
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const previousDistance = Math.hypot(
          previousTouches[0].clientX - previousTouches[1].clientX,
          previousTouches[0].clientY - previousTouches[1].clientY
        );
        if (previousDistance > 0) {
          const scale = currentDistance / previousDistance;
          camera.position.multiplyScalar(1 / scale);
          const distance = camera.position.length();
          if (distance < 120) camera.position.normalize().multiplyScalar(120);
          else if (distance > 3100) camera.position.normalize().multiplyScalar(3100);
        }
        previousTouches = [e.touches[0], e.touches[1]];
      }
    };

    const handleTouchEnd = () => handleEnd();

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
    camera.position.multiplyScalar(1 + direction * zoomSpeed);
    const distance = camera.position.length();
    if (distance < 150) camera.position.normalize().multiplyScalar(150);
    else if (distance > 3100) camera.position.normalize().multiplyScalar(3100);
      lastInteractionTime = Date.now();
      autoRotate = false;
    };

    // Event listeners
    mount.addEventListener('mousedown', handleMouseDown);
    mount.addEventListener('mousemove', handleMouseMove);
    mount.addEventListener('mouseup', handleMouseUp);
    mount.addEventListener('mouseleave', handleMouseUp);
    mount.addEventListener('touchstart', handleTouchStart, { passive: false });
    mount.addEventListener('touchmove', handleTouchMove, { passive: false });
    mount.addEventListener('touchend', handleTouchEnd);
    mount.addEventListener('wheel', handleWheel, { passive: false });

    // CENTRAL NEUTRON STAR (small, extremely bright, blue-white, rapid rotation, pulsar beam)
    const neutronStarRadius = 4;
    const centralSphereGeometry = new THREE.SphereGeometry(neutronStarRadius, 64, 64);
    const centralSphereMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe5bc65, // Gold/yellow
      emissive: 0xe5bc65,
      emissiveIntensity: 1.1, // Lowered for more natural color
      metalness: 0.7,
      roughness: 0.15,
      transmission: 0.7,
      transparent: true,
      opacity: 0.98,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const centralSphere = new THREE.Mesh(centralSphereGeometry, centralSphereMaterial);
    scene.add(centralSphere);

    // Add a pulsar beam (cylinder) to simulate neutron star emission
  // Make the pulsar beam thin to simulate a real pulsar
  const beamGeometry = new THREE.CylinderGeometry(0.35, 0.35, 180, 48, 1, true);
    const beamMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const pulsarBeam = new THREE.Mesh(beamGeometry, beamMaterial);
    pulsarBeam.position.set(0, 0, 0);
    pulsarBeam.rotation.x = Math.PI / 2;
    centralSphere.add(pulsarBeam);

    // ORBITING SMALL CUBES (Brighter, more saturated colors)
    const orbitingCubes: THREE.Mesh[] = [];
    const orbitData: { radius: number; speed: number; angle: number; yOffset: number }[] = [];
    const orbitColors = [0xff3b3b, 0xffb800, 0x00ff85, 0x3b8bff, 0xff3bff, 0x00e1ff, 0xff7f00, 0x8dff00];
    for (let i = 0; i < 8; i++) {
      const smallCubeGeometry = new THREE.BoxGeometry(6, 6, 6);
      // Increase glow: use MeshBasicMaterial, higher opacity, additive blending
      const smallCubeMaterial = new THREE.MeshBasicMaterial({
        color: orbitColors[i % orbitColors.length],
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending
      });
      const smallCube = new THREE.Mesh(smallCubeGeometry, smallCubeMaterial);
      orbitingCubes.push(smallCube);
      scene.add(smallCube);
      orbitData.push({
        radius: 60 + (i % 3) * 25,
        speed: 0.01 + Math.random() * 0.02,
        angle: (i / 8) * Math.PI * 2,
        yOffset: (Math.random() - 0.5) * 40
      });
    }

    // ENHANCED STAR FIELD (Brighter, more visible, with distance-based fading and scaling)
    const data = generateSampleStarData();
    // Track all star meshes for animation updates
    const starMeshes: { mesh: THREE.Mesh, baseSize: number, baseOpacity: number }[] = [];
    for (const star of data) {
      let r = 1200;
      let theta, phi;
      if (star.name && star.name.startsWith('Star-')) {
        theta = Math.random() * 2 * Math.PI;
        phi = Math.acos(2 * Math.random() - 1);
      } else {
        theta = (star.ra ?? 0) * 15 * (Math.PI / 180);
        phi = (Math.PI / 2) - (star.dec ?? 0) * (Math.PI / 180);
      }
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      let color = new THREE.Color(1, 1, 1);
      if (star.spectralClass) {
        const type = star.spectralClass[0].toUpperCase();
        if (type === "O") color = new THREE.Color(0.6, 0.8, 1.0);
        else if (type === "B") color = new THREE.Color(0.7, 0.9, 1.0);
        else if (type === "A") color = new THREE.Color(1.0, 1.0, 1.0);
        else if (type === "F") color = new THREE.Color(1.0, 1.0, 0.7);
        else if (type === "G") color = new THREE.Color(1.0, 0.95, 0.5);
        else if (type === "K") color = new THREE.Color(1.0, 0.7, 0.2);
        else if (type === "M") color = new THREE.Color(1.0, 0.4, 0.1);
      }
      // Star size based on magnitude (brighter = bigger)
      // Make field stars glow more: increase size and opacity
      const baseSizeMod = star.name && star.name !== `Star-${star.id}` ? 3.5 : 1.25;
      const size = Math.max(3.5, (7 - star.mag) * baseSizeMod) * 0.9;
      const geometry = new THREE.BoxGeometry(size, size, size);
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      starMeshes.push({ mesh, baseSize: size, baseOpacity: 1.0 });
    }

    // Add an extremely glowing effect to the central sphere using two large, additive-blended sphere shells
    const glowSphereGeometry1 = new THREE.SphereGeometry(45, 48, 48);
    const glowSphereMaterial1 = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const glowSphere1 = new THREE.Mesh(glowSphereGeometry1, glowSphereMaterial1);
    centralSphere.add(glowSphere1);

    const glowSphereGeometry2 = new THREE.SphereGeometry(75, 48, 48);
    const glowSphereMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const glowSphere2 = new THREE.Mesh(glowSphereGeometry2, glowSphereMaterial2);
    centralSphere.add(glowSphere2);

    // ENHANCED NEBULA CLOUDS (Brighter, more visible, now as glowing cubes)
    const nebulaCubeMeshes: THREE.Mesh[] = [];

  // Enhanced zoom smoothness
  const zoomSpeed = window.innerWidth < 768 ? 0.09 : 0.05;

    // LIGHTING
  // Adjusted lighting for better color rendering
  const ambientLight = new THREE.AmbientLight(0xe5bc65, 0.45); // warm ambient
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xe5bc65, 0.8, 400); // warm point light
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

    // ANIMATION LOOP
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
  // Neutron star: rapid but slightly slower rotation (pulsar)
  centralSphere.rotation.x = time * 1.2;
  centralSphere.rotation.y = time * 1.6;
  centralSphere.rotation.z = time * 0.4;
  // Pulsar beam sweeps (simulate lighthouse effect, slower)
  pulsarBeam.material.opacity = 0.45 + 0.25 * Math.abs(Math.sin(time * 1.6));
      orbitingCubes.forEach((cube, i) => {
        const data = orbitData[i];
        data.angle += data.speed;
        cube.position.x = Math.cos(data.angle) * data.radius;
        cube.position.z = Math.sin(data.angle) * data.radius;
        cube.position.y = data.yOffset + Math.sin(data.angle * 2) * 10;
        cube.rotation.x = time * 0.5;
        cube.rotation.y = time * 0.7;
      });

      // Distance-based fading and scaling for star cubes
      const camPos = camera.position;
      for (const { mesh, baseSize, baseOpacity } of starMeshes) {
        // Distance from camera to star
        const dist = camPos.distanceTo(mesh.position);
        // Improved fading: starts at 700, fully faded at 6000
        let fade = 1.0;
        // Fine-tuned fade: starts at 900, never below 0.22 (never fully invisible)
        if (dist > 900) {
          fade = Math.max(0.22, 1.0 - (dist - 900) / 2900); // 900-3800 range
        }
        // Improved scaling: starts shrinking at 1200, min 0.22x at 4000+
        let scale = 1.0;
        if (dist > 1200) {
          scale = Math.max(0.22, 1.0 - (dist - 1200) / 2800);
        }
        // Ensure material is MeshBasicMaterial and not an array
        const mat = mesh.material as THREE.MeshBasicMaterial;
        if (mat && 'opacity' in mat) {
          mat.opacity = baseOpacity * fade;
        }
        mesh.scale.setScalar(scale);
      }

      if (!isInteracting) {
        if (autoRotate) {
          // Auto-rotate horizontally (Y axis, using persistent up)
          const qY = new THREE.Quaternion();
          qY.setFromAxisAngle(upRef.up, autoRotateSpeed);
          cameraQuatRef.quat.premultiply(qY);
          camera.quaternion.copy(cameraQuatRef.quat);
          upRef.up.copy(new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion).normalize());
          camera.up.copy(upRef.up);
          const distance = camera.position.length();
          camera.position.set(0, 0, 1).applyQuaternion(camera.quaternion).multiplyScalar(distance);
          camera.lookAt(0, 0, 0);
          // Always update persistent quaternion from camera after auto-rotate
          cameraQuatRef.quat.copy(camera.quaternion);
        } else if (Math.abs(rotationVelocity.x) > 0.001 || Math.abs(rotationVelocity.y) > 0.001) {
          // Inertia rotation (trackball style)
          const qY = new THREE.Quaternion();
          qY.setFromAxisAngle(upRef.up, -rotationVelocity.x);
          const camDir = new THREE.Vector3();
          camera.getWorldDirection(camDir);
          const right = new THREE.Vector3().crossVectors(upRef.up, camDir).normalize();
          const qX = new THREE.Quaternion();
          qX.setFromAxisAngle(right, -rotationVelocity.y);
          cameraQuatRef.quat.premultiply(qY).premultiply(qX);
          camera.quaternion.copy(cameraQuatRef.quat);
          upRef.up.copy(new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion).normalize());
          camera.up.copy(upRef.up);
          const distance = camera.position.length();
          camera.position.set(0, 0, 1).applyQuaternion(camera.quaternion).multiplyScalar(distance);
          camera.lookAt(0, 0, 0);
          rotationVelocity.x *= dampingFactor;
          rotationVelocity.y *= dampingFactor;
          // Always update persistent quaternion from camera after inertia
          cameraQuatRef.quat.copy(camera.quaternion);
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!mount) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.fov = window.innerWidth < 768 ? 85 : 75;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }, 100);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      mount.removeEventListener('mousedown', handleMouseDown);
      mount.removeEventListener('mousemove', handleMouseMove);
      mount.removeEventListener('mouseup', handleMouseUp);
      mount.removeEventListener('mouseleave', handleMouseUp);
      mount.removeEventListener('touchstart', handleTouchStart);
      mount.removeEventListener('touchmove', handleTouchMove);
      mount.removeEventListener('touchend', handleTouchEnd);
      mount.removeEventListener('wheel', handleWheel);
  centralSphereGeometry.dispose();
  centralSphereMaterial.dispose();
      orbitingCubes.forEach(cube => {
        cube.geometry.dispose();
        (cube.material as THREE.Material).dispose();
      });
  // (No starsGeometry/starMaterial to dispose for 3D star meshes)
  // No nebulaGeometry/nebulaMaterial to dispose (nebula is now cubes)
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-black touch-none select-none">
      <div ref={mountRef} className="w-full h-full" style={{ minHeight: '100vh' }} />
    </div>
  );
};

const HeroSection = () => {
  const handleScrollDown = () => {
    const nextSection = document.getElementById('robotics');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-full h-full min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      <CosmosVisualization />
      
      {/* Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/80 hover:text-white smooth-transition cursor-pointer group"
        aria-label="Scroll to next section"
      >
        <span className="text-sm font-medium hidden sm:block">Scroll to explore</span>
        <ChevronDown 
          className="w-8 h-8 animate-bounce" 
          strokeWidth={2}
        />
      </button>
    </section>
  );
};

export default HeroSection;