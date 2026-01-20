"use client"

import { Mail, Briefcase, Zap, Trophy, Flame } from "lucide-react"
import { useTheme } from "next-themes"

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/ui/avatar"
import { Button } from "@workspace/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/ui/card"
import { Badge } from "@workspace/ui/components/ui/badge"
import { Separator } from "@workspace/ui/components/ui/separator"
import { USER_PROFILE } from "@/lib/dummy-data"

export default function ProfilePage() {
    const { setTheme, theme } = useTheme()
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Profile Sidebar */}
                <Card className="w-full md:w-80">
                    <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={USER_PROFILE.avatar} />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-bold">{USER_PROFILE.name}</h2>
                            <p className="text-sm text-muted-foreground">{USER_PROFILE.role}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            <Mail className="h-3.5 w-3.5" />
                            {USER_PROFILE.email}
                        </div>

                        <Separator />

                        <div className="w-full space-y-2 text-left">
                            <h3 className="text-sm font-semibold">Goals</h3>
                            <div className="flex flex-wrap gap-2">
                                {USER_PROFILE.goals.map(goal => (
                                    <Badge key={goal} variant="secondary" className="text-xs font-normal">
                                        {goal}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <Button className="w-full" variant="outline">Edit Profile</Button>
                    </CardContent>
                </Card>

                {/* Main Content */}
                <div className="flex-1 space-y-6 w-full">
                    <h2 className="text-3xl font-bold">Overview</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="pt-6 flex flex-col items-center justify-center space-y-2">
                                <Trophy className="h-8 w-8 text-yellow-500" />
                                <div className="text-2xl font-bold">{USER_PROFILE.stats.totalSessions}</div>
                                <p className="text-xs text-muted-foreground">Sessions Completed</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 flex flex-col items-center justify-center space-y-2">
                                <Zap className="h-8 w-8 text-blue-500" />
                                <div className="text-2xl font-bold">{USER_PROFILE.stats.averageScore}%</div>
                                <p className="text-xs text-muted-foreground">Avg. Score</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 flex flex-col items-center justify-center space-y-2">
                                <Briefcase className="h-8 w-8 text-green-500" />
                                <div className="text-2xl font-bold">{USER_PROFILE.stats.hoursPracticed}h</div>
                                <p className="text-xs text-muted-foreground">Hours Practiced</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 flex flex-col items-center justify-center space-y-2">
                                <Flame className="h-8 w-8 text-orange-500" />
                                <div className="text-2xl font-bold">{USER_PROFILE.stats.streakDays}</div>
                                <p className="text-xs text-muted-foreground">Day Streak</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Your latest achievements and sessions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                            <Trophy className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Earned "Mock Master" Badge</p>
                                            <p className="text-xs text-muted-foreground">Completed 10 Technical Rounds with &gt;80% score.</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">2 days ago</span>
                                </div>
                                <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                            <Briefcase className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Completed Behavioral Round</p>
                                            <p className="text-xs text-muted-foreground">Score: 92/100</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">5 days ago</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>Customize how the application looks.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-4">
                                <Button variant="outline" onClick={() => setTheme("light")} className={theme === "light" ? "border-primary" : ""}>
                                    Light
                                </Button>
                                <Button variant="outline" onClick={() => setTheme("dark")} className={theme === "dark" ? "border-primary" : ""}>
                                    Dark
                                </Button>
                                <Button variant="outline" onClick={() => setTheme("system")} className={theme === "system" ? "border-primary" : ""}>
                                    System
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
