"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocial";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminOrLogin =
    pathname.startsWith("/admin") || pathname.startsWith("/login");

  if (isAdminOrLogin) {
    return <>{children}</>;
  }

  return (
    <>
      <FloatingSocials />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
