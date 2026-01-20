import { Calendar, Code, History, LayoutDashboard, Library, User } from "lucide-react"

export const NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Schedule", href: "/schedule", icon: Calendar },
    { label: "Interview Rounds", href: "/rounds", icon: Code },
    { label: "History", href: "/history", icon: History },
    { label: "Resources", href: "/resources", icon: Library },
    { label: "Profile", href: "/profile", icon: User },
]

export const USER_PROFILE = {
    name: "Alex Dev",
    email: "alex@example.com",
    role: "Frontend Engineer",
    avatar: "https://github.com/shadcn.png",
    bio: "Passionate about UI/UX and building scalable web apps.",
    goals: ["Master Next.js", "Improve System Design", "Crack MAANG Interview"],
    stats: {
        totalSessions: 12,
        averageScore: 82,
        hoursPracticed: 24,
        streakDays: 5
    }
}

export const UPCOMING_SESSIONS = [
    {
        id: "1",
        date: new Date(Date.now() + 86400000), // Tomorrow
        type: "Technical Round",
        duration: "60 min",
        interviewer: "AI Bot",
    },
    {
        id: "2",
        date: new Date(Date.now() + 172800000), // Day after tomorrow
        type: "Behavioral Round",
        duration: "45 min",
        interviewer: "AI Bot",
    },
]

export const PAST_SESSIONS = [
    {
        id: "101",
        date: "2023-10-15",
        type: "Machine Coding",
        score: 85,
        summary: "Strong problem solving, but code modularity can be improved.",
    },
    {
        id: "102",
        date: "2023-10-10",
        type: "HR Round",
        score: 92,
        summary: "Excellent communication and cultural fit answers.",
    },
    {
        id: "103",
        date: "2023-10-05",
        type: "Technical Round",
        score: 70,
        summary: "Struggled with dynamic programming concepts.",
    },
    {
        id: "104",
        date: "2023-09-28",
        type: "Behavioral Round",
        score: 88,
        summary: "Good STAR method usage.",
    },
    {
        id: "105",
        date: "2023-09-20",
        type: "Technical Round",
        score: 78,
        summary: "Solid basics, missed edge cases.",
    },
]

export const RESOURCES = [
    {
        title: "System Design Primer",
        category: "Technical",
        type: "Article",
        link: "#",
        description: "Learn how to design large-scale systems.",
    },
    {
        title: "Must-Know Data Structures",
        category: "Technical",
        type: "Video",
        link: "#",
        description: "Top 10 data structures every engineer should know.",
    },
    {
        title: "Mastering the STAR Method",
        category: "Behavioral",
        type: "Article",
        link: "#",
        description: "How to answer behavioral questions effectively.",
    },
    {
        title: "Mock Interview Checklist",
        category: "General",
        type: "Checklist",
        link: "#",
        description: "What to prepare before your interview.",
    },
]

export const ROUND_TYPES = [
    {
        id: "technical",
        title: "Technical Round",
        description: "Algorithm and Data Structure problems.",
        icon: Code,
    },
    {
        id: "machine-coding",
        title: "Machine Coding",
        description: "Build a small application or feature.",
        icon: LayoutDashboard,
    },
    {
        id: "behavioral",
        title: "Behavioral Round",
        description: "Leadership principles and culture fit.",
        icon: User,
    },
    {
        id: "hr",
        title: "HR Round",
        description: "General questions about experience and goals.",
        icon: History, // Reusing icon for now
    },
]
