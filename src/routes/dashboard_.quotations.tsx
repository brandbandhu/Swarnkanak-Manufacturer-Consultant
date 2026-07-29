import { createFileRoute } from "@tanstack/react-router";
import { DashboardQuotationsPage } from "@/components/PortalPages";

export const Route = createFileRoute("/dashboard_/quotations")({ component: DashboardQuotationsPage });
