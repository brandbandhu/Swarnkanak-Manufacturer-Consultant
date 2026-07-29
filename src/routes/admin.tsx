import { createFileRoute } from "@/lib/router-compat";
import { AdminPage } from "@/components/PortalPages";

export const Route = createFileRoute("/admin")({ component: AdminPage });
