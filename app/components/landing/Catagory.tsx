"use client";

import React from "react";
import {
  Palette,
  Megaphone,
  Languages,
  Video,
  Bot,
  Code,
  Music,
  Camera,
  PenTool,
  BarChart3,
} from "lucide-react";

const categories = [
  {
    name: "Design",
    subtitle: "Logo, UI/UX, Art",
    icon: Palette,
    bgColor: "bg-emerald-100",
    iconColor: "text-emerald-500",
    borderColor: "border-emerald-300",
  },
  {
    name: "Marketing",
    subtitle: "SEO, Social, Ads",
    icon: Megaphone,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-500",
    borderColor: "border-purple-300",
  },
  {
    name: "Writing",
    subtitle: "Copy, Content",
    icon: Languages,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-500",
    borderColor: "border-orange-300",
  },
  {
    name: "Video",
    subtitle: "Editing, Animation",
    icon: Video,
    bgColor: "bg-pink-100",
    iconColor: "text-pink-500",
    borderColor: "border-pink-300",
  },
  {
    name: "AI Services",
    subtitle: "Prompt Engineering",
    icon: Bot,
    bgColor: "bg-cyan-100",
    iconColor: "text-cyan-500",
    borderColor: "border-cyan-300",
  },
  {
    name: "Development",
    subtitle: "Web, Mobile, Apps",
    icon: Code,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-500",
    borderColor: "border-blue-300",
  },
  {
    name: "Music",
    subtitle: "Production, Mixing",
    icon: Music,
    bgColor: "bg-red-100",
    iconColor: "text-red-500",
    borderColor: "border-red-300",
  },
  {
    name: "Photography",
    subtitle: "Editing, Retouching",
    icon: Camera,
    bgColor: "bg-amber-100",
    iconColor: "text-amber-500",
    borderColor: "border-amber-300",
  },
  {
    name: "Illustration",
    subtitle: "Digital, Traditional",
    icon: PenTool,
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-500",
    borderColor: "border-indigo-300",
  },
  {
    name: "Analytics",
    subtitle: "Data, Insights",
    icon: BarChart3,
    bgColor: "bg-teal-100",
    iconColor: "text-teal-500",
    borderColor: "border-teal-300",
  },
];

const CategoryCard = ({
  name,
  subtitle,
  icon: Icon,
  bgColor,
  iconColor,
  borderColor,
}: {
  name: string;
  subtitle: string;
  icon: React.ElementType;
  bgColor: string;
  iconColor: string;
  borderColor: string;
}) => (
  <div 
    className="category-card mx-2 w-32 flex-shrink-0 cursor-pointer rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 md:mx-3 md:w-48 md:rounded-2xl md:p-8"
    style={{ "--hover-border-color": `var(--color-${borderColor.replace("border-", "").replace("-300", "-400")})` } as React.CSSProperties}
    data-border={borderColor}
  >
    <div className="flex flex-col items-center">
      <div className={`icon-container mb-2 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 md:mb-4 md:h-16 md:w-16 md:rounded-2xl ${bgColor}`}>
        <Icon className={`h-5 w-5 transition-all duration-300 md:h-8 md:w-8 ${iconColor}`} />
      </div>
      <h3 className="text-sm font-semibold text-gray-900 transition-all duration-300 md:text-lg">{name}</h3>
      <p className="mt-0.5 text-xs text-gray-500 transition-all duration-300 md:mt-1 md:text-sm">{subtitle}</p>
    </div>
  </div>
);

const Catagory = () => {
  // Duplicate categories for seamless infinite scroll
  const duplicatedCategories = [...categories, ...categories];

  return (
    <section className="overflow-hidden bg-white border-t border-gray-100 lg:h-screen py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Popular Categories</h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-500">
          Browse our top categories to find the perfect expert for your next
          project. Swipe to explore.
        </p>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="pointer-events-none hidden lg:block absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent"></div>
        <div className="pointer-events-none hidden lg:block absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent"></div>

        {/* Scrolling Track */}
        <div className="flex animate-scroll">
          {duplicatedCategories.map((category, index) => (
            <CategoryCard
              key={`${category.name}-${index}`}
              name={category.name}
              subtitle={category.subtitle}
              icon={category.icon}
              bgColor={category.bgColor}
              iconColor={category.iconColor}
              borderColor={category.borderColor}
            />
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        /* When hovering the scroll container, scale down and grayscale all cards */
        .animate-scroll:hover :global(.category-card) {
          transform: scale(0.95);
          filter: grayscale(100%);
          opacity: 0.6;
        }
        
        /* The hovered card scales up and stays colorful with colored border */
        .animate-scroll:hover :global(.category-card:hover) {
          transform: scale(1.08);
          filter: grayscale(0%);
          opacity: 1;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }
        
        /* Colored borders on hover */
        .animate-scroll:hover :global(.category-card[data-border="border-emerald-300"]:hover) {
          border-color: #6ee7b7;
        }
        .animate-scroll:hover :global(.category-card[data-border="border-purple-300"]:hover) {
          border-color: #c4b5fd;
        }
        .animate-scroll:hover :global(.category-card[data-border="border-orange-300"]:hover) {
          border-color: #fdba74;
        }
        .animate-scroll:hover :global(.category-card[data-border="border-pink-300"]:hover) {
          border-color: #f9a8d4;
        }
        .animate-scroll:hover :global(.category-card[data-border="border-cyan-300"]:hover) {
          border-color: #67e8f9;
        }
        .animate-scroll:hover :global(.category-card[data-border="border-blue-300"]:hover) {
          border-color: #93c5fd;
        }
        .animate-scroll:hover :global(.category-card[data-border="border-red-300"]:hover) {
          border-color: #fca5a5;
        }
        .animate-scroll:hover :global(.category-card[data-border="border-amber-300"]:hover) {
          border-color: #fcd34d;
        }
        .animate-scroll:hover :global(.category-card[data-border="border-indigo-300"]:hover) {
          border-color: #a5b4fc;
        }
        .animate-scroll:hover :global(.category-card[data-border="border-teal-300"]:hover) {
          border-color: #5eead4;
        }
        
        /* Faster animation on mobile */
        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 15s;
          }
        }
      `}</style>
    </section>
  );
};

export default Catagory;