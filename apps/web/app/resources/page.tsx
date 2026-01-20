"use client"

import { ExternalLink, FileText, Video } from "lucide-react"
import Link from "next/link"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@workspace/ui/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/ui/card"
import { Badge } from "@workspace/ui/components/ui/badge"
import { RESOURCES } from "@/lib/dummy-data"

export default function ResourcesPage() {
    // Group resources by category
    const categories = Array.from(new Set(RESOURCES.map(r => r.category)))

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Learning Resources</h1>
                <p className="text-muted-foreground">
                    Curated content to help you ace your interviews.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Library</CardTitle>
                    <CardDescription>Browse by category</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {categories.map((category) => (
                            <AccordionItem key={category} value={category}>
                                <AccordionTrigger className="text-lg font-medium">
                                    {category} Resources
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {RESOURCES.filter(r => r.category === category).map((resource, i) => (
                                            <div key={i} className="flex items-start justify-between rounded-lg border p-4 bg-muted/40 hover:bg-muted/60 transition-colors">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-semibold">{resource.title}</h4>
                                                        <Badge variant="outline" className="text-[10px]">{resource.type}</Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                                                </div>
                                                <Link href={resource.link} className="text-primary hover:text-primary/80">
                                                    <ExternalLink className="h-4 w-4" />
                                                    <span className="sr-only">Open</span>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
