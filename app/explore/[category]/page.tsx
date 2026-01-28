"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, SlidersHorizontal, Grid, List, Star, MapPin, Clock, ChevronDown, Briefcase, DollarSign, Calendar, Users } from "lucide-react";
import Nav from "@/app/components/Nav";
import Foot from "@/app/components/Foot";

// Mock data for freelancers
const freelancers = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior UI/UX Designer",
    avatar: "SC",
    rating: 4.9,
    reviews: 127,
    // hourlyRate removed
    location: "San Francisco, CA",
    skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
    description: "Creating beautiful, user-centered designs for 8+ years. Specialized in SaaS and mobile applications.",
    jobsCompleted: 89,
    responseTime: "1 hour",
    categories: ["Web Design", "Design", "UI/UX"],
  },
  {
    id: 2,
    name: "Alex Rivera",
    title: "Full Stack Developer",
    avatar: "AR",
    rating: 5.0,
    reviews: 203,
    // hourlyRate removed
    location: "Austin, TX",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    description: "Building scalable web applications with modern technologies. Expert in React ecosystem.",
    jobsCompleted: 156,
    responseTime: "30 mins",
    categories: ["Development", "Web Design", "WordPress"],
  },
  {
    id: 3,
    name: "Emily Watson",
    title: "Content Strategist",
    avatar: "EW",
    rating: 4.8,
    reviews: 94,
    // hourlyRate removed
    location: "New York, NY",
    skills: ["Copywriting", "SEO", "Content Strategy", "Blogging"],
    description: "Crafting compelling content that drives engagement and conversions. 6 years of experience.",
    jobsCompleted: 72,
    responseTime: "2 hours",
    categories: ["Writing", "Marketing", "SEO"],
  },
  {
    id: 4,
    name: "Marcus Johnson",
    title: "AI/ML Engineer",
    avatar: "MJ",
    rating: 4.9,
    reviews: 156,
    // hourlyRate removed
    location: "Seattle, WA",
    skills: ["Python", "TensorFlow", "GPT", "Machine Learning"],
    description: "Implementing cutting-edge AI solutions. Specialized in NLP and generative AI applications.",
    jobsCompleted: 98,
    responseTime: "1 hour",
    categories: ["AI Services", "Development", "Data Science"],
  },
  {
    id: 5,
    name: "Lisa Park",
    title: "Video Editor & Motion Designer",
    avatar: "LP",
    rating: 4.7,
    reviews: 81,
    // hourlyRate removed
    location: "Los Angeles, CA",
    skills: ["Premiere Pro", "After Effects", "Motion Graphics", "Color Grading"],
    description: "Bringing stories to life through video. Expert in commercial and social media content.",
    jobsCompleted: 64,
    responseTime: "3 hours",
    categories: ["Video", "Animation", "Design"],
  },
  {
    id: 6,
    name: "David Kim",
    title: "WordPress Developer",
    avatar: "DK",
    rating: 4.9,
    reviews: 245,
    // hourlyRate removed
    location: "Chicago, IL",
    skills: ["WordPress", "PHP", "WooCommerce", "Elementor"],
    description: "WordPress expert with 10+ years experience. Custom themes, plugins, and e-commerce solutions.",
    jobsCompleted: 198,
    responseTime: "45 mins",
    categories: ["WordPress", "Development", "Web Design"],
  },
];

