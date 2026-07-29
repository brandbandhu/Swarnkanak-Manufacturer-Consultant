import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/PortalPages";

export const Route = createFileRoute("/gallery")({ component: GalleryPage });
