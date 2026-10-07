import type { Metadata } from "next";
import { AccountView } from "@/components/account-view";

export const metadata: Metadata = { title: "Račun" };

export default function AccountPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
      <AccountView />
    </main>
  );
}
