import { Component, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/lib/store";
import { Link, useLocationSnapshot } from "@/lib/router-compat";
import { Route as HomeRoute } from "@/routes/index";
import { Route as AboutRoute } from "@/routes/about";
import { Route as AdminRoute } from "@/routes/admin";
import { Route as BlogRoute } from "@/routes/blog";
import { Route as CartRoute } from "@/routes/cart";
import { Route as CheckoutRoute } from "@/routes/checkout";
import { Route as ContactRoute } from "@/routes/contact";
import { Route as DashboardRoute } from "@/routes/dashboard";
import { Route as DashboardOrdersRoute } from "@/routes/dashboard_.orders";
import { Route as DashboardQuotationsRoute } from "@/routes/dashboard_.quotations";
import { Route as DashboardTicketsRoute } from "@/routes/dashboard_.tickets";
import { Route as DashboardWishlistRoute } from "@/routes/dashboard_.wishlist";
import { Route as DealerEnquiryRoute } from "@/routes/dealer-enquiry";
import { Route as EventsRoute } from "@/routes/events";
import { Route as ForgotPasswordRoute } from "@/routes/forgot-password";
import { Route as GalleryRoute } from "@/routes/gallery";
import { Route as LoginRoute } from "@/routes/login";
import { Route as OffersRoute } from "@/routes/offers";
import { Route as OrderSuccessRoute } from "@/routes/order-success";
import { Route as ProductsRoute } from "@/routes/products";
import { Route as ProductDetailRoute } from "@/routes/products_.$slug";
import { Route as RegisterRoute } from "@/routes/register";
import { Route as TrackOrderRoute } from "@/routes/track-order";

const routes = new Map<string, React.ComponentType | undefined>([
  ["/", HomeRoute.component],
  ["/about", AboutRoute.component],
  ["/admin", AdminRoute.component],
  ["/blog", BlogRoute.component],
  ["/cart", CartRoute.component],
  ["/checkout", CheckoutRoute.component],
  ["/contact", ContactRoute.component],
  ["/dashboard", DashboardRoute.component],
  ["/dashboard/orders", DashboardOrdersRoute.component],
  ["/dashboard/quotations", DashboardQuotationsRoute.component],
  ["/dashboard/tickets", DashboardTicketsRoute.component],
  ["/dashboard/wishlist", DashboardWishlistRoute.component],
  ["/dealer-enquiry", DealerEnquiryRoute.component],
  ["/events", EventsRoute.component],
  ["/forgot-password", ForgotPasswordRoute.component],
  ["/gallery", GalleryRoute.component],
  ["/login", LoginRoute.component],
  ["/offers", OffersRoute.component],
  ["/order-success", OrderSuccessRoute.component],
  ["/products", ProductsRoute.component],
  ["/register", RegisterRoute.component],
  ["/track-order", TrackOrderRoute.component],
]);

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <NotFoundPage />;
    }

    return this.props.children;
  }
}

function CurrentRoute() {
  useLocationSnapshot();
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  const Component =
    pathname.startsWith("/products/") && pathname.split("/").length === 3
      ? ProductDetailRoute.component
      : routes.get(pathname);

  if (!Component) return <NotFoundPage />;
  return <Component />;
}

export function App() {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <CurrentRoute />
        <Toaster position="top-right" richColors />
      </StoreProvider>
    </ErrorBoundary>
  );
}
