'use client'

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth"
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Page() {

  const {user , updateUser} = useAuth();
  const router = useRouter()

  const handleLogout = async()=>{
    await fetch('/api/auth/logout', {
      method: 'POST',
    })

    updateUser(null)
    router.push('/')
  }

  return (
    <div className="font-semibold text-2xl bg-gray-200 ">
      This is a protected route 🔒
      <div>username : {user?.username} </div>
      <div>first_name : {user?.first_name} </div>
      <div>user_type : {user?.user_type} </div>


      <div>
        <Button
          onClick={handleLogout}
        >Logout</Button>
      </div>

      <ClientComponentFetch/>

    </div>
  )
}


const ClientComponentFetch = ()=>{

  const [profileData , setProfileData] = useState<any>(null)

  const fetchUserDetails = async()=>{
    // const res = await axiosInstance.get('/profile')
    console.log("making fetch call ")
    const res = await fetch('https://discussionapi.goreeva.com/api/profile' , {
      credentials : 'include'
    })
    const response = await res.json()
    setProfileData(response.data)
  }

  useEffect(()=>{
    fetchUserDetails()
  },[])

  return <div className="font-seminormal text-2xl bg-gray-200 ">
    Hello from client component
    <div>Topic Count : {profileData?.topicCount}</div> 
    <div>Response Count : {profileData?.responseCount}</div>
  </div>
}