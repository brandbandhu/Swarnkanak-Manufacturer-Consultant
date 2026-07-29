import { createFileRoute } from "@/lib/router-compat";
import { DashboardQuotationsPage } from "@/components/PortalPages";

export const Route = createFileRoute("/dashboard_/quotations")({
  component: DashboardQuotationsPage,
});
