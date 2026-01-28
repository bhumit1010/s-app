import React from "react";

const getInitial = (name = "") => {
  return name.trim().charAt(0).toUpperCase();
};

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-indigo-500",
];

const getColorFromName = (name = "") => {
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const Avatar = ({
  name = "User",
  imageUrl = "",
  size = "h-12 w-12", // you can pass h-8 w-8, h-16 w-16 etc.
  textSize = "text-lg",
}) => {
  const initial = getInitial(name);
  const bgColor = getColorFromName(name);

  return (
    <div
      className={`relative flex items-center justify-center rounded-full overflow-hidden ${size}`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className={`h-full w-full flex items-center justify-center text-white font-semibold ${bgColor} ${textSize}`}
        >
          {initial}
        </div>
      )}
    </div>
  );
};

export default Avatar;
