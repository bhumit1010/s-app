import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ==================== TYPES ====================

export interface Job {
    id: number;
    title: string;
    client: string;
    budget: number;
    description: string;
    skills: string[];
    deadline: string;
    progress?: number;
    startedAt?: string;
    milestones?: Milestone[];
}

export interface Milestone {
    title: string;
    status: "completed" | "in-progress" | "pending";
}

export interface AppliedPost {
    id: number;
    title: string;
    client: string;
    budget: number;
    description: string;
    skills: string[];
    status: "pending" | "interviewed" | "accepted" | "rejected";
    appliedAt: string;
}

export interface CurrentJob extends Job {
    progress: number;
    startedAt: string;
    milestones: Milestone[];
}

export interface CompletedJob {
    id: number;
    title: string;
    client: string;
    earned: number;
    rating: number;
    review: string;
    completedAt: string;
}

export interface JobPost {
    id: number;
    title: string;
    budget: number;
    description: string;
    skills: string[];
    status: "active" | "closed" | "draft";
    applicants: number;
    postedAt: string;
}

export interface Proposal {
    id: number;
    title: string;
    description: string;
    category: string;
    author: string;
    votesFor: number;
    votesAgainst: number;
    status: "active" | "passed" | "rejected";
    createdAt: string;
    userVote?: "for" | "against" | null;
}

export interface FreelancerStats {
    totalEarnings: number;
    activeProjects: number;
    completedProjects: number;
    avgRating: number;
    earningsChange: string;
}

export interface ClientStats {
    totalSpent: number;
    activeProjects: number;
    completedProjects: number;
    totalFreelancers: number;
}

export interface AppDataState {
    // Freelancer data
    appliedPosts: AppliedPost[];
    currentJobs: CurrentJob[];
    completedJobs: CompletedJob[];
    freelancerStats: FreelancerStats;

    // Client data
    jobPosts: JobPost[];
    clientStats: ClientStats;

    // Governance
    proposals: Proposal[];

    // Explore jobs
    exploreJobs: Job[];

    // Loading states
    isInitialized: boolean;
}

// ==================== INITIAL DATA ====================

const defaultAppliedPosts: AppliedPost[] = [
    {
        id: 1,
        title: "Build a DeFi Dashboard",
        client: "CryptoVentures",
        budget: 5000,
        description: "Looking for an experienced developer to build a comprehensive DeFi dashboard with real-time data.",
        skills: ["React", "Web3.js", "TypeScript"],
        status: "pending",
        appliedAt: "2 days ago",
    },
    {
        id: 2,
        title: "Smart Contract Audit",
        client: "BlockSecure",
        budget: 8000,
        description: "Need a thorough security audit for our lending protocol smart contracts.",
        skills: ["Solidity", "Security", "Foundry"],
        status: "interviewed",
        appliedAt: "5 days ago",
    },
    {
        id: 3,
        title: "NFT Marketplace Frontend",
        client: "ArtChain",
        budget: 6500,
        description: "Create a modern, responsive frontend for our NFT marketplace.",
        skills: ["Next.js", "Tailwind", "ethers.js"],
        status: "accepted",
        appliedAt: "1 week ago",
    },
];

const defaultCurrentJobs: CurrentJob[] = [
    {
        id: 1,
        title: "E-commerce Platform Redesign",
        client: "TechStore Inc.",
        budget: 12000,
        description: "Complete redesign of an existing e-commerce platform with modern UI/UX, improved checkout flow, and mobile optimization.",
        skills: ["React", "Node.js", "PostgreSQL", "Figma"],
        deadline: "Dec 15, 2023",
        progress: 65,
        startedAt: "Oct 1, 2023",
        milestones: [
            { title: "Wireframes & Architecture", status: "completed" },
            { title: "Frontend Development", status: "completed" },
            { title: "Backend Integration", status: "in-progress" },
            { title: "Testing & Deployment", status: "pending" },
        ],
    },
    {
        id: 2,
        title: "Mobile App Development",
        client: "HealthFirst",
        budget: 18000,
        description: "Build a cross-platform mobile application for health tracking with wearable device integration.",
        skills: ["React Native", "Firebase", "HealthKit"],
        deadline: "Jan 20, 2024",
        progress: 35,
        startedAt: "Nov 1, 2023",
        milestones: [
            { title: "UI Design", status: "completed" },
            { title: "Core Features", status: "in-progress" },
            { title: "Device Integration", status: "pending" },
            { title: "App Store Submission", status: "pending" },
        ],
    },
];

