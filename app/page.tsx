import { getDecodedUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function Home() {

  const user = getDecodedUser();

  if(user){
    redirect('/dashboard');
  }

  redirect('/login');



  return null
}
