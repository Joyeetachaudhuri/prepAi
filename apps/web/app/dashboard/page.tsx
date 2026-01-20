"use client"

import Link from "next/link"
import { ArrowRight, Calendar, Play, FileText, TrendingUp, Clock } from "lucide-react"

import { Button } from "@workspace/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/ui/card"
import { Progress } from "@workspace/ui/components/ui/progress"
import { UPCOMING_SESSIONS } from "@/lib/dummy-data"

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back! Here's an overview of your interview preparation.
                </p>
            </div>

            {/* Quick Stats/Progress */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                            +2 from last week
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">82%</div>
                        <p className="text-xs text-muted-foreground">
                            +5% improvement
                        </p>
                        <Progress value={82} className="mt-2 h-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Hours Practiced</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24h</div>
                        <p className="text-xs text-muted-foreground">
                            Across 1 month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Mock Hero</div>
                        <p className="text-xs text-muted-foreground">
                            3 more sessions
                        </p>
                        <Progress value={70} className="mt-2 h-2" />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Upcoming Sessions */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Upcoming Sessions</CardTitle>
                        <CardDescription>
                            You have {UPCOMING_SESSIONS.length} scheduled sessions coming up.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {UPCOMING_SESSIONS.map((session) => (
                                <div
                                    key={session.id}
                                    className="flex items-center justify-between rounded-lg border p-4"
                                >
                                    <div className="space-y-1">
                                        <p className="font-medium leading-none">{session.type}</p>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {session.date.toLocaleDateString()} at {session.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            Duration: {session.duration} • {session.interviewer}
                                        </div>
                                    </div>
                                    <Button size="sm" asChild>
                                        <Link href={`/interview/${session.id}`}>Start</Link>
                                    </Button>
                                </div>
                            ))}
                            {UPCOMING_SESSIONS.length === 0 && (
                                <div className="text-center text-muted-foreground py-8">
                                    No sessions scheduled.
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/schedule">Schedule New Session</Link>
                        </Button>
                    </CardFooter>
                </Card>

                {/* Quick Actions */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Start practicing or review your progress.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Button className="w-full justify-start" size="lg" asChild>
                            <Link href="/rounds">
                                <Play className="mr-2 h-4 w-4" /> Start Instant Mock Interview
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" size="lg" asChild>
                            <Link href="/schedule">
                                <Calendar className="mr-2 h-4 w-4" /> Schedule Session
                            </Link>
                        </Button>
                        <Button variant="secondary" className="w-full justify-start" size="lg" asChild>
                            <Link href="/history">
                                <FileText className="mr-2 h-4 w-4" /> View Reports
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
