import React, { useEffect, useRef } from 'react';

export const ParticleBackground = ({ className, children }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        class NeuralNode {
            constructor() {
                this.reset();
                this.radius = Math.random() * 2 + 1;
                this.connections = [];
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.energyLevel = Math.random();
                this.maxConnections = 3;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = (Math.random() - 0.5) * 0.2;
                this.alpha = Math.random() * 0.5 + 0.2;
            }

            update(time, nodes) {
                // Smooth movement
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges with damping
                if (this.x < 0 || this.x > canvas.width) this.vx *= -0.8;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -0.8;

                // Energy pulse effect
                this.energyLevel = 0.3 + Math.sin(time * this.pulseSpeed) * 0.7;

                // Find nearby nodes
                this.connections = nodes
                    .filter(n => n !== this && this.distanceTo(n) < 150)
                    .slice(0, this.maxConnections);
            }

            distanceTo(node) {
                const dx = this.x - node.x;
                const dy = this.y - node.y;
                return Math.sqrt(dx * dx + dy * dy);
            }

            draw() {
                // Draw neural connections
                this.connections.forEach(node => {
                    const distance = this.distanceTo(node);
                    const strength = (1 - distance / 150) * this.energyLevel * node.energyLevel;
                    
                    // Energy flow effect
                    const gradient = ctx.createLinearGradient(this.x, this.y, node.x, node.y);
                    gradient.addColorStop(0, `rgba(100, 200, 255, ${strength * 0.5})`);
                    gradient.addColorStop(1, `rgba(100, 100, 255, ${strength * 0.5})`);
                    
                    ctx.beginPath();
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = strength * 2;
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(node.x, node.y);
                    ctx.stroke();
                });

                // Draw node
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.radius * 4
                );
                gradient.addColorStop(0, `rgba(150, 220, 255, ${this.alpha * this.energyLevel})`);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.beginPath();
                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const nodes = [];
        const numNodes = 50;

        const initNodes = () => {
            nodes.length = 0;
            for (let i = 0; i < numNodes; i++) {
                nodes.push(new NeuralNode());
            }
        };

        const animate = (timestamp) => {
            const time = timestamp * 0.001;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = 'lighter';
            nodes.forEach(node => {
                node.update(time, nodes);
                node.draw();
            });
            ctx.globalCompositeOperation = 'source-over';

            animationFrameId = requestAnimationFrame(animate);
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initNodes();
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        animate(0);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div className="relative flex h-[100vh] flex-col items-center justify-center">
            <canvas
                ref={canvasRef}
                className={`absolute inset-0 ${className}`}
                style={{
                    background: 'linear-gradient(135deg, #000000 0%, #001428 100%)',
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
};