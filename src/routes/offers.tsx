import { createFileRoute } from "@tanstack/react-router";
import { OffersPage } from "@/components/PortalPages";

export const Route = createFileRoute("/offers")({ component: OffersPage });
