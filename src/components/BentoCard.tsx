import React, { ReactNode, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);
type BentoCardProps = {
  src: string;
  title: ReactNode;
  description: string;
  isComingSoon?: boolean;
};

type BentoTiltProps = { className?: string } & React.PropsWithChildren;

export const BentoTilt = ({ children, className }: BentoTiltProps) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement | null>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeX - 0.5) * 50;
    const tiltY = (relativeY - 0.5) * -50;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  //   useEffect(() => {
  //     if (!itemRef.current) return;
  //     gsap.fromTo(
  //       itemRef.current,
  //       {
  //         y: 50, // Start slightly below
  //         scale: 0.95, // Start smaller to simulate depth
  //         opacity: 0, // Start invisible
  //         zIndex: -1, // Appear beneath other cards initially
  //       },
  //       {
  //         y: 0, // Move to its original position
  //         scale: 1, // Scale to normal size
  //         opacity: 1, // Fade in
  //         zIndex: 1, // Bring to the top
  //         duration: 0.8,
  //         ease: "power3.out", // Smooth easing
  //         scrollTrigger: {
  //           trigger: itemRef.current,
  //           start: "top 30%", // Trigger animation when the card's top is 80% into the viewport
  //           end: "top 40%", // Complete animation when the card is near the center
  //           scrub: true, // Smooth animation with scrolling
  //         },
  //       }
  //     );

  //     return () => {
  //       ScrollTrigger.refresh();
  //     };
  //   }, []);

  return (
    <div
      className={`${className}`}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ description, src, title }: BentoCardProps) => {
  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="z-10 relative flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
      {title}
    </div>
  );
};

export default BentoCard;
