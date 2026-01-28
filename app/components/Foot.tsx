"use client";

import React from "react";
import { Globe, Mail } from "lucide-react";

const Foot = () => {
  return (
    <footer>
      

      

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-lg font-bold text-gray-900">@SkillDAO</span>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 transition-colors hover:text-gray-700">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 transition-colors hover:text-gray-700">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Foot;