import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Shield, Eye, Target, Sparkles } from "lucide-react";

export default function Cctv3DModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isTracking, setIsTracking] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Setup Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.05);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    // 2. Setup WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    
    // Apply styling to the canvas element
    renderer.domElement.className = "w-full h-full object-cover transition-all duration-700 hover:scale-[1.01] filter drop-shadow-[0_0_30px_rgba(239,68,68,0.2)] cursor-crosshair rounded-3xl";
    
    container.appendChild(renderer.domElement);

    // 3. Create Camera 3D Mesh Group
    const cctvGroup = new THREE.Group();
    scene.add(cctvGroup);

    // Parent group for overall rotation & positioning
    cctvGroup.position.set(0, 0.5, 0);

    // A. Wall Bracket Mount (Metallic base)
    const bracketGeo = new THREE.CylinderGeometry(0.8, 1, 0.3, 32);
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.2,
    });
    const bracket = new THREE.Mesh(bracketGeo, metalMaterial);
    bracket.rotation.x = Math.PI / 2;
    bracket.position.set(0, 0, -1.8);
    cctvGroup.add(bracket);

    // B. Support Arm (connects bracket to camera)
    const armGeo = new THREE.CylinderGeometry(0.18, 0.18, 1.2, 16);
    const arm = new THREE.Mesh(armGeo, metalMaterial);
    arm.rotation.x = Math.PI / 3;
    arm.position.set(0, 0.6, -1.2);
    cctvGroup.add(arm);

    // C. Outer Housing Case (Upper dome mount)
    const housingGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.8, 32);
    const whitePlasticMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // Dark blue-black sleek shell
      metalness: 0.5,
      roughness: 0.4,
    });
    const housing = new THREE.Mesh(housingGeo, whitePlasticMat);
    housing.position.set(0, 0.9, -0.6);
    housing.rotation.x = Math.PI / 6;
    cctvGroup.add(housing);

    // D. The Pivot / Rotating Head Group (This tracks the cursor)
    const pivotGroup = new THREE.Group();
    pivotGroup.position.set(0, 0.5, -0.4);
    cctvGroup.add(pivotGroup);

    // Black Shiny Camera Body Sphere (inside pivot group)
    const bodyGeo = new THREE.SphereGeometry(1.1, 32, 32);
    const darkGlassMat = new THREE.MeshStandardMaterial({
      color: 0x050b14,
      roughness: 0.05,
      metalness: 0.9,
    });
    const cameraBody = new THREE.Mesh(bodyGeo, darkGlassMat);
    pivotGroup.add(cameraBody);

    // E. Camera Lens Collar / Bezel (protrudes forward)
    const lensCollarGeo = new THREE.CylinderGeometry(0.45, 0.5, 0.4, 32);
    const lensCollar = new THREE.Mesh(lensCollarGeo, metalMaterial);
    lensCollar.rotation.x = Math.PI / 2;
    lensCollar.position.set(0, 0, 1);
    pivotGroup.add(lensCollar);

    // F. Glowing Neon Red Lens Ring (Emissive Accent)
    const glowRingGeo = new THREE.TorusGeometry(0.38, 0.04, 8, 32);
    const glowMaterial = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xef4444,
      emissiveIntensity: 1.8,
    });
    const glowRing = new THREE.Mesh(glowRingGeo, glowMaterial);
    glowRing.position.set(0, 0, 1.21);
    pivotGroup.add(glowRing);

    // G. Actual Camera Lens Glass (In center of collar)
    const lensGlassGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 32);
    const lensGlassMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      roughness: 0.0,
      metalness: 1.0,
    });
    const lensGlass = new THREE.Mesh(lensGlassGeo, lensGlassMat);
    lensGlass.rotation.x = Math.PI / 2;
    lensGlass.position.set(0, 0, 1.2);
    pivotGroup.add(lensGlass);

    // H. Blinking Red Recording LED Indicator
    const ledGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(-0.25, 0.25, 1.05);
    pivotGroup.add(led);

    // I. Holographic Scanning Cone / Spotlight (Semireflective translucent)
    const coneGeo = new THREE.ConeGeometry(1.6, 6, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const scanningCone = new THREE.Mesh(coneGeo, coneMat);
    scanningCone.rotation.x = Math.PI / 2;
    scanningCone.position.set(0, 0, 4.2); // Protrude forward
    pivotGroup.add(scanningCone);

    // J. Add target ring/wireframe at the end of the cone
    const targetRingGeo = new THREE.RingGeometry(1.5, 1.55, 32);
    const targetRingMat = new THREE.MeshBasicMaterial({
      color: 0xfca5a5,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const targetRing = new THREE.Mesh(targetRingGeo, targetRingMat);
    targetRing.position.set(0, -3, 0); // At the tip of the cone
    targetRing.rotation.x = Math.PI / 2;
    scanningCone.add(targetRing);

    // 4. Particle Background Star Dust
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12; // x
      positions[i + 1] = (Math.random() - 0.5) * 8; // y
      positions[i + 2] = (Math.random() - 0.5) * 8 - 1; // z
      scales[i / 3] = Math.random() * 0.08 + 0.01;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfca5a5,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);

    const redSpotlight = new THREE.PointLight(0xef4444, 3, 10);
    redSpotlight.position.set(0, 1.5, 2);
    scene.add(redSpotlight);

    // 6. Interactive Cursor Tracking State
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize coordinates
      const rect = container.getBoundingClientRect();
      const relativeX = event.clientX - rect.left;
      const relativeY = event.clientY - rect.top;

      mouse.targetX = ((relativeX / rect.width) * 2 - 1) * 0.7; // Dampened range
      mouse.targetY = -((relativeY / rect.height) * 2 - 1) * 0.6;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 7. Scroll-Triggered Parallax Animation State
    let lastScrollY = window.scrollY;
    let scrollRotation = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const diff = currentScroll - lastScrollY;
      scrollRotation += diff * 0.001;
      lastScrollY = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    // 8. Animation Loop
    let clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse tracking (LERP)
      if (isTracking) {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      } else {
        // Idle scanning pattern when not actively tracking cursor
        mouse.x = Math.sin(elapsedTime * 0.5) * 0.4;
        mouse.y = Math.cos(elapsedTime * 0.3) * 0.2;
      }

      // Rotate pivot head to track cursor coordinates
      pivotGroup.rotation.y = mouse.x;
      pivotGroup.rotation.x = -mouse.y + Math.PI / 6; // base tilt offset

      // Flashing LED (0.5 second interval)
      const ledPower = Math.floor(elapsedTime * 2.5) % 2;
      ledMat.color.setHex(ledPower === 1 ? 0xef4444 : 0x1e293b);

      // Pulse Scanning Cone intensity
      coneMat.opacity = 0.08 + Math.sin(elapsedTime * 4) * 0.04;
      targetRingMat.opacity = 0.2 + Math.sin(elapsedTime * 5) * 0.1;

      // Rotate whole group based on scroll position
      cctvGroup.rotation.y = scrollRotation + Math.sin(elapsedTime * 0.15) * 0.1;

      // Slowly float particles
      const positionsArr = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positionsArr.length; i += 3) {
        positionsArr[i] += Math.sin(elapsedTime + i) * 0.002; // move y up/down slightly
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    });
    resizeObserver.observe(container);

    // 10. Complete Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      cancelAnimationFrame(reqId);

      // Dispose Three.js objects
      scene.remove(cctvGroup);
      scene.remove(particles);

      // Recursive disposal
      const disposeNode = (node: any) => {
        if (node.geometry) node.geometry.dispose();
        if (node.material) {
          if (Array.isArray(node.material)) {
            node.material.forEach((mat) => mat.dispose());
          } else {
            node.material.dispose();
          }
        }
      };

      cctvGroup.traverse(disposeNode);
      particles.geometry.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isClient, isTracking]);

  return (
    <div className="relative w-full h-[380px] md:h-[450px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950/20 via-red-950/10 to-slate-950/20 rounded-3xl border border-red-500/10 backdrop-blur-md shadow-2xl shadow-red-500/5">
      {/* Dynamic scanline overlay */}
      <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-10"></div>

      {/* Cyberpunk decorative corner brackets */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-red-500/40 rounded-tl-sm pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-red-500/40 rounded-tr-sm pointer-events-none"></div>
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-red-500/40 rounded-bl-sm pointer-events-none"></div>
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-red-500/40 rounded-br-sm pointer-events-none"></div>

      {/* Interactive controls panel */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/80 border border-red-500/20 px-3 py-1.5 rounded-full text-xs font-mono text-red-400 backdrop-blur-md shadow-lg pointer-events-auto z-10">
        <button
          onClick={() => setIsTracking(!isTracking)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-300 ${
            isTracking
              ? "bg-red-600/20 text-red-300 border border-red-500/30"
              : "hover:bg-slate-800 text-slate-400"
          }`}
        >
          {isTracking ? (
            <>
              <Eye className="w-3.5 h-3.5 animate-pulse" />
              <span>Cursor Tracking Active</span>
            </>
          ) : (
            <>
              <Target className="w-3.5 h-3.5" />
              <span>Autoscan Active</span>
            </>
          )}
        </button>
      </div>

      {/* Overlay status text */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-red-400/60 leading-relaxed pointer-events-none flex flex-col gap-1 select-none hidden sm:flex">
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-red-500" />
          <span>SYS.STATUS: ARMED</span>
        </span>
        <span className="flex items-center gap-1">
          <Target className="w-3 h-3 text-red-500 animate-pulse" />
          <span>CAM_MCR_01 // 4K IP UHD</span>
        </span>
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-yellow-500" />
          <span>LASER_GRID: ACTIVE</span>
        </span>
      </div>

      {/* Three.js canvas container */}
      <div ref={containerRef} className="w-full h-full cursor-crosshair" />
    </div>
  );
}
