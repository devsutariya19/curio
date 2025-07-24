import LoginForm from "@/components/login-form";


import {login} from "@/app/login/actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = await createClient();
  const {data, error} = await supabase.auth.getUser();
  const isAuthenticated = data.user !== null;
  if (error || !isAuthenticated) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-900">
        <div className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <LoginForm loginAction={login}/>
      </div>
    );
  } else {
    redirect('/docs');
  } 
}
