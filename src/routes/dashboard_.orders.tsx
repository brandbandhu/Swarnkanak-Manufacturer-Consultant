import { createFileRoute } from "@tanstack/react-router";
import { DashboardOrdersPage } from "@/components/PortalPages";

export const Route = createFileRoute("/dashboard_/orders")({ component: DashboardOrdersPage });
