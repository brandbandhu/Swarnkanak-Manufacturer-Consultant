import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/PortalPages";

export const Route = createFileRoute("/admin")({ component: AdminPage });
