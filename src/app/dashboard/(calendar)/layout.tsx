import { CalendarProvider } from "@/calendar/contexts/calendar-context";

// import { Header } from "@/components/layout/header";
import { api } from "@/igniter.client";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [events, users] = await Promise.all([
    api.event.findMany.query(),
    api.user.findMany.query(),
  ]);
  console.log("Eventos", events.data);
  console.log("Usuários", users.data);
  // const events = await api.event.findMany.query();
  // const users = await api.user.findMany.query();
  if (!events.data || !users.data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <CalendarProvider users={users.data} events={events.data}>
      {/* <Header /> */}
      {children}
    </CalendarProvider>
  );
}