const defaultCompletedJobs: CompletedJob[] = [
    {
        id: 1,
        title: "DAO Voting System",
        client: "GovernanceDAO",
        earned: 7500,
        rating: 5.0,
        review: "Exceptional work! Delivered ahead of schedule with excellent code quality.",
        completedAt: "Sep 28, 2023",
    },
    {
        id: 2,
        title: "Token Swap Interface",
        client: "SwapFi",
        earned: 4200,
        rating: 4.8,
        review: "Great communication and technical skills. Would hire again.",
        completedAt: "Aug 15, 2023",
    },
    {
        id: 3,
        title: "Blockchain Analytics Tool",
        client: "ChainMetrics",
        earned: 9800,
        rating: 4.9,
        review: "Highly professional, delivered complex features with great attention to detail.",
        completedAt: "Jul 22, 2023",
    },
];

const defaultFreelancerStats: FreelancerStats = {
    totalEarnings: 45280,
    activeProjects: 2,
    completedProjects: 12,
    avgRating: 4.9,
    earningsChange: "+12%",
};

const defaultJobPosts: JobPost[] = [
    {
        id: 1,
        title: "Senior React Developer for DeFi Platform",
        budget: 15000,
        description: "We need an experienced React developer to build our new DeFi lending platform.",
        skills: ["React", "TypeScript", "Web3"],
        status: "active",
        applicants: 12,
        postedAt: "2 days ago",
    },
    {
        id: 2,
        title: "Smart Contract Developer",
        budget: 8000,
        description: "Looking for a Solidity expert to develop and audit smart contracts.",
        skills: ["Solidity", "Hardhat", "Security"],
        status: "active",
        applicants: 8,
        postedAt: "5 days ago",
    },
    {
        id: 3,
        title: "UI/UX Designer for NFT Marketplace",
        budget: 5000,
        description: "Design a modern, user-friendly interface for our NFT marketplace.",
        skills: ["Figma", "UI Design", "Web3"],
        status: "closed",
        applicants: 15,
        postedAt: "2 weeks ago",
    },
];

const defaultClientStats: ClientStats = {
    totalSpent: 28500,
    activeProjects: 2,
    completedProjects: 5,
    totalFreelancers: 8,
};

const defaultProposals: Proposal[] = [
    {
        id: 1,
        title: "Implement Escrow Smart Contract for All Transactions",
        description: "Proposal to require all job payments to go through a decentralized escrow smart contract for increased security.",
        category: "Platform Security",
        author: "alex.eth",
        votesFor: 234,
        votesAgainst: 45,
        status: "active",
        createdAt: "2023-11-15",
    },
    {
        id: 2,
        title: "Reduce Platform Fees for High-Volume Users",
        description: "Implement a tiered fee structure that rewards users who complete more than 10 jobs per month.",
        category: "Fees & Pricing",
        author: "sarah.dao",
        votesFor: 189,
        votesAgainst: 67,
        status: "active",
        createdAt: "2023-11-12",
    },
    {
        id: 3,
        title: "Add Multi-Sig Wallet Support",
        description: "Enable teams to use multi-signature wallets for receiving payments and managing funds.",
        category: "New Features",
        author: "dev.collective",
        votesFor: 312,
        votesAgainst: 23,
        status: "passed",
        createdAt: "2023-11-01",
    },
];

