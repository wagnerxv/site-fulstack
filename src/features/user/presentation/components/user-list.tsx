"use client";

import { useState } from "react";
import { api } from "@/igniter.client";
import { User } from "../../user.interface";
import { UserDialog } from "../components/user-dialog";
import { DeleteUserDialog } from "../components/delete-user-dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, Edit, Trash2, Calendar, Users } from "lucide-react";

export function UserList() {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all users (no search parameters)
  const {
    data: allUsers = [],
    loading,
    error,
  } = api.user.findMany.useQuery({
    refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  // Filter users on frontend based on search term
  const users = allUsers?.filter((user) =>
    searchTerm
      ? user.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-2">
              Erro ao carregar funcionários{error.code}
            </p>
            <Button onClick={() => window.location.reload()}>
              Tentar novamente
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Funcionários</h1>
          <p className="text-muted-foreground">
            Gerencie os funcionários do seu salão
          </p>
        </div>

        <UserDialog>
          <Button className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Funcionário
          </Button>
        </UserDialog>
      </div>

      {/* Search and filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Lista de Funcionários
          </CardTitle>
          <CardDescription>
            {loading
              ? "Carregando..."
              : `${users?.length || 0} funcionário(s) ${searchTerm ? `encontrado(s) para "${searchTerm}"` : "cadastrado(s)"}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search bar */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar funcionários..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                className="pl-8"
              />
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : !users || users.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">
                Nenhum funcionário encontrado
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm
                  ? `Nenhum funcionário encontrado para "${searchTerm}"`
                  : "Comece adicionando seu primeiro funcionário"}
              </p>
              {!searchTerm && (
                <UserDialog>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Primeiro Funcionário
                  </Button>
                </UserDialog>
              )}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Funcionário</TableHead>
                    <TableHead>Eventos</TableHead>
                    <TableHead>Cadastrado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((user: User) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={user.picturePath || undefined} />
                            <AvatarFallback>
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              ID: {user.id.slice(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.events && user.events.length > 0 ? (
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1 w-fit"
                          >
                            <Calendar className="h-3 w-3" />
                            {user.events.length} evento(s)
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Nenhum evento
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {formatDate(user.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <UserDialog defaultValues={user}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="cursor-pointer"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </UserDialog>

                          <DeleteUserDialog user={user}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 cursor-pointer hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DeleteUserDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
