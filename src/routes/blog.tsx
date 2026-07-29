import { createFileRoute } from "@tanstack/react-router";
import { BlogPage } from "@/components/PortalPages";

export const Route = createFileRoute("/blog")({ component: BlogPage });
