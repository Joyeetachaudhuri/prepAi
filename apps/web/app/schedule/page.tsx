"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@workspace/ui/components/ui/button"
import { Calendar } from "@workspace/ui/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@workspace/ui/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@workspace/ui/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/ui/select"
import { cn } from "@workspace/ui/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/ui/card"
import { ROUND_TYPES } from "@/lib/dummy-data"

const formSchema = z.object({
    roundType: z.string().min(1, "Please select an interview round type."),
    date: z.date(),
    time: z.string().min(1, "Please select a time slot."),
})

export default function SchedulePage() {
    const form = useForm<z.infer<typeof formSchema>>({
        // @ts-ignore
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        alert("Session Scheduled! (Check console for data)")
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Schedule a Mock Interview</h1>
                <p className="text-muted-foreground">
                    Book a time for your next practice session.
                </p>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>New Session</CardTitle>
                    <CardDescription>Fill out the details below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="roundType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Round Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a round type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {ROUND_TYPES.map(type => (
                                                    <SelectItem key={type.id} value={type.id}>{type.title}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            This will determine the questions asked.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date < new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="time"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Time Slot</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select time" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="09:00">09:00 AM</SelectItem>
                                                    <SelectItem value="10:00">10:00 AM</SelectItem>
                                                    <SelectItem value="11:00">11:00 AM</SelectItem>
                                                    <SelectItem value="14:00">02:00 PM</SelectItem>
                                                    <SelectItem value="15:00">03:00 PM</SelectItem>
                                                    <SelectItem value="16:00">04:00 PM</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit">Schedule Session</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
