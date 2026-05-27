// routes/index.tsx

import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { PendingOffersTable } from "@/components/dashboard/PendingOffersTable";
import { RecentActivityCard } from "@/components/dashboard/RecentActivity";
import { OfferFunnel } from "@/components/dashboard/OfferFunnel";
import { ViewAllOffers } from "@/components/dashboard/ViewAllOffers";
import { SidebarProvider } from "@/components/dashboard/layout-context";

export const Route = createFileRoute("/")({
  component: OffersPage,
});

function OffersPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-[#f4f7fb]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Topbar */}
          <Topbar />

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6 p-6">
              {/* KPI Cards */}
              <KpiCards />

              {/* Pending Offers */}
              <PendingOffersTable />

              {/* Recent Activity + Offer Funnel — side by side */}
              <div className="grid grid-cols-2 gap-6">
                <RecentActivityCard />
                <OfferFunnel />
              </div>

              {/* View All Offers */}
              <ViewAllOffers />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}