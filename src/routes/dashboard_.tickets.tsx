import { createFileRoute } from "@tanstack/react-router";
import { DashboardTicketsPage } from "@/components/PortalPages";

export const Route = createFileRoute("/dashboard_/tickets")({ component: DashboardTicketsPage });