// Mock data for job posts
const jobPosts = [
  {
    id: 1,
    title: "Build a Modern E-commerce Website",
    client: "TechStart Inc.",
    clientAvatar: "TS",
    budget: { min: 2000, max: 5000, type: "fixed" },
    postedAt: "2 hours ago",
    proposals: 12,
    description: "Looking for an experienced developer to build a modern e-commerce website with React and Next.js. Must have experience with payment integration and inventory management.",
    skills: ["React", "Next.js", "Stripe", "PostgreSQL"],
    duration: "1-2 months",
    experienceLevel: "Intermediate",
    categories: ["Development", "Web Design", "WordPress"],
  },
  {
    id: 2,
    title: "UI/UX Design for Mobile Banking App",
    client: "FinanceHub",
    clientAvatar: "FH",
    budget: { min: 3000, max: 6000, type: "fixed" },
    postedAt: "5 hours ago",
    proposals: 24,
    description: "We need a talented UI/UX designer to create a complete design system for our mobile banking application. Experience with fintech is a plus.",
    skills: ["Figma", "UI Design", "Mobile Design", "Design System"],
    duration: "2-3 months",
    experienceLevel: "Expert",
    categories: ["Design", "UI/UX", "Web Design"],
  },
  {
    id: 3,
    title: "SEO Content Writer for Tech Blog",
    client: "Digital Insights",
    clientAvatar: "DI",
    budget: { min: 30, max: 50, type: "hourly" },
    postedAt: "1 day ago",
    proposals: 45,
    description: "Seeking a skilled content writer with SEO expertise to create engaging blog posts about technology, AI, and software development topics.",
    skills: ["SEO", "Content Writing", "Technical Writing", "Blogging"],
    duration: "Ongoing",
    experienceLevel: "Intermediate",
    categories: ["Writing", "Marketing", "SEO"],
  },
  {
    id: 4,
    title: "AI Chatbot Development with GPT Integration",
    client: "AutomateNow",
    clientAvatar: "AN",
    budget: { min: 5000, max: 10000, type: "fixed" },
    postedAt: "3 hours ago",
    proposals: 8,
    description: "Build a custom AI-powered chatbot with GPT integration for customer support. Must handle complex queries and integrate with our existing CRM.",
    skills: ["Python", "GPT API", "NLP", "Machine Learning"],
    duration: "1-2 months",
    experienceLevel: "Expert",
    categories: ["AI Services", "Development", "Data Science"],
  },
  {
    id: 5,
    title: "Product Video for Crowdfunding Campaign",
    client: "InnovateTech",
    clientAvatar: "IT",
    budget: { min: 1500, max: 3000, type: "fixed" },
    postedAt: "12 hours ago",
    proposals: 18,
    description: "Create a compelling 2-minute product video for our Kickstarter campaign. Should include motion graphics and professional editing.",
    skills: ["Video Editing", "Motion Graphics", "After Effects", "Storytelling"],
    duration: "2-3 weeks",
    experienceLevel: "Intermediate",
    categories: ["Video", "Animation", "Design"],
  },
  {
    id: 6,
    title: "WordPress Website Redesign",
    client: "LocalBiz Solutions",
    clientAvatar: "LB",
    budget: { min: 800, max: 1500, type: "fixed" },
    postedAt: "6 hours ago",
    proposals: 32,
    description: "Need to redesign our existing WordPress website with a modern look. Should be mobile-responsive and optimized for speed.",
    skills: ["WordPress", "Web Design", "Elementor", "SEO"],
    duration: "2-4 weeks",
    experienceLevel: "Entry",
    categories: ["WordPress", "Development", "Web Design"],
  },
];

