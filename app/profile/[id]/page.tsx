"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  MapPin,
  Clock,
  Briefcase,
  ChevronLeft,
  MessageCircle,
  Heart,
  Share2,
  CheckCircle,
  Calendar,
  Globe,
  Award,
  ThumbsUp,
} from "lucide-react";
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
    skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Wireframing", "User Testing"],
    description: "Creating beautiful, user-centered designs for 8+ years. Specialized in SaaS and mobile applications.",
    bio: "I'm a passionate UI/UX designer with over 8 years of experience creating intuitive and visually stunning digital experiences. I've worked with startups and Fortune 500 companies alike, helping them transform complex problems into simple, elegant solutions. My approach combines data-driven insights with creative intuition to deliver designs that not only look great but also drive measurable results.",
    jobsCompleted: 89,
    responseTime: "1 hour",
    categories: ["Web Design", "Design", "UI/UX"],
    languages: ["English (Native)", "Mandarin (Fluent)"],
    memberSince: "March 2019",
    lastActive: "2 hours ago",
    portfolio: [
      { title: "FinTech Dashboard Redesign", image: "/portfolio1.jpg", description: "Complete redesign of a banking dashboard" },
      { title: "E-commerce Mobile App", image: "/portfolio2.jpg", description: "iOS and Android app design" },
      { title: "SaaS Landing Page", image: "/portfolio3.jpg", description: "High-converting landing page design" },
    ],
    reviewsList: [
      { client: "TechCorp", rating: 5, comment: "Sarah delivered exceptional work. Her attention to detail is amazing!", date: "2 weeks ago" },
      { client: "StartupXYZ", rating: 5, comment: "Great communication and delivered on time. Highly recommend!", date: "1 month ago" },
      { client: "DesignAgency", rating: 4, comment: "Quality work and professional attitude throughout the project.", date: "2 months ago" },
    ],
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
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker", "GraphQL"],
    description: "Building scalable web applications with modern technologies. Expert in React ecosystem.",
    bio: "Full-stack developer with 10+ years of experience building production-ready applications. I specialize in the React ecosystem and have deep expertise in building scalable, maintainable codebases. I've led engineering teams at multiple startups and have a track record of delivering projects on time and within budget.",
    jobsCompleted: 156,
    responseTime: "30 mins",
    categories: ["Development", "Web Design", "WordPress"],
    languages: ["English (Native)", "Spanish (Conversational)"],
    memberSince: "January 2018",
    lastActive: "Online",
    portfolio: [
      { title: "E-commerce Platform", image: "/portfolio1.jpg", description: "Full-stack marketplace with 100k+ users" },
      { title: "Real-time Chat App", image: "/portfolio2.jpg", description: "WebSocket-based messaging platform" },
      { title: "Analytics Dashboard", image: "/portfolio3.jpg", description: "Data visualization dashboard" },
    ],
    reviewsList: [
      { client: "BigTech Inc", rating: 5, comment: "Alex is a rockstar developer. Exceeded all expectations!", date: "1 week ago" },
      { client: "E-Shop Co", rating: 5, comment: "Incredible work on our platform. Very knowledgeable and efficient.", date: "3 weeks ago" },
      { client: "Startup Hub", rating: 5, comment: "Best developer we've ever worked with. Highly professional.", date: "1 month ago" },
    ],
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
    skills: ["Copywriting", "SEO", "Content Strategy", "Blogging", "Social Media", "Email Marketing"],
    description: "Crafting compelling content that drives engagement and conversions. 6 years of experience.",
    bio: "I help brands tell their stories in ways that resonate with their audience. With a background in journalism and digital marketing, I bring a unique perspective to content creation. I've written for top publications and helped dozens of businesses improve their online presence through strategic content.",
    jobsCompleted: 72,
    responseTime: "2 hours",
    categories: ["Writing", "Marketing", "SEO"],
    languages: ["English (Native)", "French (Basic)"],
    memberSince: "July 2020",
    lastActive: "5 hours ago",
    portfolio: [],
    reviewsList: [],
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
    skills: ["Python", "TensorFlow", "GPT", "Machine Learning", "PyTorch", "NLP", "Computer Vision"],
    description: "Implementing cutting-edge AI solutions. Specialized in NLP and generative AI applications.",
    bio: "AI/ML engineer with a PhD in Computer Science and 7+ years of industry experience. I've built AI systems for healthcare, finance, and e-commerce. Currently focused on large language models and their practical applications for businesses.",
    jobsCompleted: 98,
    responseTime: "1 hour",
    categories: ["AI Services", "Development", "Data Science"],
    languages: ["English (Native)"],
    memberSince: "September 2019",
    lastActive: "1 hour ago",
    portfolio: [],
    reviewsList: [],
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
    skills: ["Premiere Pro", "After Effects", "Motion Graphics", "Color Grading", "DaVinci Resolve", "Cinema 4D"],
    description: "Bringing stories to life through video. Expert in commercial and social media content.",
    bio: "Award-winning video editor and motion designer with experience across film, TV, and digital content. I've worked on projects for major brands and independent creators alike. My passion is creating visually stunning content that captures attention and tells compelling stories.",
    jobsCompleted: 64,
    responseTime: "3 hours",
    categories: ["Video", "Animation", "Design"],
    languages: ["English (Native)", "Korean (Native)"],
    memberSince: "April 2021",
    lastActive: "Yesterday",
    portfolio: [],
    reviewsList: [],
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
    skills: ["WordPress", "PHP", "WooCommerce", "Elementor", "JavaScript", "MySQL", "SEO"],
    description: "WordPress expert with 10+ years experience. Custom themes, plugins, and e-commerce solutions.",
    bio: "I've been building WordPress websites since 2012 and have completed over 500 projects. From simple blogs to complex e-commerce platforms, I can help you achieve your goals. I pride myself on clean code, fast loading times, and excellent communication.",
    jobsCompleted: 198,
    responseTime: "45 mins",
    categories: ["WordPress", "Development", "Web Design"],
    languages: ["English (Fluent)", "Korean (Native)"],
    memberSince: "February 2018",
    lastActive: "30 mins ago",
    portfolio: [],
    reviewsList: [],
  },
];

