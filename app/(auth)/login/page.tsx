'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function LoginPage() {

    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e:any) => {
        e.preventDefault()
        console.log("Submitted")
        console.log(email, password)
        // TODO: Handle login
    }


  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your email and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" onClick={handleSubmit} className="w-full">
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}