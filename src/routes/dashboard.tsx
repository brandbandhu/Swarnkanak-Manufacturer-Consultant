import { createFileRoute } from "@/lib/router-compat";
import { DashboardPage } from "@/components/PortalPages";

export const Route = createFileRoute("/dashboard")({ component: DashboardPage });
