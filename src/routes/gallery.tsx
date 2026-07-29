import { createFileRoute } from "@/lib/router-compat";
import { GalleryPage } from "@/components/PortalPages";

export const Route = createFileRoute("/gallery")({ component: GalleryPage });
