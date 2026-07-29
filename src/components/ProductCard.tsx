import { Link } from "@/lib/router-compat";
import { Heart, ShoppingCart, Eye, FileText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { discountPct, formatINR, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const saved = wishlist.includes(product.id);
  const pct = discountPct(product);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative overflow-hidden bg-muted">
        <Link to="/products/$slug" params={{ slug: product.slug }} aria-label={product.name}>
          <img
            src={product.image}
            alt={`${product.name} agricultural implement`}
            loading="lazy"
            width={800}
            height={600}
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {pct > 0 && <Badge className="bg-primary text-primary-foreground">{pct}% OFF</Badge>}
          {product.bestseller && (
            <Badge className="bg-warning text-warning-foreground">Bestseller</Badge>
          )}
        </div>
        <button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => {
            toggleWishlist(product.id);
            toast.success(saved ? "Removed from wishlist" : "Added to wishlist");
          }}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-card/90 text-foreground shadow-card transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <Heart className={cn("size-4", saved && "fill-current text-primary")} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-secondary">
          {product.category}
        </p>
        <h3 className="font-display text-base leading-snug font-semibold">
          <Link to="/products/$slug" params={{ slug: product.slug }} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.shortDesc}</p>
        <p className="text-xs text-muted-foreground">
          {product.hp} · {product.workingWidth} · {product.blades}
        </p>

        <div className="mt-auto space-y-3 pt-2">
          <div className="flex items-center gap-2">
            {product.purchaseMode === "quotation" ? (
              <span className="font-display text-lg font-semibold text-secondary">
                Price on Request
              </span>
            ) : (
              <>
                <span className="font-display text-lg font-semibold">
                  {formatINR(product.offerPrice)}
                </span>
                {pct > 0 && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatINR(product.price)}
                  </span>
                )}
              </>
            )}
          </div>
          <div className="flex items-center justify-between text-xs">
            <span
              className={
                product.stock > 0 ? "font-medium text-success" : "font-medium text-destructive"
              }
            >
              {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
            </span>
            <span className="text-muted-foreground">
              ★ {product.rating} ({product.reviews})
            </span>
          </div>
          <div className="flex gap-2">
            {product.purchaseMode === "direct" ? (
              <Button
                className="flex-1"
                onClick={() => {
                  addToCart(product.id);
                  toast.success("Added to cart", { description: product.name });
                }}
              >
                <ShoppingCart className="size-4" /> Add to Cart
              </Button>
            ) : (
              <Button className="flex-1" asChild>
                <Link to="/products/$slug" params={{ slug: product.slug }}>
                  <FileText className="size-4" /> Request Quote
                </Link>
              </Button>
            )}
            <Button variant="outline" size="icon" asChild aria-label="Quick view">
              <Link to="/products/$slug" params={{ slug: product.slug }}>
                <Eye className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
