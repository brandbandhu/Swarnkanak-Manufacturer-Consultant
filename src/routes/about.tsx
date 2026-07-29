import { createFileRoute } from "@/lib/router-compat";
import { AboutPage } from "@/components/PortalPages";

export const Route = createFileRoute("/about")({ component: AboutPage });
