import React from "react";

export const FocusCard = ({ className, children }) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        setOpacity(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setOpacity(0);
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};