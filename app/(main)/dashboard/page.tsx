'use client'

import { useAuth } from "@/context/auth"


export default function Page() {

  const {user} = useAuth();

  return (
    <div className="font-semibold text-2xl bg-gray-200 ">
      This is a protected route 🔒
      <div>username : {user?.username} </div>
      <div>first_name : {user?.first_name} </div>
      <div>user_type : {user?.user_type} </div>
    </div>
  )
}
