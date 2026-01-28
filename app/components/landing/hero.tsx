"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import heroImage from "../../../public/img/Gemini_Generated_Image_nnh4jfnnh4jfnnh4-removebg-preview.png";
import { Londrina_Outline } from 'next/font/google'

const londrina = Londrina_Outline({ subsets: ["latin"], weight: "400" });
const Hero = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/explore/${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleTagClick = (tag: string) => {
    router.push(`/explore/${encodeURIComponent(tag)}`);
  };

  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-[#ffffff] bg-[linear-gradient(to_right,#93939321_1px,transparent_1px),linear-gradient(to_bottom,#93939321_1px,transparent_1px)] bg-[length:1.5rem_1.5rem] px-6 py-12 lg:px-16'>
      <div className="mx-auto flex max-w-7xl flex-row items-center gap-12 lg:flex-row lg:gap-16">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          {/* Badge */}
          

          {/* Heading */}
          <h1 className={`text-6xl font-bold leading-tight text-gray-900 lg:text-7xl ${londrina.className}`}>
            Find the perfect{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              expert for any job
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-md text-lg text-gray-600">
            Connect with elite talent in minutes. From development to design, we
            have the experts to turn your ideas into reality.
          </p>

          {/* Search Bar */}
          <div className="flex max-w-xl items-center gap-2 rounded-full bg-white p-2 shadow-lg shadow-gray-200/50 ring-1 ring-gray-100">
            <div className="flex flex-1 items-center gap-3 px-4">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="What service are you looking for?"
                className="w-full bg-transparent py-2 text-gray-700 placeholder-gray-400 outline-none"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button 
              onClick={handleSearch}
              className="rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Search
            </button>
          </div>

          {/* Trending Tags */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-gray-500">Trending:</span>
            <span 
              onClick={() => handleTagClick("Web Design")}
              className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 cursor-pointer"
            >
              Web Design
            </span>
            <span 
              onClick={() => handleTagClick("WordPress")}
              className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 cursor-pointer"
            >
              WordPress
            </span>
            <span 
              onClick={() => handleTagClick("AI Services")}
              className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 cursor-pointer"
            >
              AI Services
            </span>
          </div>
        </div>

        {/* Right Content - Image Grid */}
        <div className=" hidden mlg:block">
            <Image className="scale-x-[-1] brightness-110 mt-2" src={heroImage} width={450}
      height={450}
      alt="Picture of the author"/>
        </div>
      </div>
       

    </div>
  );
};

export default Hero;