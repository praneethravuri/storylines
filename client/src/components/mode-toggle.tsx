import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "./theme-provider"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()
    const [currentTheme, setCurrentTheme] = useState(theme)

    useEffect(() => {
        setCurrentTheme(theme)
    }, [theme])

    const toggleTheme = () => {
        const newTheme = currentTheme === "dark" ? "light" : "dark"
        setTheme(newTheme)
        setCurrentTheme(newTheme)
    }

    return (
        <Button variant="custom" className="!bg-transparent"  size="icon" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}