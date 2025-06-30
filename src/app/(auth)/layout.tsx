import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="font-lato flex items-center justify-center px-3.5 py-11 lg:h-[841px] lg:py-0">
      {children}
    </main>
  );
}
