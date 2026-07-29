import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Download } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatINR } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/order-success")({
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s.id === "string" ? s.id : "" }),
  head: () => ({
    meta: [
      { title: "Order Confirmed | Swarnkanak Machinery" },
      { name: "description", content: "Your agricultural machinery order has been placed successfully. Track status, download the acknowledgement or continue shopping." },
      { property: "og:title", content: "Order Confirmed | Swarnkanak" },
      { property: "og:description", content: "Order placed successfully with Swarnkanak Manufacturer & Consultant." },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { id } = Route.useSearch();
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id) ?? orders[0];

  return (
    <SiteLayout>
      <div className="container-x max-w-3xl py-16">
        <Card><CardContent className="space-y-5 p-8 text-center">
          <CheckCircle2 className="mx-auto size-16 animate-bounce text-success" />
          <h1 className="font-display text-2xl font-bold">Thank you! Your order is confirmed</h1>
          <p className="text-sm text-muted-foreground">Order number <span className="font-semibold text-foreground">{order?.id}</span></p>

          {order && (
            <div className="space-y-2 rounded-lg border p-5 text-left text-sm">
              {order.items.map((i) => (
                <div key={i.productId} className="flex justify-between"><span>{i.name} × {i.qty}</span><span>{formatINR(i.price * i.qty)}</span></div>
              ))}
              <div className="flex justify-between border-t pt-2 font-semibold"><span>Total</span><span>{formatINR(order.total)}</span></div>
              <p className="pt-2"><span className="font-semibold">Delivery address:</span> {order.address}</p>
              <p><span className="font-semibold">Payment:</span> {order.paymentMethod} ({order.paymentStatus})</p>
              <p><span className="font-semibold">Estimated delivery:</span> 5-8 working days</p>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => toast.success("Acknowledgement downloaded (demo)")}><Download className="size-4" /> Download acknowledgement</Button>
            <Button variant="outline" asChild><Link to="/dashboard/orders">View order</Link></Button>
            <Button variant="ghost" asChild><Link to="/products">Continue shopping</Link></Button>
          </div>
        </CardContent></Card>
      </div>
    </SiteLayout>
  );
}
