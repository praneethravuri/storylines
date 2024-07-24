import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, LogIn } from "lucide-react";
import Link from 'next/link';

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary overflow-hidden relative">
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(255,0,255,0.1),transparent)]"></div>
      <Card className="w-[400px] bg-background/80 backdrop-blur-lg border-none shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Welcome</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button variant="outline" className="bg-background hover:bg-secondary/80 transition-all duration-300 flex items-center justify-center space-x-2 h-12">
            <Github className="w-5 h-5" />
            <span>Continue with GitHub</span>
          </Button>
          <Button variant="outline" className="bg-background hover:bg-secondary/80 transition-all duration-300 flex items-center justify-center space-x-2 h-12">
            <LogIn className="w-5 h-5" />
            <span>Continue with Google</span>
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground px-8">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary transition-colors">
              Privacy Policy
            </Link>.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page;