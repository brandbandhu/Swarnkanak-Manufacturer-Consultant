import { createFileRoute } from "@/lib/router-compat";
import { OffersPage } from "@/components/PortalPages";

export const Route = createFileRoute("/offers")({ component: OffersPage });
