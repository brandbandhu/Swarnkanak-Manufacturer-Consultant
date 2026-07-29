import { createFileRoute } from "@tanstack/react-router";
import { TrackOrderPage } from "@/components/PortalPages";

export const Route = createFileRoute("/track-order")({ component: TrackOrderPage });
