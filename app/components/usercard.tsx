"use client";

import React from "react";
import Link from "next/link";

interface UserCardProps {
  id: number;
  name: string;
  title: string;
  avatar: string;
  profileImage?: string;
  rating: number;
  skills: string[];
  isAvailable?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  title,
  avatar,
  profileImage,
  rating,
  skills,
  isAvailable = true,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-xl">
      {/* Gradient Background Header */}
      <div
        className="relative h-32 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 opacity-80"
        style={{
          filter: "blur(0px)",
        }}
      >
        {/* Blurred overlay effect */}
        <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>
      </div>

      {/* Available Badge */}
      {isAvailable && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-md">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          Available
        </div>
      )}

      {/* Profile Picture - Circular, positioned to overlap header */}
      <div className="absolute left-1/2 top-16 -translate-x-1/2">
        <div className="h-24 w-24 rounded-full border-4 border-white bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg flex items-center justify-center overflow-hidden">
          {profileImage ? (
            <img
              src={profileImage}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-white">{avatar}</span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="px-6 pb-6 pt-16">
        {/* Name, Title & Rating */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 text-center pr-8">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">{title}</p>
          </div>

          {/* Rating Badge */}
          <div className="absolute right-6 top-[calc(8rem+1rem)]">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 text-purple-700 font-bold text-sm">
              {rating.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* View Profile Only */}
        <div className="flex items-center justify-center pt-4 border-t border-gray-100">
          <Link
            href={`/profile/${id}`}
            className="text-sm font-semibold text-gray-700 underline underline-offset-2 hover:text-purple-600 transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
