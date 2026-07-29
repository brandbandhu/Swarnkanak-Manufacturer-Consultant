import { createFileRoute } from "@/lib/router-compat";
import { DashboardOrdersPage } from "@/components/PortalPages";

export const Route = createFileRoute("/dashboard_/orders")({ component: DashboardOrdersPage });