const ProfilePage = () => {
  const params = useParams();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"portfolio" | "reviews">("portfolio");

  const freelancer = freelancers.find((f) => f.id === Number(params.id));

  if (!freelancer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="flex flex-col items-center justify-center py-32">
          <h1 className="text-2xl font-bold text-gray-900">Profile Not Found</h1>
          <p className="mt-2 text-gray-600">The freelancer you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.back()}
            className="mt-6 rounded-full bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800"
          >
            Go Back
          </button>
        </div>
        <Foot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <div className="pt-20">
        {/* Back Button */}
        <div className="mx-auto max-w-6xl px-6 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to results
          </button>
        </div>

        {/* Profile Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              {/* Profile Info */}
              <div className="flex gap-6">
                {/* Avatar */}
                <div className="h-24 w-24 shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                  {freelancer.avatar}
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                      {freelancer.name}
                    </h1>
                    <CheckCircle className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="mt-1 text-lg text-gray-600">{freelancer.title}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {freelancer.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{freelancer.rating}</span>
                      <span>({freelancer.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Responds in {freelancer.responseTime}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-1 text-sm text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    {freelancer.lastActive === "Online" ? "Online now" : `Active ${freelancer.lastActive}`}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                {/* Removed hourly rate display */}

                <div className="flex gap-2">
                  <button className="flex-1 rounded-full bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800 transition-colors">
                    <MessageCircle className="mr-2 inline-block h-5 w-5" />
                    Contact
                  </button>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`rounded-full p-3 border transition-colors ${isSaved
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "bg-white border-gray-200 text-gray-400 hover:text-red-500"
                      }`}
                  >
                    <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
                  </button>
                  <button className="rounded-full p-3 border border-gray-200 bg-white text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">About</h2>
                <p className="mt-4 text-gray-600 leading-relaxed">{freelancer.bio}</p>
              </div>

              {/* Skills */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {freelancer.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tabs - Portfolio & Reviews */}
              <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("portfolio")}
                    className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${activeTab === "portfolio"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Portfolio
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${activeTab === "reviews"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Reviews ({freelancer.reviews})
                  </button>
                </div>

                <div className="p-6">
                  {activeTab === "portfolio" ? (
                    freelancer.portfolio && freelancer.portfolio.length > 0 ? (
                      <div className="grid gap-6 sm:grid-cols-2">
                        {freelancer.portfolio.map((item, index) => (
                          <div
                            key={index}
                            className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200"
                          >
                            <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                              <span className="text-gray-500">Preview</span>
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                                {item.title}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No portfolio items yet</p>
                      </div>
                    )
                  ) : freelancer.reviewsList && freelancer.reviewsList.length > 0 ? (
                    <div className="space-y-6">
                      {freelancer.reviewsList.map((review, index) => (
                        <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                                {review.client.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{review.client}</p>
                                <p className="text-sm text-gray-500">{review.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                    }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-3 text-gray-600">{review.comment}</p>
                          <button className="mt-3 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                            <ThumbsUp className="h-4 w-4" />
                            Helpful
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No reviews yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Info */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-bold text-gray-900">Stats</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase className="h-5 w-5" />
                      Jobs Completed
                    </div>
                    <span className="font-semibold text-gray-900">{freelancer.jobsCompleted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Star className="h-5 w-5" />
                      Total Reviews
                    </div>
                    <span className="font-semibold text-gray-900">{freelancer.reviews}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-5 w-5" />
                      Response Time
                    </div>
                    <span className="font-semibold text-gray-900">{freelancer.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-5 w-5" />
                      Member Since
                    </div>
                    <span className="font-semibold text-gray-900">{freelancer.memberSince}</span>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-bold text-gray-900">Languages</h3>
                <div className="mt-4 space-y-2">
                  {freelancer.languages.map((lang, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <Globe className="h-4 w-4" />
                      {lang}
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-bold text-gray-900">Categories</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {freelancer.categories.map((cat, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Foot />
    </div>
  );
};

export default ProfilePage;
