import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import Link from 'next/link';

const page = () => {
  return (
<div className="flex items-center justify-center h-screen bg-background">
      <Card className="w-[500px]">
        <CardHeader className="space-y-1">
          <CardTitle className="heading-secondary">Sign in</CardTitle>
          <CardDescription className="paragraph-secondary">
            Choose your preferred sign-in method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button variant="outline" className="btn btn-outline">
            <Mail className="mr-2 icon-secondary" />
            Google
          </Button>
          <Button variant="outline" className="btn btn-outline">
            <Github className="mr-2 icon-secondary" />
            Github
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-center text-base text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 nav-link text-base">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 nav-link text-base">
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default page