import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const ParticleField = ({ isDark }) => {
    const ref = useRef();
    // Pre-calculate 6000 particles creating a luxurious deep space volume
    const sphere = useMemo(() => random.inSphere(new Float32Array(6000), { radius: 1.5 }), []);
    
    useFrame((state, delta) => {
        if (ref.current) {
            // Uninterrupted, majestic orbital tracking (like professional cinematic space footage)
            ref.current.rotation.x -= delta / 25; 
            ref.current.rotation.y -= delta / 35;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    // Dark theme: Glowing Cyan. Light theme: Premium Soft Azure Blue
                    color={isDark ? "#00F0FF" : "#0284C7"} 
                    size={isDark ? 0.004 : 0.005} // Slightly thicker in light mode for visibility
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={isDark ? 0.9 : 0.6}
                />
            </Points>
        </group>
    );
};

const CursorTrail = () => {
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains('dark')
    );

    // Watch for the Tailwind class change on the HTML element for Light/Dark mode transitions
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                setIsDark(document.documentElement.classList.contains('dark'));
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    // bg-slate-50 creates a super clean, premium bright portfolio feel. 
    // dark:bg-[#0A192F] is the stunningly deep Navy
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-1000 bg-slate-50 dark:bg-[#0A192F]">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ParticleField isDark={isDark} />
            </Canvas>
        </div>
    );
};

export default CursorTrail;
