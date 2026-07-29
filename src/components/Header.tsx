import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Search, ShoppingCart, Heart, User, Menu, Phone, Mail, ChevronDown, Truck, LogOut,
  LayoutDashboard, Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CATEGORIES } from "@/lib/catalog";
import { useStore } from "@/lib/store";

const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Offers", to: "/offers" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const { cartCount, wishlist, user, logout } = useStore();
  const [q, setQ] = useState("");
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/products", search: { q: q || undefined } });
    setMobile(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-charcoal text-charcoal-foreground">
        <div className="container-x flex h-9 items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <a href="tel:+919999900000" className="flex items-center gap-1.5 hover:text-primary">
              <Phone className="size-3.5" /> +91 99999 00000
            </a>
            <a href="mailto:care@swarnkanak.in" className="hidden items-center gap-1.5 hover:text-primary sm:flex">
              <Mail className="size-3.5" /> care@swarnkanak.in
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dealer-enquiry" className="hover:text-primary">Become a Dealer</Link>
            <Link to="/track-order" className="hidden items-center gap-1.5 hover:text-primary sm:flex">
              <Truck className="size-3.5" /> Track Order
            </Link>
            <span className="hidden text-charcoal-foreground/70 md:inline">EN / हिंदी</span>
          </div>
        </div>
      </div>

      <div className="border-b bg-card">
        <div className="container-x flex h-16 items-center gap-3 md:h-20 md:gap-6">
          <Sheet open={mobile} onOpenChange={setMobile}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto">
              <SheetTitle className="px-4 pt-4 font-display">Menu</SheetTitle>
              <nav className="flex flex-col gap-1 p-4">
                {NAV.map((n) => (
                  <Link key={n.to} to={n.to} onClick={() => setMobile(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
                    {n.label}
                  </Link>
                ))}
                <div className="mt-2 border-t pt-2">
                  <p className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">Categories</p>
                  {CATEGORIES.map((c) => (
                    <Link key={c.id} to="/products" search={{ category: c.name }} onClick={() => setMobile(false)} className="block rounded-md px-3 py-2 text-sm hover:bg-muted">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2" aria-label="Swarnkanak home">
            <span className="grid size-10 place-items-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground">S</span>
            <span className="leading-tight">
              <span className="block font-display text-base font-bold md:text-lg">Swarnkanak</span>
              <span className="block text-[10px] uppercase tracking-wider text-muted-foreground md:text-[11px]">
                Manufacturer &amp; Consultant
              </span>
            </span>
          </Link>

          <form onSubmit={search} className="ml-auto hidden max-w-md flex-1 md:block">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search rotavator, baler, trailer..."
                aria-label="Search products"
                className="pl-9"
              />
            </div>
          </form>

          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <Button variant="ghost" size="icon" asChild aria-label="Wishlist" className="relative">
              <Link to="/dashboard/wishlist">
                <Heart className="size-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label="Cart" className="relative">
              <Link to="/cart">
                <ShoppingCart className="size-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="size-4" />
                    <span className="hidden max-w-24 truncate sm:inline">{user.fullName.split(" ")[0]}</span>
                    <ChevronDown className="size-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="truncate">{user.fullName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.role === "admin" ? (
                    <DropdownMenuItem asChild>
                      <Link to="/admin"><LayoutDashboard className="size-4" /> Admin Dashboard</Link>
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard"><LayoutDashboard className="size-4" /> My Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard/orders"><Package className="size-4" /> My Orders</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { logout(); navigate({ to: "/" }); }}>
                    <LogOut className="size-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" asChild className="hidden sm:inline-flex"><Link to="/login">Login</Link></Button>
                <Button asChild><Link to="/register">Register</Link></Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="hidden border-b bg-charcoal text-charcoal-foreground lg:block">
        <div className="container-x flex h-12 items-center gap-1">
          {NAV.map((n) =>
            n.label === "Products" ? (
              <div key={n.to} className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
                <Link
                  to="/products"
                  className="flex h-12 items-center gap-1 px-4 text-sm font-medium transition-colors hover:text-primary"
                >
                  Products <ChevronDown className="size-3.5" />
                </Link>
                {mega && (
                  <div className="fixed inset-x-0 top-[calc(2.25rem+5rem+3rem)] z-50 border-b bg-card text-foreground shadow-lift">
                    <div className="container-x grid grid-cols-4 gap-6 py-8">
                      {CATEGORIES.map((c) => (
                        <div key={c.id}>
                          <Link
                            to="/products"
                            search={{ category: c.name }}
                            className="font-display text-sm font-semibold hover:text-primary"
                          >
                            {c.name}
                          </Link>
                          <ul className="mt-2 space-y-1">
                            {c.subcategories.map((s) => (
                              <li key={s}>
                                <Link
                                  to="/products"
                                  search={{ category: c.name, sub: s }}
                                  className="text-sm text-muted-foreground hover:text-primary"
                                >
                                  {s}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={n.to} to={n.to} className="flex h-12 items-center px-4 text-sm font-medium transition-colors hover:text-primary">
                {n.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </header>
  );
}
