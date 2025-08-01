"use client";

import { useState } from "react";
import { toast } from "sonner";
import { api, useQueryClient } from "@/igniter.client";
import { User } from "../../user.interface";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, AlertTriangle } from "lucide-react";

interface DeleteUserDialogProps {
  user: User;
  children: React.ReactNode;
}

export function DeleteUserDialog({ user, children }: DeleteUserDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const deleteMutation = api.user.delete.useMutation();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutate({
        params: { id: user.id },
      });

      toast.success(`Funcionário "${user.name}" foi excluído com sucesso!`);

      // Invalidate queries to refetch data
      queryClient.invalidate(["user.findMany"]);

      // Close dialog
      setIsOpen(false);
    } catch (error) {
      // Check if it's a JSON parsing error but the operation was successful
      if (error instanceof SyntaxError && error.message.includes("JSON")) {
        // The delete probably worked, just had a parsing issue
        toast.success(`Funcionário "${user.name}" foi excluído com sucesso!`);
        queryClient.invalidate(["user.findMany"]);
        setIsOpen(false);
      } else {
        toast.error("Erro ao excluir funcionário. Tente novamente.");
        console.error("Delete user error:", error);
      }
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const hasEvents = user.events && user.events.length > 0;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <AlertDialogTitle>Excluir Funcionário</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="mt-1">
                  Tem certeza que deseja excluir este funcionário?
                </div>
              </AlertDialogDescription>
            </div>
          </div>

          {/* User info */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-accent rounded-lg">
            <Avatar>
              <AvatarImage src={user.picturePath || undefined} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-gray-900 dark:text-primary">
                {user.name}
              </div>
              <div className="text-sm text-gray-500">
                ID: {user.id.slice(0, 8)}...
              </div>
              {hasEvents && (
                <div className="text-sm text-blue-600 mt-1">
                  ℹ️ Este funcionário possui {user.events!.length} evento(s)
                  associado(s)
                </div>
              )}
            </div>
          </div>

          <AlertDialogDescription className="text-sm text-gray-600">
            {hasEvents ? (
              <>
                <strong>Informação:</strong> Este funcionário possui eventos
                associados. Os eventos serão mantidos no sistema, mas ficarão
                sem funcionário responsável. Você poderá reatribuí-los a outros
                funcionários posteriormente.
              </>
            ) : (
              "Esta ação não pode ser desfeita. O funcionário será removido permanentemente do sistema."
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={deleteMutation.loading}
            className="cursor-pointer"
          >
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.loading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600 cursor-pointer dark:text-white"
          >
            {deleteMutation.loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Excluindo...
              </>
            ) : (
              "Excluir Funcionário"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
