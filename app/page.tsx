import { getDecodedUser } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {

  const user = getDecodedUser();

  if(user){
    redirect('/dashboard');
  }

  redirect('/login');



  return null
}
