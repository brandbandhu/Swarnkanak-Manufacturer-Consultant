import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="mt-16 bg-charcoal text-charcoal-foreground">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-10 place-items-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground">S</span>
            <span className="font-display text-lg font-bold">Swarnkanak</span>
          </div>
          <p className="mt-4 text-sm text-charcoal-foreground/80">
            Swarnkanak Manufacturer &amp; Consultant designs, manufactures and supplies agricultural
            machinery and implements for farmers, dealers and agri-businesses across India, backed by
            expert consultation and a dependable service network.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media profile"
                className="grid size-9 place-items-center rounded-md bg-charcoal-foreground/10 transition-colors hover:bg-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide">Product Categories</h4>
          <ul className="mt-4 space-y-2 text-sm text-charcoal-foreground/80">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to="/products" search={{ category: c.name }} className="hover:text-primary">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-1">
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-charcoal-foreground/80">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/offers" className="hover:text-primary">Offers</Link></li>
              <li><Link to="/events" className="hover:text-primary">Events</Link></li>
              <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
              <li><Link to="/blog" className="hover:text-primary">Knowledge Hub</Link></li>
              <li><Link to="/dealer-enquiry" className="hover:text-primary">Dealer Enquiry</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide">Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-charcoal-foreground/80">
              <li><Link to="/track-order" className="hover:text-primary">Track Order</Link></li>
              <li><Link to="/warranty" className="hover:text-primary">Warranty Information</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-primary">Shipping Policy</Link></li>
              <li><Link to="/return-policy" className="hover:text-primary">Return &amp; Cancellation</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide">Get in Touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-charcoal-foreground/80">
            <li className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /> Plot 42, MIDC Industrial Area, Sinnar, Nashik, Maharashtra 422103</li>
            <li className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0 text-primary" /> +91 99999 00000</li>
            <li className="flex gap-2"><Mail className="mt-0.5 size-4 shrink-0 text-primary" /> care@swarnkanak.in</li>
          </ul>
          <form
            className="mt-5 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget as HTMLFormElement).reset();
              toast.success("Subscribed to the Swarnkanak newsletter");
            }}
          >
            <Input type="email" required placeholder="Your email" aria-label="Newsletter email" className="bg-card text-foreground" />
            <Button type="submit">Join</Button>
          </form>
        </div>
      </div>

      <div className="border-t border-charcoal-foreground/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-charcoal-foreground/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Swarnkanak Manufacturer &amp; Consultant. All rights reserved.</p>
          <p>Demo portal build — replace demo credentials before production deployment.</p>
        </div>
      </div>
    </footer>
  );
}
