"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleField({ density = 60 }: { density?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const count = density;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#22d3ee"),
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#d946ef"),
      new THREE.Color("#3b82f6"),
      new THREE.Color("#fbbf24"),
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 32;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 24;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.13,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geom, mat);
    scene.add(points);

    // connecting lines geometry (will update dynamically)
    const maxDist = 3.2;
    const maxLinks = 220;
    const linePositions = new Float32Array(maxLinks * 6);
    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(lines);

    // torus knot wireframe
    const torusGeom = new THREE.TorusKnotGeometry(3.4, 0.9, 120, 18);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const torus = new THREE.Mesh(torusGeom, torusMat);
    torus.position.set(8, -3, -2);
    scene.add(torus);

    // icosahedron
    const icoGeom = new THREE.IcosahedronGeometry(2.2, 0);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const ico = new THREE.Mesh(icoGeom, icoMat);
    ico.position.set(-9, 3, -4);
    scene.add(ico);

    let raf = 0;
    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.04 + mouse.x * 0.2;
      points.rotation.x = t * 0.02 + mouse.y * 0.1;

      torus.rotation.x = t * 0.3;
      torus.rotation.y = t * 0.25;
      ico.rotation.x = -t * 0.25;
      ico.rotation.z = t * 0.2;

      camera.position.x += (mouse.x * 2.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 1.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // draw lines between nearby particles
      const pos = geom.attributes.position.array as Float32Array;
      let link = 0;
      for (let i = 0; i < count && link < maxLinks; i++) {
        const x1 = pos[i * 3];
        const y1 = pos[i * 3 + 1];
        const z1 = pos[i * 3 + 2];
        for (let j = i + 1; j < count && link < maxLinks; j++) {
          const x2 = pos[j * 3];
          const y2 = pos[j * 3 + 1];
          const z2 = pos[j * 3 + 2];
          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < maxDist * maxDist) {
            const alpha = 1 - d2 / (maxDist * maxDist);
            linePositions[link * 6] = x1;
            linePositions[link * 6 + 1] = y1;
            linePositions[link * 6 + 2] = z1;
            linePositions[link * 6 + 3] = x2;
            linePositions[link * 6 + 4] = y2;
            linePositions[link * 6 + 5] = z2;
            link++;
            lineMat.opacity = 0.08 + alpha * 0.18;
          }
        }
      }
      lineGeom.setDrawRange(0, link * 2);
      lineGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geom.dispose();
      mat.dispose();
      lineGeom.dispose();
      lineMat.dispose();
      torusGeom.dispose();
      torusMat.dispose();
      icoGeom.dispose();
      icoMat.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, [density]);

  return <div ref={mountRef} className="absolute inset-0 -z-[5] pointer-events-none" aria-hidden="true" />;
}
