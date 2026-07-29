import { createFileRoute } from "@/lib/router-compat";
import { EventsPage } from "@/components/PortalPages";

export const Route = createFileRoute("/events")({ component: EventsPage });
