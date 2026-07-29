import { createFileRoute } from "@tanstack/react-router";
import { EventsPage } from "@/components/PortalPages";

export const Route = createFileRoute("/events")({ component: EventsPage });
