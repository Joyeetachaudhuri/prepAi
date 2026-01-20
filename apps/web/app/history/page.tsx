"use client"

import { FileText } from "lucide-react"
import Link from "next/link"

import { Button } from "@workspace/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/ui/table"
import { Badge } from "@workspace/ui/components/ui/badge"
import { PAST_SESSIONS } from "@/lib/dummy-data"

export default function HistoryPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Session History</h1>
                <p className="text-muted-foreground">
                    View detailed reports from your past interview sessions.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Completed Sessions</CardTitle>
                    <CardDescription>
                        You have completed {PAST_SESSIONS.length} sessions total.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Score</TableHead>
                                <TableHead>Summary</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {PAST_SESSIONS.map((session) => (
                                <TableRow key={session.id}>
                                    <TableCell className="font-medium">{session.date}</TableCell>
                                    <TableCell>{session.type}</TableCell>
                                    <TableCell>
                                        <Badge variant={session.score >= 80 ? "default" : session.score >= 70 ? "secondary" : "destructive"}>
                                            {session.score}%
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="max-w-[300px] truncate" title={session.summary}>
                                        {session.summary}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/history/${session.id}`}>
                                                View Report
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