const ExplorePage = () => {
  const params = useParams();
  const router = useRouter();
  const category = decodeURIComponent(params.category as string);

  const [searchQuery, setSearchQuery] = useState(category);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [exploreMode, setExploreMode] = useState<"talent" | "work">("talent");

  // Filter freelancers based on category/search
  const filteredFreelancers = searchQuery.trim()
    ? freelancers.filter((freelancer) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        freelancer.categories.some((cat) => cat.toLowerCase().includes(searchLower)) ||
        freelancer.title.toLowerCase().includes(searchLower) ||
        freelancer.skills.some((skill) => skill.toLowerCase().includes(searchLower)) ||
        freelancer.name.toLowerCase().includes(searchLower)
      );
    })
    : freelancers;

  // Filter job posts based on category/search
  const filteredJobs = searchQuery.trim()
    ? jobPosts.filter((job) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        job.categories.some((cat) => cat.toLowerCase().includes(searchLower)) ||
        job.title.toLowerCase().includes(searchLower) ||
        job.skills.some((skill) => skill.toLowerCase().includes(searchLower)) ||
        job.client.toLowerCase().includes(searchLower)
      );
    })
    : jobPosts;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search happens live, no navigation needed
  };

  return (
    <div className="min-h-screen bg-gray-50">
     

      {/* Search & Filters Bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm pt-20">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex flex-1 max-w-xl">
              <div className="flex flex-1 items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={exploreMode === "talent" ? "Search for talent..." : "Search for jobs..."}
                  className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 outline-none"
                />
              </div>
              <button
                type="submit"
                className="ml-2 rounded-full bg-gray-900 px-6 py-2 font-semibold text-white transition-colors hover:bg-gray-800"
              >
                Search
              </button>
            </form>

            {/* View & Filter Controls */}
            <div className="flex items-center gap-3">
              {/* Find Talent / Find Work Toggle */}
              <div className="inline-flex rounded-full bg-gray-100 p-1">
                <button
                  onClick={() => setExploreMode("talent")}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    exploreMode === "talent"
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  Find Talent
                </button>
                <button
                  onClick={() => setExploreMode("work")}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    exploreMode === "work"
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Briefcase className="h-4 w-4" />
                  Find Work
                </button>
              </div>

              {/* Sort */}
             

              {/* View Toggle */}
             
            </div>
          </div>

          {/* Expandable Filters */}
          
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto min-h-screen max-w-7xl px-6 py-8">
        {/* Find Talent - Freelancers View */}
        {exploreMode === "talent" && (
          <>
            {filteredFreelancers.length === 0 ? (
              <div className="py-20 text-center">
                <Users className="mx-auto h-16 w-16 text-gray-300" />
                <p className="mt-4 text-xl text-gray-500">No professionals found for &quot;{category}&quot;</p>
                <p className="mt-2 text-gray-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" 
                : "flex flex-col gap-4"
              }>
                {filteredFreelancers.map((freelancer) => (
                  <div
                    key={freelancer.id}
                    className={`group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg ${
                      viewMode === "list" ? "flex gap-6" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div className={`flex items-center gap-4 ${viewMode === "list" ? "" : "mb-4"}`}>
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white">
                        {freelancer.avatar}
                      </div>
                      {viewMode === "grid" && (
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                            {freelancer.name}
                          </h3>
                          <p className="text-sm text-gray-500">{freelancer.title}</p>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={viewMode === "list" ? "flex-1" : ""}>
                      {viewMode === "list" && (
                        <div className="mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                            {freelancer.name}
                          </h3>
                          <p className="text-gray-500">{freelancer.title}</p>
                        </div>
                      )}

                      {/* Rating & Stats */}
                      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-semibold text-gray-900">{freelancer.rating}</span>
                          <span className="text-gray-400">({freelancer.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <MapPin className="h-4 w-4" />
                          {freelancer.location}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="h-4 w-4" />
                          {freelancer.responseTime}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                        {freelancer.description}
                      </p>

                      {/* Skills */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {freelancer.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                          >
                            {skill}
                          </span>
                        ))}
                        {freelancer.skills.length > 3 && (
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-400">
                            +{freelancer.skills.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                        <div>
                          {/* hourlyRate removed */}
                        </div>
                        <Link 
                          href={`/profile/${freelancer.id}`}
                          className="rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Find Work - Job Posts View */}
        {exploreMode === "work" && (
          <>
            {filteredJobs.length === 0 ? (
              <div className="py-20 text-center">
                <Briefcase className="mx-auto h-16 w-16 text-gray-300" />
                <p className="mt-4 text-xl text-gray-500">No jobs found for &quot;{category}&quot;</p>
                <p className="mt-2 text-gray-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      {/* Job Info */}
                      <div className="flex-1">
                        <div className="mb-3 flex items-start gap-4">
                          {/* Client Avatar */}
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-bold text-white">
                            {job.clientAvatar}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                              {job.title}
                            </h3>
                            <p className="text-sm text-gray-500">{job.client}</p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                          {job.description}
                        </p>

                        {/* Skills */}
                        <div className="mb-4 flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Job Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.postedAt}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {job.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {job.proposals} proposals
                          </div>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            job.experienceLevel === "Expert" 
                            ? "bg-purple-100 text-purple-700"
                            : job.experienceLevel === "Intermediate"
                              "bg-blue-100 text-blue-700"
                              "bg-green-100 text-green-700"
                          }`}>
                            {job.experienceLevel}
                          </span>
                        </div>
                      </div>

                      {/* Budget & CTA */}
                      <div className="flex flex-row items-center justify-between gap-4 border-t border-gray-100 pt-4 lg:flex-col lg:items-end lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-5 w-5 text-gray-400" />
                            <span className="text-2xl font-bold text-gray-900">
                              {job.budget.min.toLocaleString()} - {job.budget.max.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {job.budget.type === "fixed" ? "Fixed Price" : ""}
                          </p>
                        </div>
                        <Link
                          href={`/post/${job.id}`}
                          className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Foot />
    </div >
  );
};

export default ExplorePage;
