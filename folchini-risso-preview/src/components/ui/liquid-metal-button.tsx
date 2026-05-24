"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

interface LiquidMetalButtonProps {
  label?: string;
  href?: string;
  target?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function LiquidMetalButton({
  label = "Get Started",
  href,
  target,
  icon,
  onClick,
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shaderMount = useRef<any>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  const dimensions = useMemo(() => {
    const textLen = label.length;
    const w = Math.max(160, textLen * 9 + (icon ? 60 : 48));
    return {
      width: w,
      height: 48,
      innerWidth: w - 4,
      innerHeight: 44,
      shaderWidth: w,
      shaderHeight: 48,
    };
  }, [label, icon]);

  useEffect(() => {
    const styleId = "shader-canvas-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-btn-container canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes ripple-anim {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    const loadShader = async () => {
      try {
        if (shaderRef.current) {
          if (shaderMount.current?.destroy) shaderMount.current.destroy();
          shaderMount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_repetition: 4,
              u_softness: 0.5,
              u_shiftRed: 0.3,
              u_shiftBlue: 0.3,
              u_distortion: 0,
              u_contour: 0,
              u_angle: 45,
              u_scale: 8,
              u_shape: 1,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.6
          );
        }
      } catch (error) {
        console.error("Shader load error:", error);
      }
    };

    loadShader();
    return () => {
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.6);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(2.4);
      setTimeout(() => {
        shaderMount.current?.setSpeed?.(isHovered ? 1 : 0.6);
      }, 300);
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const ripple = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        id: rippleId.current++,
      };
      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    }

    if (href) {
      window.open(href, target || "_self");
    }
    onClick?.();
  };

  return (
    <div className="relative inline-block">
      <div style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}>
        <div
          style={{
            position: "relative",
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            transformStyle: "preserve-3d",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Label layer */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transform: "translateZ(20px)",
              zIndex: 30,
              pointerEvents: "none",
            }}
          >
            {icon && (
              <span style={{ color: "#888", filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.5))" }}>
                {icon}
              </span>
            )}
            <span
              style={{
                fontSize: "13px",
                color: "#777",
                fontWeight: 500,
                fontFamily: "var(--font-inter)",
                textShadow: "0px 1px 2px rgba(0,0,0,0.5)",
                letterSpacing: "0.03em",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
          </div>

          {/* Inner dark bg */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translateZ(10px) ${isPressed ? "translateY(1px) scale(0.98)" : "scale(1)"}`,
              zIndex: 20,
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease",
            }}
          >
            <div
              style={{
                width: `${dimensions.innerWidth}px`,
                height: `${dimensions.innerHeight}px`,
                margin: "2px",
                borderRadius: "100px",
                background: "linear-gradient(180deg, #1a1a1a 0%, #000 100%)",
                boxShadow: isPressed
                  ? "inset 0px 2px 4px rgba(0,0,0,0.4)"
                  : "none",
                transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease",
              }}
            />
          </div>

          {/* Shader layer */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translateZ(0px) ${isPressed ? "translateY(1px) scale(0.98)" : "scale(1)"}`,
              zIndex: 10,
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease",
            }}
          >
            <div
              style={{
                height: `${dimensions.height}px`,
                width: `${dimensions.width}px`,
                borderRadius: "100px",
                boxShadow: isPressed
                  ? "0px 0px 0px 1px rgba(0,0,0,0.5), 0px 1px 2px rgba(0,0,0,0.3)"
                  : isHovered
                    ? "0px 0px 0px 1px rgba(0,0,0,0.4), 0px 8px 5px rgba(0,0,0,0.1), 0px 4px 4px rgba(0,0,0,0.15)"
                    : "0px 0px 0px 1px rgba(0,0,0,0.3), 0px 20px 12px rgba(0,0,0,0.08), 0px 9px 9px rgba(0,0,0,0.12)",
                transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease",
              }}
            >
              <div
                ref={shaderRef}
                className="shader-btn-container"
                style={{
                  borderRadius: "100px",
                  overflow: "hidden",
                  position: "relative",
                  width: `${dimensions.shaderWidth}px`,
                  height: `${dimensions.shaderHeight}px`,
                }}
              />
            </div>
          </div>

          {/* Click target */}
          <button
            ref={buttonRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              outline: "none",
              zIndex: 40,
              transform: "translateZ(25px)",
              overflow: "hidden",
              borderRadius: "100px",
            }}
            aria-label={label}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                style={{
                  position: "absolute",
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
                  pointerEvents: "none",
                  animation: "ripple-anim 0.6s ease-out",
                }}
              />
            ))}
          </button>
        </div>
      </div>
    </div>
  );
}
