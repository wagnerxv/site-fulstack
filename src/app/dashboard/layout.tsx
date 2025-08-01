import SideBarDemo from "@/components/layout/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SideBarDemo>{children}</SideBarDemo>;
}