const defaultExploreJobs: Job[] = [
    {
        id: 1,
        title: "Build a DeFi Dashboard",
        client: "CryptoVentures",
        budget: 5000,
        description: "Looking for an experienced developer to build a comprehensive DeFi dashboard.",
        skills: ["React", "Web3.js", "TypeScript"],
        deadline: "Dec 30, 2023",
    },
    {
        id: 2,
        title: "Smart Contract Development",
        client: "BlockSecure",
        budget: 8000,
        description: "Develop secure smart contracts for our lending protocol.",
        skills: ["Solidity", "Hardhat", "Security"],
        deadline: "Jan 15, 2024",
    },
    {
        id: 3,
        title: "NFT Marketplace Frontend",
        client: "ArtChain",
        budget: 6500,
        description: "Create a modern responsive frontend for our NFT marketplace.",
        skills: ["Next.js", "Tailwind", "ethers.js"],
        deadline: "Jan 5, 2024",
    },
];

// ==================== LOCALSTORAGE HELPERS ====================

const STORAGE_KEY = "skillDaoAppData";

const getDataFromLocalStorage = (): Partial<AppDataState> | null => {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            try {
                return JSON.parse(data);
            } catch (error) {
                console.error("Error parsing app data from localStorage:", error);
                return null;
            }
        }
    }
    return null;
};

const saveDataToLocalStorage = (data: AppDataState): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
};

// ==================== INITIAL STATE ====================

const initialState: AppDataState = {
    appliedPosts: defaultAppliedPosts,
    currentJobs: defaultCurrentJobs,
    completedJobs: defaultCompletedJobs,
    freelancerStats: defaultFreelancerStats,
    jobPosts: defaultJobPosts,
    clientStats: defaultClientStats,
    proposals: defaultProposals,
    exploreJobs: defaultExploreJobs,
    isInitialized: false,
};

// ==================== SLICE ====================

