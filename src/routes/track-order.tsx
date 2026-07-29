import { createFileRoute } from "@/lib/router-compat";
import { TrackOrderPage } from "@/components/PortalPages";

export const Route = createFileRoute("/track-order")({ component: TrackOrderPage });
