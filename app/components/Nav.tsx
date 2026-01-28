"use client";

import { Waypoints, User, LogOut, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignIn = () => {
    navigate.push("/login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDropdownOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 lg:px-16 ${scrolled
          ? "border-b border-[#ffffff5d] bg-white/30 shadow-sm backdrop-blur-sm"
          : "bg-transparent"
        }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
          <div className="rotate-40">

            <Waypoints />
          </div>
        </div>
        <Link href="/" className="text-xl font-bold text-gray-900">SKILLDAO</Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-900 transition-colors hover:bg-gray-100 lg:hidden"
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop Navigation Links - Centered */}
      <div className="hidden items-center gap-8 lg:flex">
        <Link
          href="/explore"
          className="text-sm font-medium text-gray-900 transition-colors hover:text-blue-600"
        >
          Explore
        </Link>
        <Link
          href="/about"
          className="text-sm font-medium text-gray-900 transition-colors hover:text-blue-600"
        >
          About Us
        </Link>
        <Link
          href="/governance"
          className="text-sm font-medium text-gray-900 transition-colors hover:text-blue-600"
        >
          Governance
        </Link>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-gray-900 transition-colors hover:text-blue-600"
        >
          My Dashboard
        </Link>
      </div>

      {/* Auth Section */}
      <div className="hidden items-center lg:flex">
        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-full bg-gray-100 py-1.5 pl-1.5 pr-3 transition-colors hover:bg-gray-200"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                U
              </div>
              <span className="text-sm font-medium text-gray-700">User</span>
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white py-2 shadow-lg ring-1 ring-gray-100">
                <Link
                  href="/edit-profile"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <User className="h-4 w-4" />
                  edit-profile
                </Link>
                <hr className="my-1 border-gray-100" />
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-gray-100 bg-white/95 p-6 shadow-lg backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/explore"
              className="text-base font-medium text-gray-900 transition-colors hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/about"
              className="text-base font-medium text-gray-900 transition-colors hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/governance"
              className="text-base font-medium text-gray-900 transition-colors hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Governance
            </Link>
            <Link
              href="/dashboard"
              className="text-base font-medium text-gray-900 transition-colors hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Dashboard
            </Link>

            <hr className="border-gray-200" />

            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 text-base font-medium text-gray-900 transition-colors hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-base font-medium text-red-600 transition-colors hover:text-red-700"
                >
                  <LogOut className="h-5 w-5" />
                  Log Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  handleSignIn();
                  setMobileMenuOpen(false);
                }}
                className="w-full rounded-full bg-gray-900 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-gray-800"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;