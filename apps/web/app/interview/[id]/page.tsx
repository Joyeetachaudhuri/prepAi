"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import {
    Mic, MicOff, Video, VideoOff,
    PhoneOff, Monitor, Layout,
    MessageSquare, Settings, ChevronUp,
    MoreVertical, Code as CodeIcon
} from "lucide-react"

import { Button } from "@workspace/ui/components/ui/button"
import { Card } from "@workspace/ui/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/ui/avatar"
import { Separator } from "@workspace/ui/components/ui/separator"
import { Badge } from "@workspace/ui/components/ui/badge"
import { Textarea } from "@workspace/ui/components/ui/textarea"
import { useMediaStream } from "@/hooks/use-media-stream"
import { cn } from "@workspace/ui/lib/utils"

export default function InterviewPage() {
    const params = useParams()
    const router = useRouter()
    const { stream, isMicOn, isCameraOn, toggleMic, toggleCamera } = useMediaStream()

    // UI State
    const [currentTime, setCurrentTime] = React.useState(new Date())
    const [timeLeft, setTimeLeft] = React.useState(45 * 60) // 45 minutes
    const [activeTab, setActiveTab] = React.useState<"code" | "notes">("code")

    const userVideoRef = React.useRef<HTMLVideoElement>(null)

    // Sync stream to video element
    React.useEffect(() => {
        if (userVideoRef.current && stream) {
            userVideoRef.current.srcObject = stream
        }
    }, [stream])

    // Clock & Timer
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date())
            setTimeLeft(prev => Math.max(0, prev - 1))
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const formatTimer = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    const handleEndCall = () => {
        if (confirm("End the interview session?")) {
            router.push(`/history/${params.id || "1"}`)
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-zinc-950 text-zinc-100 overflow-hidden">
            {/* Main Stage Area */}
            <div className="flex-1 flex gap-4 p-4 overflow-hidden relative">

                {/* Left Panel: Video Grid */}
                <div className="flex flex-col gap-4 w-1/4 min-w-[300px]">
                    {/* AI Video Tile */}
                    <div className="relative flex-1 bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl group">
                        {/* Fake "Speaking" or "Listening" AI Visual */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900/40 to-purple-900/40">
                            <div className="relative">
                                <Avatar className="h-32 w-32 border-4 border-indigo-500/30">
                                    <AvatarImage src="/ai-avatar.png" />
                                    <AvatarFallback className="bg-indigo-950 text-indigo-200 text-4xl">AI</AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-2 -right-2 bg-green-500 h-6 w-6 rounded-full border-4 border-zinc-900 animate-pulse" />
                            </div>
                            <div className="mt-6 flex flex-col items-center gap-2">
                                <div className="flex gap-1 h-6 items-center">
                                    <span className="w-1 h-2 bg-indigo-400 rounded-full animate-[bounce_1s_infinite_100ms]" />
                                    <span className="w-1 h-4 bg-indigo-400 rounded-full animate-[bounce_1s_infinite_200ms]" />
                                    <span className="w-1 h-3 bg-indigo-400 rounded-full animate-[bounce_1s_infinite_150ms]" />
                                    <span className="w-1 h-5 bg-indigo-400 rounded-full animate-[bounce_1s_infinite]" />
                                    <span className="w-1 h-3 bg-indigo-400 rounded-full animate-[bounce_1s_infinite_300ms]" />
                                </div>
                                <p className="text-indigo-200 font-medium text-sm">Interviewer is speaking...</p>
                            </div>
                        </div>
                        <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-md text-sm font-medium backdrop-blur-sm">
                            Mock Interviewer (AI)
                        </div>
                    </div>

                    {/* User Video Tile */}
                    <div className="relative flex-1 bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl group">
                        {stream ? (
                            <video
                                ref={userVideoRef}
                                autoPlay
                                playsInline
                                muted
                                className={cn("w-full h-full object-cover transform scale-x-[-1]", !isCameraOn && "hidden")}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                                <p className="text-zinc-500 text-sm">Camera starting...</p>
                            </div>
                        )}

                        {!isCameraOn && (
                            <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                                <Avatar className="h-24 w-24">
                                    <AvatarFallback>ME</AvatarFallback>
                                </Avatar>
                            </div>
                        )}

                        <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-md text-sm font-medium backdrop-blur-sm flex items-center gap-2">
                            You
                            {!isMicOn && <MicOff className="h-3 w-3 text-red-500" />}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Workspace (Code/Question) */}
                <div className="flex-1 bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col overflow-hidden shadow-2xl">
                    {/* Workspace Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900">
                        <div className="flex items-center gap-1 bg-zinc-950/50 p-1 rounded-lg">
                            <Button
                                size="sm"
                                variant={activeTab === "code" ? "secondary" : "ghost"}
                                onClick={() => setActiveTab("code")}
                                className="h-7 text-xs"
                            >
                                <CodeIcon className="mr-2 h-3 w-3" /> Code
                            </Button>
                            <Button
                                size="sm"
                                variant={activeTab === "notes" ? "secondary" : "ghost"}
                                onClick={() => setActiveTab("notes")}
                                className="h-7 text-xs"
                            >
                                <MessageSquare className="mr-2 h-3 w-3" /> Problem
                            </Button>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20 gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                {formatTimer(timeLeft)}
                            </Badge>
                        </div>
                    </div>

                    {/* Workspace Content */}
                    <div className="flex-1 p-0 bg-zinc-950 font-mono text-sm relative">
                        {activeTab === "code" ? (
                            <Textarea
                                className="w-full h-full resize-none bg-transparent border-0 text-zinc-300 p-6 focus-visible:ring-0 leading-relaxed active:border-0"
                                placeholder="// Write your solution here..."
                                spellCheck={false}
                            />
                        ) : (
                            <div className="p-8 text-zinc-300 prose prose-invert overflow-auto h-full">
                                <h2>Reverse a Linked List</h2>
                                <p>Given the head of a singly linked list, reverse the list, and return the reversed list.</p>
                                <h3>Example 1:</h3>
                                <pre className="bg-zinc-900 p-4 rounded-lg">Input: head = [1,2,3,4,5]{"\n"}Output: [5,4,3,2,1]</pre>
                                <h3>Constraints:</h3>
                                <ul>
                                    <li>Number of nodes is [0, 5000]</li>
                                    <li>-5000 &lt;= Node.val &lt;= 5000</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Control Bar */}
            <div className="h-20 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between px-6 z-50">
                {/* Left: Meeting Info */}
                <div className="flex-1 flex flex-col justify-center min-w-0">
                    <span className="font-semibold text-sm truncate">Technical Interview: {params.id}</span>
                    <span className="text-xs text-zinc-500 truncate">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | mocks-abc-xyz</span>
                </div>

                {/* Center: Main Controls */}
                <div className="flex items-center gap-3">
                    <Button
                        variant={isMicOn ? "secondary" : "destructive"}
                        size="icon"
                        className={cn("h-12 w-12 rounded-full transition-all", !isMicOn && "ring-4 ring-red-500/20")}
                        onClick={toggleMic}
                    >
                        {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                    </Button>
                    <Button
                        variant={isCameraOn ? "secondary" : "destructive"}
                        size="icon"
                        className={cn("h-12 w-12 rounded-full transition-all", !isCameraOn && "ring-4 ring-red-500/20")}
                        onClick={toggleCamera}
                    >
                        {isCameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                    </Button>

                    <div className="w-px h-8 bg-zinc-800 mx-2" />

                    {/* <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-zinc-400 hover:text-white">
                        <Monitor className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-zinc-400 hover:text-white">
                        <Layout className="h-5 w-5" />
                    </Button> */}

                    <Button
                        variant="destructive"
                        size="lg"
                        className="px-8 rounded-full ml-2 font-semibold bg-red-600 hover:bg-red-700"
                        onClick={handleEndCall}
                    >
                        <PhoneOff className="mr-2 h-5 w-5" /> End Call
                    </Button>
                </div>

                {/* Right: Secondary Actions */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-zinc-400">
                        <ChevronUp className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-zinc-400">
                        <MoreVertical className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
