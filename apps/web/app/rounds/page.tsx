"use client"

import { Code, LayoutDashboard, User, Play, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@workspace/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/ui/tabs"
import { Badge } from "@workspace/ui/components/ui/badge"
import { ROUND_TYPES } from "@/lib/dummy-data"

const MOCK_PROBLEMS = [
    {
        id: "array-manipulation",
        title: "Array Manipulation",
        description: "Optimize an array sorting algorithm with constraints.",
        difficulty: "Medium",
        time: "45 min",
        type: "technical"
    },
    {
        id: "graph-traversal",
        title: "Graph Traversal",
        description: "Implement BFS for a disconnected graph.",
        difficulty: "Hard",
        time: "60 min",
        type: "technical"
    },
    {
        id: "string-reversal",
        title: "String Reversal",
        description: "Reverse a string in place without extra memory.",
        difficulty: "Easy",
        time: "30 min",
        type: "technical"
    }
]

export default function RoundsPage() {
    return (
        <div className="space-y-8">
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Interview Rounds</h1>
                        <p className="text-muted-foreground">
                            Select a specific interview round to practice.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/rounds/custom">Create Custom</Link>
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="technical" className="space-y-4">
                <TabsList>
                    {ROUND_TYPES.map(type => (
                        <TabsTrigger key={type.id} value={type.id}>{type.title}</TabsTrigger>
                    ))}
                </TabsList>

                {ROUND_TYPES.map(type => (
                    <TabsContent key={type.id} value={type.id} className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <type.icon className="h-6 w-6 text-primary" />
                                    {type.title}
                                </CardTitle>
                                <CardDescription>{type.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {type.id === "technical" ? (
                                        MOCK_PROBLEMS.map((problem) => (
                                            <Card key={problem.id} className="flex flex-col">
                                                <CardHeader>
                                                    <div className="flex justify-between items-start">
                                                        <Badge variant={problem.difficulty === "Hard" ? "destructive" : problem.difficulty === "Medium" ? "default" : "secondary"}>
                                                            {problem.difficulty}
                                                        </Badge>
                                                        <div className="flex items-center text-xs text-muted-foreground">
                                                            <Clock className="mr-1 h-3 w-3" />
                                                            {problem.time}
                                                        </div>
                                                    </div>
                                                    <CardTitle className="text-base mt-2">{problem.title}</CardTitle>
                                                    <CardDescription>{problem.description}</CardDescription>
                                                </CardHeader>
                                                <CardFooter className="mt-auto">
                                                    <Button className="w-full" asChild>
                                                        <Link href={`/interview/${problem.id}`}>
                                                            <Play className="mr-2 h-4 w-4" /> Start
                                                        </Link>
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-8 text-center text-muted-foreground">
                                            No mock problems available for this category yet.
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
