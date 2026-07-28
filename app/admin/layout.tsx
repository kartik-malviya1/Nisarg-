import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebarClient } from "./AdminSidebarClient";

export const metadata = {
  title: "Admin Panel — NISARG Foundation",
  description: "Admin panel for managing gallery content and contact inquiries",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <AdminSidebarClient user={session.user}>{children}</AdminSidebarClient>
  );
}
