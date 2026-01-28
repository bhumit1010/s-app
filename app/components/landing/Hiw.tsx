"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, ArrowRight, Search, Check, Lock, CheckCircle, Briefcase, Star, Wallet } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Separate component for sections to handle GSAP cleanup properly
const SectionsContent = ({ activeTab }: { activeTab: "client" | "freelancer" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = sectionsRef.current.filter(Boolean);
    const triggers: ScrollTrigger[] = [];

    sections.forEach((section, index) => {
      if (!section) return;

      // Pin each section except last
      if (index < sections.length - 1) {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: false,
          scrub: 1,
        });
        triggers.push(trigger);
      }

      // Animate content
      const content = section.querySelector(".section-content");
      if (content) {
        const anim = gsap.fromTo(
          content,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scale: 1.1,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
        if (anim.scrollTrigger) {
          triggers.push(anim.scrollTrigger);
        }
      }
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef}>
      {activeTab === "client" ? (
        <ClientSections sectionsRef={sectionsRef} />
      ) : (
        <FreelancerSections sectionsRef={sectionsRef} />
      )}
    </div>
  );
};

// Client Sections Component
const ClientSections = ({ sectionsRef }: { sectionsRef: React.MutableRefObject<HTMLDivElement[]> }) => (
  <>
    {/* ✅ Client Step 1 */}
    <div
      ref={(el) => {
        if (el) sectionsRef.current[0] = el;
      }}
      className="relative shadow-md flex min-h-[calc(100vh+110px)] items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <div className="section-content mx-auto flex max-w-6xl flex-col items-center gap-12 px-8 lg:flex-row lg:gap-20">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
              1
            </div>
            <div className="h-px flex-1 bg-blue-200"></div>
            <span className="text-sm font-semibold tracking-wider text-blue-600">
              THE BRIEF
            </span>
          </div>
          <h3 className="text-5xl font-bold text-gray-900">Post a job</h3>
          <p className="max-w-md text-lg text-gray-600">
            Tell us about your project. FreelancePro connects you with top
            talent around the world. Describe your needs, budget, and timeline
            to get started.
          </p>
          <button className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
            Post Your Job
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        <div className="hidden flex-1 lg:block">
          <div className="relative">
            <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-white p-12 shadow-xl">
              <div className="flex items-center justify-center">
                <FileText className="h-32 w-32 text-blue-200" strokeWidth={1} />
              </div>
            </div>
            <div className="absolute -bottom-4 left-8 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                <span className="text-lg text-emerald-500">+</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">STATUS</p>
                <p className="font-semibold text-gray-900">Job Live</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ✅ Client Step 2 */}
    <div
      ref={(el) => {
        if (el) sectionsRef.current[1] = el;
      }}
      className="relative shadow-md flex min-h-[calc(100vh+110px)] items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50"
    >
      <div className="section-content mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-8 lg:flex-row lg:gap-20">
        <div className="hidden flex-1 lg:block">
          <div className="relative">
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <div className="mb-4 flex items-center gap-4 rounded-xl bg-gray-50 p-4">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 rounded-full bg-gray-200"></div>
                  <div className="h-2 w-1/2 rounded-full bg-gray-200"></div>
                </div>
              </div>
              <div className="mb-4 flex items-center gap-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 rounded-full bg-gray-300"></div>
                  <div className="h-2 w-1/2 rounded-full bg-gray-200"></div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 rounded-full bg-gray-200"></div>
                  <div className="h-2 w-1/2 rounded-full bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-sm font-bold text-white">
              2
            </div>
            <div className="h-px flex-1 bg-emerald-200"></div>
            <span className="text-sm font-semibold tracking-wider text-emerald-600">
              CONNECT
            </span>
          </div>
          <h3 className="text-5xl font-bold text-gray-900">Hire a pro</h3>
          <p className="max-w-md text-lg text-gray-600">
            Compare bids, reviews, and prior work. Chat with your favorites
            and hire the best fit for your specific needs.
          </p>
          <button className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800">
            Find Experts
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

    {/* ✅ Client Step 3 */}
    <div
      ref={(el) => {
        if (el) sectionsRef.current[2] = el;
      }}
      className="relative shadow-md flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <div className="section-content mx-auto flex max-w-6xl flex-col items-center gap-12 px-8 lg:flex-row lg:gap-20">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500 text-sm font-bold text-white">
              3
            </div>
            <div className="h-px flex-1 bg-purple-200"></div>
            <span className="text-sm font-semibold tracking-wider text-purple-600">
              SECURE
            </span>
          </div>
          <h3 className="text-5xl font-bold text-gray-900">Pay safely</h3>
          <p className="max-w-md text-lg text-gray-600">
            Use our secure payment system to release funds only when you are
            100% satisfied. Payment protection creates peace of mind for
            everyone.
          </p>
          <button className="inline-flex items-center gap-2 rounded-full bg-purple-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-600">
            Get Started
            <Lock className="h-5 w-5" />
          </button>
        </div>
        <div className="hidden flex-1 lg:block">
          <div className="relative">
            <div className="rounded-3xl bg-white p-10 shadow-xl">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="h-8 w-8 text-emerald-500" />
                </div>
                <p className="text-4xl font-bold text-gray-900">0.80 SOL</p>
                <p className="text-sm font-semibold tracking-wider text-emerald-600">
                  PAYMENT RELEASED
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

