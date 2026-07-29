import { createFileRoute } from "@/lib/router-compat";
import { BlogPage } from "@/components/PortalPages";

export const Route = createFileRoute("/blog")({ component: BlogPage });
