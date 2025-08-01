/* eslint-disable @next/next/no-img-element */
import { LoginForm } from "@/components/layout/login-form";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    redirect("/dashboard");
  }
  return (
    <div className=" flex min-h-svh flex-col items-center justify-center bg-[url(/cover.png)] bg-cover xl:bg-auto p-6 md:p-10 relative bg-black bg-no-repeat">
      <div className="w-full max-w-sm md:max-w-3xl z-20">
        <LoginForm />
      </div>
    </div>
  );
}