// Freelancer Sections Component
const FreelancerSections = ({ sectionsRef }: { sectionsRef: React.MutableRefObject<HTMLDivElement[]> }) => (
  <>
    {/* ✅ Freelancer Step 1 */}
    <div
      ref={(el) => {
        if (el) sectionsRef.current[0] = el;
      }}
      className="relative shadow-md flex min-h-[calc(100vh+110px)] items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <div className="section-content mx-auto flex max-w-6xl flex-col items-center gap-12 px-8 lg:flex-row lg:gap-20">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-sm font-bold text-white">
              1
            </div>
            <div className="h-px flex-1 bg-orange-200"></div>
            <span className="text-sm font-semibold tracking-wider text-orange-600">
              DISCOVER
            </span>
          </div>
          <h3 className="text-5xl font-bold text-gray-900">Find projects</h3>
          <p className="max-w-md text-lg text-gray-600">
            Browse thousands of projects that match your skills. Filter by
            category, budget, and timeline to find the perfect opportunity.
          </p>
          <button className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600">
            Browse Jobs
            <Briefcase className="h-5 w-5" />
          </button>
        </div>
        <div className="hidden flex-1 lg:block">
          <div className="relative">
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <div className="mb-4 rounded-xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="h-3 w-1/2 rounded-full bg-gray-300"></div>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                    New
                  </span>
                </div>
                <div className="h-2 w-3/4 rounded-full bg-gray-200"></div>
              </div>
              <div className="mb-4 rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="h-3 w-1/2 rounded-full bg-gray-300"></div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
                    Match
                  </span>
                </div>
                <div className="h-2 w-3/4 rounded-full bg-gray-200"></div>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="h-3 w-1/2 rounded-full bg-gray-200"></div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                    Hot
                  </span>
                </div>
                <div className="h-2 w-3/4 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ✅ Freelancer Step 2 */}
    <div
      ref={(el) => {
        if (el) sectionsRef.current[1] = el;
      }}
      className="relative shadow-md flex min-h-[calc(100vh+110px)] items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50"
    >
      <div className="section-content mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-8 lg:flex-row lg:gap-20">
        <div className="hidden flex-1 lg:block">
          <div className="relative">
            <div className="rounded-3xl bg-white p-10 shadow-xl">
              <div className="flex flex-col items-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"></div>
                <div className="flex gap-1">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>
                <div className="flex gap-6 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">98%</p>
                    <p className="text-xs text-gray-500">Success</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">150+</p>
                    <p className="text-xs text-gray-500">Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-sm font-bold text-white">
              2
            </div>
            <div className="h-px flex-1 bg-cyan-200"></div>
            <span className="text-sm font-semibold tracking-wider text-cyan-600">
              SHOWCASE
            </span>
          </div>
          <h3 className="text-5xl font-bold text-gray-900">Build reputation</h3>
          <p className="max-w-md text-lg text-gray-600">
            Complete projects, earn reviews, and build your professional
            profile. The more you deliver, the more clients will find you.
          </p>
          <button className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600">
            View Profile
            <Star className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

    {/* ✅ Freelancer Step 3 */}
    <div
      ref={(el) => {
        if (el) sectionsRef.current[2] = el;
      }}
      className="relative shadow-md flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <div className="section-content mx-auto flex max-w-6xl flex-col items-center gap-12 px-8 lg:flex-row lg:gap-20">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-sm font-bold text-white">
              3
            </div>
            <div className="h-px flex-1 bg-emerald-200"></div>
            <span className="text-sm font-semibold tracking-wider text-emerald-600">
              EARN
            </span>
          </div>
          <h3 className="text-5xl font-bold text-gray-900">Get paid</h3>
          <p className="max-w-md text-lg text-gray-600">
            Receive secure payments directly to your wallet. Low fees,
            instant transfers, and complete financial transparency.
          </p>
          <button className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-600">
            Start Earning
            <Wallet className="h-5 w-5" />
          </button>
        </div>
        <div className="hidden flex-1 lg:block">
          <div className="relative">
            <div className="rounded-3xl bg-white p-10 shadow-xl">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Wallet className="h-8 w-8 text-emerald-500" />
                </div>
                <p className="text-4xl font-bold text-gray-900">12.5 SOL</p>
                <p className="text-sm font-semibold tracking-wider text-emerald-600">
                  AVAILABLE BALANCE
                </p>
                <button className="mt-2 rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

const Hiw = () => {
  const [activeTab, setActiveTab] = useState<"client" | "freelancer">("client");

  return (
    <div className="relative bg-gray-100">
      <div className="py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
        <p className="mt-4 text-gray-600">
          Your journey to skill mastery in three simple steps
        </p>

        {/* Toggle Button */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full bg-gray-200 p-1">
            <button
              onClick={() => setActiveTab("client")}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                activeTab === "client"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              For Clients
            </button>
            <button
              onClick={() => setActiveTab("freelancer")}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                activeTab === "freelancer"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              For Freelancers
            </button>
          </div>
        </div>
      </div>

      {/* Use key to force complete remount and proper GSAP cleanup */}
      <SectionsContent  key={activeTab} activeTab={activeTab} />
      {/* CTA Section */}
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Ready to unleash your potential?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-400">
          Join thousands of businesses and freelancers already connecting on
          SkillDAO to build the future of work.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="rounded-full bg-emerald-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-emerald-600">
            Find Talent
          </button>
          <button className="rounded-full border-2 border-gray-600 bg-transparent px-8 py-3 font-semibold text-white transition-colors hover:border-gray-500 hover:bg-gray-800">
            Find Work
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hiw;
