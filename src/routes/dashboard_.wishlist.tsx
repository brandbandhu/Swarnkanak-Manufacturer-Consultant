import { createFileRoute } from "@tanstack/react-router";
import { DashboardWishlistPage } from "@/components/PortalPages";

export const Route = createFileRoute("/dashboard_/wishlist")({ component: DashboardWishlistPage });
