"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Plus } from "lucide-react"

import { Button } from "@workspace/ui/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@workspace/ui/components/ui/form"
import { Input } from "@workspace/ui/components/ui/input"
import { Textarea } from "@workspace/ui/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/ui/card"

const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters."),
    category: z.string().min(1, "Please select a category."),
    description: z.string().min(10, "Description must be at least 10 characters."),
    instructions: z.string().optional(),
})

export default function CustomRoundPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        // @ts-ignore
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        alert("Custom Round Created! (Simulated)")
        form.reset()
    }

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Create Custom Round</h1>
                <p className="text-muted-foreground">
                    Design a specific interview scenario tailored to your needs.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Round Details</CardTitle>
                    <CardDescription>Define the parameters of your custom session.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Round Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Senior React Developer Interview" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select logic type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="technical">Technical</SelectItem>
                                                <SelectItem value="behavioral">Behavioral</SelectItem>
                                                <SelectItem value="system-design">System Design</SelectItem>
                                                <SelectItem value="mixed">Mixed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe what this round focuses on..."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="instructions"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>AI Instructions (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Specific instructions for the AI interviewer (e.g., 'Be very strict about time complexity')."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Customize how the AI should behave during this round.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full">
                                <Plus className="mr-2 h-4 w-4" /> Create Round
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
