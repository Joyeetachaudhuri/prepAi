"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { CheckCircle2, XCircle, AlertTriangle, Lightbulb } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/ui/card"
import { Progress } from "@workspace/ui/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/ui/table"
import { Badge } from "@workspace/ui/components/ui/badge"
import { PAST_SESSIONS } from "@/lib/dummy-data"

export default function SessionReportPage() {
    const params = useParams()
    const id = params.id

    // Find session or default to first
    const session = PAST_SESSIONS.find(s => s.id === id) || PAST_SESSIONS[0]

    if (!session) {
        return <div>Session not found</div>
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Session Report</h1>
                <p className="text-muted-foreground">
                    Detailed analysis for {session.type} on {session.date}.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-primary">{session.score}/100</div>
                        <Progress value={session.score} className="mt-4 h-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Duration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45 min</div>
                        <p className="text-xs text-muted-foreground">Target: 45 min</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Top 15%</div>
                        <p className="text-xs text-muted-foreground">Compared to peers</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                        <CardTitle>SWOT Analysis</CardTitle>
                        <CardDescription>Strengths and areas for improvement.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4 p-3 bg-green-500/10 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-green-700 dark:text-green-400">Strengths</h4>
                                <ul className="text-sm text-muted-foreground list-disc pl-4 mt-1">
                                    <li>Clear communication of thought process.</li>
                                    <li>Efficient code structure.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-3 bg-red-500/10 rounded-lg">
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-red-700 dark:text-red-400">Weaknesses</h4>
                                <ul className="text-sm text-muted-foreground list-disc pl-4 mt-1">
                                    <li>Missed edge case with empty input.</li>
                                    <li>Time management on the second problem.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-3 bg-yellow-500/10 rounded-lg">
                            <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-yellow-700 dark:text-yellow-400">Opportunities</h4>
                                <ul className="text-sm text-muted-foreground list-disc pl-4 mt-1">
                                    <li>Review typical graph traversal patterns.</li>
                                    <li>Practice speaking while coding.</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                        <CardTitle>Behavioral Analysis</CardTitle>
                        <CardDescription>AI-driven insights on your soft skills.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Confidence (Voice)</span>
                                <span>85%</span>
                            </div>
                            <Progress value={85} />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Vocabulary & Fluency</span>
                                <span>78%</span>
                            </div>
                            <Progress value={78} />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Pacing</span>
                                <span>92%</span>
                            </div>
                            <Progress value={92} />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Eye Contact (Video)</span>
                                <span>60%</span>
                            </div>
                            <Progress value={60} className="bg-destructive/20 [&>div]:bg-destructive" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Question Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Problem / Topic</TableHead>
                                <TableHead>Time Taken</TableHead>
                                <TableHead>Score</TableHead>
                                <TableHead>Feedback</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Reverse Linked List</TableCell>
                                <TableCell>15 min</TableCell>
                                <TableCell><Badge>10/10</Badge></TableCell>
                                <TableCell className="text-muted-foreground">Perfect solution.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Binary Tree Depth</TableCell>
                                <TableCell>20 min</TableCell>
                                <TableCell><Badge variant="secondary">7/10</Badge></TableCell>
                                <TableCell className="text-muted-foreground">Minor syntax errors resolved quickly.</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
