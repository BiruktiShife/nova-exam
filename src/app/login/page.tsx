"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export default function SimpleLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (username === "Nova Exams" && password === "@novaHundaol1234") {
      console.log("✅ Login successful");

      // ✅ Save login flag in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loginTime", new Date().toISOString());

      // Redirect to admin page
      setTimeout(() => {
        router.push("/admin");
      }, 500);
    } else {
      console.log("❌ Invalid credentials");
      alert("Invalid username or password!");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-blue-50/40 to-muted/20 px-4">
      <Card className="w-full max-w-md border-0 shadow-xl bg-white/90 backdrop-blur-md">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Admin Login
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Please sign in to your account
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

        </CardContent>
      </Card>
    </main>
  );
}