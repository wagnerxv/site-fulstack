"use client";

import { useRef } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { api, useQueryClient } from "@/igniter.client";
import { useFormWithZod } from "@/hooks/use-form-with-zod";
import { tryCatch } from "@/lib/utils";
import { User } from "../../user.interface";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User as UserIcon, Upload } from "lucide-react";

// Form validation schema
const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  picturePath: z.string().nullable().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserDialogProps {
  defaultValues?: User;
  children: React.ReactNode;
}

export function UserDialog({ defaultValues, children }: UserDialogProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // API mutations
  const createMutation = api.user.create.useMutation();
  const updateMutation = api.user.update.useMutation();

  const isEditing = !!defaultValues?.id;

  // Form setup with Zod validation
  const form = useFormWithZod({
    schema: userSchema,
    defaultValues: defaultValues || {
      name: "",
      picturePath: null,
    },
    onSubmit: async (values: UserFormValues) => {
      try {
        let result;

        if (isEditing && values.id) {
          // Update existing user
          result = await tryCatch(
            updateMutation.mutate({
              params: { id: values.id },
              body: {
                name: values.name,
                picturePath: values.picturePath,
              },
            })
          );
        } else {
          // Create new user
          result = await tryCatch(
            createMutation.mutate({
              body: {
                name: values.name,
                picturePath: values.picturePath,
              },
            })
          );
        }

        if (result.error) {
          toast.error(
            isEditing
              ? "Erro ao atualizar funcionário. Tente novamente."
              : "Erro ao criar funcionário. Tente novamente."
          );
          return;
        }

        toast.success(
          isEditing
            ? "Funcionário atualizado com sucesso!"
            : "Funcionário criado com sucesso!"
        );

        // Invalidate queries to refetch data
        queryClient.invalidate(["user.findMany"]);

        // Reset form and close dialog
        form.reset();
        triggerRef.current?.click();
      } catch (error) {
        toast.error("Erro inesperado. Tente novamente.");
        console.error("User form submission error:", error);
      }
    },
  });

  const isSubmitting = createMutation.loading || updateMutation.loading;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div ref={triggerRef}>{children}</div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            {isEditing ? "Editar Funcionário" : "Adicionar Funcionário"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.onSubmit} className="space-y-6">
            {/* Avatar Preview */}
            {(form.watch("picturePath") || form.watch("name")) && (
              <div className="flex justify-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={form.watch("picturePath") || undefined} />
                  <AvatarFallback className="text-lg">
                    {form.watch("name")
                      ? getInitials(form.watch("name"))
                      : "FU"}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Funcionário</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome completo..."
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Picture Path Field */}
            <FormField
              control={form.control}
              name="picturePath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto do Perfil (URL)</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="https://exemplo.com/foto.jpg"
                        {...field}
                        value={field.value || ""}
                        disabled={isSubmitting}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        disabled={isSubmitting}
                        onClick={() => {
                          // Future: implement file upload
                          toast.info(
                            "Upload de arquivo será implementado em breve"
                          );
                        }}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Form Actions */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => triggerRef.current?.click()}
                disabled={isSubmitting}
                className="cursor-pointer"
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting || !form.formState.isValid}
                className="cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? "Atualizando..." : "Criando..."}
                  </>
                ) : (
                  <>{isEditing ? "Atualizar" : "Criar"} Funcionário</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
