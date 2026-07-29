import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/PortalPages";

export const Route = createFileRoute("/dashboard")({ component: DashboardPage });
