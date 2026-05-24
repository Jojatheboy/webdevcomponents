"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const refs = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.OrthographicCamera | null;
    mesh: THREE.Mesh | null;
    uniforms: Record<string, { value: number | number[] }> | null;
    animationId: number;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    mesh: null,
    uniforms: null,
    animationId: 0,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const r = refs.current;

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

        float d = length(p) * 0.04;

        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.02 / abs(p.y + sin((rx + time) * 0.8) * 0.35);
        float g = 0.04 / abs(p.y + sin((gx + time) * 0.8) * 0.35);
        float b = 0.03 / abs(p.y + sin((bx + time) * 0.8) * 0.35);

        // Subtle green tint matching accent
        gl_FragColor = vec4(r * 0.3, g * 0.8, b * 0.6, 1.0);
      }
    `;

    r.scene = new THREE.Scene();
    r.renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    r.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    r.renderer.setClearColor(0x000000, 0);
    r.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);

    r.uniforms = {
      resolution: { value: [canvas.clientWidth, canvas.clientHeight] },
      time: { value: 0.0 },
    };

    const positions = new THREE.BufferAttribute(
      new Float32Array([
        -1, -1, 0, 1, -1, 0, -1, 1, 0,
        1, -1, 0, -1, 1, 0, 1, 1, 0,
      ]),
      3
    );
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", positions);

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: r.uniforms,
      side: THREE.DoubleSide,
      transparent: true,
    });

    r.mesh = new THREE.Mesh(geometry, material);
    r.scene.add(r.mesh);

    const resize = () => {
      if (!r.renderer || !r.uniforms || !canvasRef.current) return;
      const parent = canvasRef.current.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      r.renderer.setSize(w, h, false);
      r.uniforms.resolution.value = [w, h];
    };

    const animate = () => {
      if (r.uniforms) (r.uniforms.time.value as number) += 0.006;
      if (r.renderer && r.scene && r.camera) {
        r.renderer.render(r.scene, r.camera);
      }
      r.animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(r.animationId);
      window.removeEventListener("resize", resize);
      if (r.mesh) {
        r.scene?.remove(r.mesh);
        r.mesh.geometry.dispose();
        if (r.mesh.material instanceof THREE.Material) {
          r.mesh.material.dispose();
        }
      }
      r.renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.15 }}
    />
  );
}
