"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setLoading(true);
      setError(null);
      const formData = new FormData(event.currentTarget);
      const response = await signIn("credentials", {
        ...Object.fromEntries(formData),
        redirect: false,
      });

      if (response?.error) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }

      // Exibe toast de sucesso
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6  md:px-8 md:py-20" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {" "}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
                <p className="text-muted-foreground text-balance">
                  Acesse sua conta do Salão Beleza
                </p>
              </div>{" "}
              <div className="grid gap-3">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="bg-accent-foreground/10"
                  required
                />
              </div>
              <div className="grid gap-3 ">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="sua senha"
                  required
                  className="bg-accent-foreground/10"
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm text-center">
                  Verifique o email e senha
                </div>
              )}
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/logo.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover "
            />
          </div>
        </CardContent>
      </Card>{" "}
      <div className="text-accent *:[a]:hover:text-accent/70 text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 dark:text-white dark:*:[a]:hover:text-white/70">
        Ao continuar, você concorda com nossos <a href="#">Termos de Serviço</a>{" "}
        e <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  );
}
