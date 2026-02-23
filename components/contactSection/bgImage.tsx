import { getRandRgb } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

type BgImageProps = {
  total: number;
  item: {
    id: number;
    imgLink: string;
    title: string;
    subtitle: string;
  };
  i: number;
};

export function BgImage({ total, item, i }: BgImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      style={{
        filter: `brightness(${isHovered ? "120%" : "85%"})`,
        zIndex: `${
          Math.floor(total / 2) == i ? 520 : Math.floor(Math.random() * 10)
        }`,
        transform: `scale(${isHovered ? 1.2 : 1})`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      className="bgImages drop-shadow-smd absolute h-[150px] w-[150px] origin-[center_center] translate-x-[-50%] translate-y-[0%] overflow-hidden rounded-3xl md:h-[250px] md:w-[250px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={item.imgLink}
        fill={true}
        alt=""
        className="h-full !w-auto min-w-full max-w-none object-cover"
        style={{
          transform: `rotate(${isHovered ? '5deg' : '0deg'})`,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </div>
  );
}
