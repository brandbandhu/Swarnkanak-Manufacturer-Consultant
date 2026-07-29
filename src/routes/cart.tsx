import { createFileRoute, Link } from "@/lib/router-compat";
import { Trash2, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { SiteLayout, Breadcrumbs, PageHeading } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { formatINR } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart | Swarnkanak Machinery" },
      {
        name: "description",
        content:
          "Review your selected agricultural implements, apply coupons and proceed to secure checkout.",
      },
      { property: "og:title", content: "Shopping Cart | Swarnkanak" },
      {
        property: "og:description",
        content: "Review your agricultural machinery order before checkout.",
      },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartLines, cartSubtotal, setQty, removeFromCart, toggleWishlist } = useStore();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const tax = Math.round((cartSubtotal - discount) * 0.12);
  const shipping = cartSubtotal > 0 ? 4500 : 0;
  const total = cartSubtotal - discount + tax + shipping;

  return (
    <SiteLayout>
      <PageHeading
        title="Your Cart"
        subtitle="Review the implements you have selected before checkout."
      />
      <Breadcrumbs items={[{ label: "Cart" }]} />

      <div className="container-x py-10">
        {cartLines.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="font-display text-lg font-semibold">Your cart is empty</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Browse our machinery range and add implements to your cart.
              </p>
              <Button className="mt-5" asChild>
                <Link to="/products">Shop machinery</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1fr_340px] xl:gap-8">
            <div className="space-y-4">
              {cartLines.map(({ product, qty }) => (
                <Card key={product.id}>
                  <CardContent className="flex flex-col gap-4 p-4 md:flex-row">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="h-36 w-full rounded-md object-cover md:h-28 md:w-40"
                    />
                    <div className="flex-1">
                      <Link
                        to="/products/$slug"
                        params={{ slug: product.slug }}
                        className="font-display font-semibold hover:text-primary"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        SKU {product.sku} · {product.category}
                      </p>
                      <p className="mt-2 font-semibold">{formatINR(product.offerPrice)}</p>
                      <div className="mt-3 flex flex-col items-stretch gap-2 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center">
                        <div className="flex items-center rounded-md border">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Decrease"
                            onClick={() => setQty(product.id, qty - 1)}
                          >
                            <Minus className="size-4" />
                          </Button>
                          <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Increase"
                            onClick={() => setQty(product.id, qty + 1)}
                          >
                            <Plus className="size-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toggleWishlist(product.id);
                            removeFromCart(product.id);
                            toast.success("Moved to wishlist");
                          }}
                        >
                          Move to wishlist
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            removeFromCart(product.id);
                            toast.success("Removed from cart");
                          }}
                        >
                          <Trash2 className="size-4" /> Remove
                        </Button>
                      </div>
                    </div>
                    <p className="font-display text-lg font-bold md:self-center">
                      {formatINR(product.offerPrice * qty)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="h-fit">
              <CardContent className="space-y-3 p-5 text-sm">
                <h2 className="font-display text-base font-semibold">Order summary</h2>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatINR(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Coupon discount</span>
                  <span className="text-success">- {formatINR(discount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (12%)</span>
                  <span>{formatINR(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transport charge</span>
                  <span>{formatINR(shipping)}</span>
                </div>
                <div className="flex justify-between border-t pt-3 font-display text-lg font-bold">
                  <span>Grand total</span>
                  <span>{formatINR(total)}</span>
                </div>
                <div className="flex flex-col gap-2 pt-2 min-[420px]:flex-row">
                  <Input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    aria-label="Coupon code"
                  />
                  <Button
                    variant="outline"
                    className="min-[420px]:shrink-0"
                    onClick={() => {
                      const code = coupon.trim().toUpperCase();
                      if (code === "MONSOON15") {
                        setDiscount(Math.round(cartSubtotal * 0.15));
                        toast.success("Coupon MONSOON15 applied");
                      } else if (code === "FIRST7") {
                        setDiscount(Math.round(cartSubtotal * 0.07));
                        toast.success("Coupon FIRST7 applied");
                      } else {
                        setDiscount(0);
                        toast.error("Invalid coupon code");
                      }
                    }}
                  >
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Estimated delivery: 5-8 working days after payment confirmation.
                </p>
                <Button className="w-full" asChild>
                  <Link to="/checkout">Proceed to checkout</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/products">Continue shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