const dataSlice = createSlice({
    name: "appData",
    initialState,
    reducers: {
        // Initialize data from localStorage
        initializeData: (state) => {
            const storedData = getDataFromLocalStorage();
            if (storedData) {
                Object.assign(state, storedData);
            }
            state.isInitialized = true;
            saveDataToLocalStorage(state);
        },

        // Reset to default data
        resetToDefaults: (state) => {
            state.appliedPosts = defaultAppliedPosts;
            state.currentJobs = defaultCurrentJobs;
            state.completedJobs = defaultCompletedJobs;
            state.freelancerStats = defaultFreelancerStats;
            state.jobPosts = defaultJobPosts;
            state.clientStats = defaultClientStats;
            state.proposals = defaultProposals;
            state.exploreJobs = defaultExploreJobs;
            saveDataToLocalStorage(state);
        },

        // ========== Freelancer Actions ==========
        addAppliedPost: (state, action: PayloadAction<AppliedPost>) => {
            state.appliedPosts.push(action.payload);
            saveDataToLocalStorage(state);
        },

        updateAppliedPostStatus: (state, action: PayloadAction<{ id: number; status: AppliedPost["status"] }>) => {
            const post = state.appliedPosts.find((p) => p.id === action.payload.id);
            if (post) {
                post.status = action.payload.status;
                saveDataToLocalStorage(state);
            }
        },

        addCurrentJob: (state, action: PayloadAction<CurrentJob>) => {
            state.currentJobs.push(action.payload);
            state.freelancerStats.activeProjects += 1;
            saveDataToLocalStorage(state);
        },

        updateJobProgress: (state, action: PayloadAction<{ id: number; progress: number }>) => {
            const job = state.currentJobs.find((j) => j.id === action.payload.id);
            if (job) {
                job.progress = action.payload.progress;
                saveDataToLocalStorage(state);
            }
        },

        completeJob: (state, action: PayloadAction<{ jobId: number; earned: number; rating: number; review: string }>) => {
            const jobIndex = state.currentJobs.findIndex((j) => j.id === action.payload.jobId);
            if (jobIndex !== -1) {
                const job = state.currentJobs[jobIndex];
                state.completedJobs.push({
                    id: job.id,
                    title: job.title,
                    client: job.client,
                    earned: action.payload.earned,
                    rating: action.payload.rating,
                    review: action.payload.review,
                    completedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                });
                state.currentJobs.splice(jobIndex, 1);
                state.freelancerStats.activeProjects -= 1;
                state.freelancerStats.completedProjects += 1;
                state.freelancerStats.totalEarnings += action.payload.earned;
                saveDataToLocalStorage(state);
            }
        },

        // ========== Client Actions ==========
        addJobPost: (state, action: PayloadAction<Omit<JobPost, "id" | "applicants" | "postedAt">>) => {
            const newJob: JobPost = {
                ...action.payload,
                id: Date.now(),
                applicants: 0,
                postedAt: "Just now",
            };
            state.jobPosts.unshift(newJob);
            saveDataToLocalStorage(state);
        },

        updateJobPost: (state, action: PayloadAction<{ id: number; updates: Partial<JobPost> }>) => {
            const job = state.jobPosts.find((j) => j.id === action.payload.id);
            if (job) {
                Object.assign(job, action.payload.updates);
                saveDataToLocalStorage(state);
            }
        },

        deleteJobPost: (state, action: PayloadAction<number>) => {
            state.jobPosts = state.jobPosts.filter((j) => j.id !== action.payload);
            saveDataToLocalStorage(state);
        },

        // ========== Governance Actions ==========
        addProposal: (state, action: PayloadAction<Omit<Proposal, "id" | "votesFor" | "votesAgainst" | "status" | "createdAt">>) => {
            const newProposal: Proposal = {
                ...action.payload,
                id: Date.now(),
                votesFor: 0,
                votesAgainst: 0,
                status: "active",
                createdAt: new Date().toISOString().split("T")[0],
            };
            state.proposals.unshift(newProposal);
            saveDataToLocalStorage(state);
        },

        voteOnProposal: (state, action: PayloadAction<{ id: number; vote: "for" | "against" }>) => {
            const proposal = state.proposals.find((p) => p.id === action.payload.id);
            if (proposal) {
                // Remove previous vote if exists
                if (proposal.userVote === "for") {
                    proposal.votesFor -= 1;
                } else if (proposal.userVote === "against") {
                    proposal.votesAgainst -= 1;
                }

                // Add new vote or toggle off
                if (proposal.userVote === action.payload.vote) {
                    proposal.userVote = null;
                } else {
                    proposal.userVote = action.payload.vote;
                    if (action.payload.vote === "for") {
                        proposal.votesFor += 1;
                    } else {
                        proposal.votesAgainst += 1;
                    }
                }
                saveDataToLocalStorage(state);
            }
        },

        // ========== Explore Jobs Actions ==========
        applyToJob: (state, action: PayloadAction<number>) => {
            const job = state.exploreJobs.find((j) => j.id === action.payload);
            if (job) {
                const appliedPost: AppliedPost = {
                    id: Date.now(),
                    title: job.title,
                    client: job.client,
                    budget: job.budget,
                    description: job.description,
                    skills: job.skills,
                    status: "pending",
                    appliedAt: "Just now",
                };
                state.appliedPosts.unshift(appliedPost);
                saveDataToLocalStorage(state);
            }
        },
    },
});

// Export actions
export const {
    initializeData,
    resetToDefaults,
    addAppliedPost,
    updateAppliedPostStatus,
    addCurrentJob,
    updateJobProgress,
    completeJob,
    addJobPost,
    updateJobPost,
    deleteJobPost,
    addProposal,
    voteOnProposal,
    applyToJob,
} = dataSlice.actions;

// Export reducer
export default dataSlice.reducer;
