import { createFileRoute } from "@/lib/router-compat";
import { ContactPage } from "@/components/PortalPages";

export const Route = createFileRoute("/contact")({ component: ContactPage });
