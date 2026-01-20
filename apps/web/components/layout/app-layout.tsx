"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Moon, Sun, ChevronLeft, ChevronRight, LogOut, User as UserIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@workspace/ui/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@workspace/ui/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@workspace/ui/components/ui/dropdown-menu"
import { NAV_ITEMS, USER_PROFILE } from "@/lib/dummy-data"
import { cn } from "@workspace/ui/lib/utils"

export function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { setTheme, theme } = useTheme()
    const [isCollapsed, setIsCollapsed] = React.useState(false)
    const [isLogoHovered, setIsLogoHovered] = React.useState(false)

    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-muted/20">
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden relative flex-col border-r bg-background transition-all duration-300 md:flex",
                    isCollapsed ? "w-16" : "w-64"
                )}
            >
                <div
                    className={cn(
                        "flex items-center h-16 px-4 cursor-pointer hover:bg-muted/50 transition-colors",
                        isCollapsed ? "justify-center" : "gap-2"
                    )}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    onMouseEnter={() => setIsLogoHovered(true)}
                    onMouseLeave={() => setIsLogoHovered(false)}
                    title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    <div className="h-8 w-8 shrink-0 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg transition-all duration-300">
                        {isLogoHovered ? (
                            isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />
                        ) : (
                            "MI"
                        )}
                    </div>
                    {!isCollapsed && (
                        <span className="text-xl font-bold truncate">MockIV</span>
                    )}
                </div>

                <nav className="flex flex-1 flex-col gap-2 px-2">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-secondary text-foreground"
                                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                                    isCollapsed && "justify-center px-2"
                                )}
                                title={isCollapsed ? item.label : undefined}
                            >
                                <item.icon className="h-4 w-4 shrink-0" />
                                {!isCollapsed && <span>{item.label}</span>}
                            </Link>
                        )
                    })}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Unified Header (Navbar) */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 shadow-sm md:px-6">
                    <div className="flex items-center gap-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[240px] px-0">
                                <div className="mb-8 flex items-center gap-2 px-6 py-4">
                                    <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                                        MI
                                    </div>
                                    <span className="text-xl font-bold">MockInterviewer</span>
                                </div>
                                <nav className="flex flex-col gap-1 px-2">
                                    {NAV_ITEMS.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                                pathname === item.href
                                                    ? "bg-secondary text-foreground"
                                                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                            )}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <h1 className="text-lg font-semibold md:hidden">MockInterviewer</h1>
                    </div>

                    {/* Right Side: Theme & Profile */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle Theme</span>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={USER_PROFILE.avatar} alt={USER_PROFILE.name} />
                                        <AvatarFallback>AD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{USER_PROFILE.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {USER_PROFILE.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile">
                                        <UserIcon className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                                    <Sun className="mr-2 h-4 w-4 dark:hidden" />
                                    <Moon className="mr-2 h-4 w-4 hidden dark:block" />
                                    <span>Toggle Theme</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
