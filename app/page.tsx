"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500); // Start fade-in after 1500ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-hidden bg-black">
      {/* Background image */}
      <Image
        src="/login.jpg"
        alt="Gym background"
        fill
        className="object-contain object-center"
        priority
      />

      {/* Main content */}
      <div className="flex-1 flex justify-center items-center px-4 py-8 relative z-10">
        {/* Login form with original card and fade-in animation */}
        <Card
          className={`w-full max-w-sm transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
          }`}
        >
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="link" asChild className="w-full">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
