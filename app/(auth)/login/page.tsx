'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {

    const {updateUser} = useAuth()
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e:any) => {
        e.preventDefault()
        console.log("Submitted")
        console.log(username, password)

        try {
            
            // Call login API route
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            if (!response.ok) {
                throw new Error('Login failed')
            }

            // // After successful login, fetch user data
            // const userData = await fetch('/api/auth/user', {
            //     credentials: 'include'
            // }).then(res => res.json())

            // // Update auth context
            // updateUser(userData)

            
                    // Instead of decoding client-side, refresh the page
        // This will trigger a server-side render which will
        // decode the token and set up the auth context
        router.refresh()
        router.push('/dashboard')

            // // Redirect to dashboard
            // router.push('/dashboard')
        } catch (error) {
            
        }

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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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