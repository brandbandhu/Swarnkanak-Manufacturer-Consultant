import { createFileRoute } from "@/lib/router-compat";
import { DashboardWishlistPage } from "@/components/PortalPages";

export const Route = createFileRoute("/dashboard_/wishlist")({ component: DashboardWishlistPage });
