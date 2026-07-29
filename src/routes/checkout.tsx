import { createFileRoute, Link, useNavigate } from "@/lib/router-compat";
import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, Breadcrumbs, PageHeading } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { formatINR } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout | Swarnkanak Machinery" },
      {
        name: "description",
        content:
          "Complete your agricultural machinery order with delivery address, shipping method, coupon and payment selection.",
      },
      { property: "og:title", content: "Secure Checkout | Swarnkanak" },
      {
        property: "og:description",
        content: "Multi-step checkout for agricultural machinery orders.",
      },
    ],
  }),
  component: Checkout,
});

const PAYMENTS = [
  "Cash on Delivery",
  "Bank Transfer",
  "UPI",
  "Credit/Debit Card",
  "Pay at Dealership",
  "Request Finance Assistance",
];
const STEPS = ["Account", "Address", "Products", "Delivery", "Payment", "Review"];

function Checkout() {
  const { user, cartLines, cartSubtotal, placeOrder } = useStore();
  const [step, setStep] = useState(user ? 1 : 0);
  const [payment, setPayment] = useState(PAYMENTS[0]);
  const [shipping, setShipping] = useState("Standard road transport (5-8 days)");
  const [addr, setAddr] = useState({
    name: user?.fullName ?? "",
    phone: user?.phone ?? "",
    email: user?.email ?? "",
    address: user?.address ?? "",
    village: user?.village ?? "",
    taluka: user?.taluka ?? "",
    district: user?.district ?? "",
    state: user?.state ?? "",
    pincode: user?.pincode ?? "",
    gst: user?.gst ?? "",
    notes: "",
  });
  const navigate = useNavigate();

  const shippingCost = shipping.startsWith("Express") ? 9500 : 4500;
  const tax = Math.round(cartSubtotal * 0.12);
  const total = cartSubtotal + tax + shippingCost;

  if (cartLines.length === 0) {
    return (
      <SiteLayout>
        <PageHeading title="Checkout" />
        <div className="container-x py-16 text-center">
          <p className="font-display text-lg font-semibold">There is nothing to check out</p>
          <Button className="mt-5" asChild>
            <Link to="/products">Browse machinery</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeading title="Checkout" subtitle="Six quick steps to place your machinery order." />
      <Breadcrumbs items={[{ label: "Cart", to: "/cart" }, { label: "Checkout" }]} />

      <div className="container-x grid gap-8 py-10 lg:grid-cols-[1fr_340px]">
        <div>
          <ol className="mb-6 flex flex-wrap gap-2 text-xs">
            {STEPS.map((s, i) => (
              <li
                key={s}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 ${i === step ? "border-primary bg-primary text-primary-foreground" : i < step ? "border-success text-success" : "text-muted-foreground"}`}
              >
                {i < step ? <Check className="size-3" /> : <span>{i + 1}</span>} {s}
              </li>
            ))}
          </ol>

          <Card>
            <CardContent className="space-y-4 p-6">
              {step === 0 && (
                <div className="space-y-3">
                  <h2 className="font-display text-lg font-semibold">Login or continue as guest</h2>
                  <p className="text-sm text-muted-foreground">
                    Logging in lets you track orders, download invoices and reorder faster.
                  </p>
                  <div className="flex gap-2">
                    <Button asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/register">Register</Link>
                    </Button>
                    <Button variant="ghost" onClick={() => setStep(1)}>
                      Continue as guest
                    </Button>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-3">
                  <h2 className="font-display text-lg font-semibold">Delivery address</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(
                      [
                        ["name", "Full name"],
                        ["phone", "Mobile number"],
                        ["email", "Email address"],
                        ["village", "Village"],
                        ["taluka", "Taluka"],
                        ["district", "District"],
                        ["state", "State"],
                        ["pincode", "PIN code"],
                        ["gst", "GST number (optional)"],
                      ] as const
                    ).map(([k, label]) => (
                      <div key={k}>
                        <Label htmlFor={k} className="text-xs">
                          {label}
                        </Label>
                        <Input
                          id={k}
                          value={addr[k]}
                          onChange={(e) => setAddr({ ...addr, [k]: e.target.value })}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-xs">
                      Full address
                    </Label>
                    <Textarea
                      id="address"
                      value={addr.address}
                      onChange={(e) => setAddr({ ...addr, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes" className="text-xs">
                      Delivery notes
                    </Label>
                    <Textarea
                      id="notes"
                      value={addr.notes}
                      onChange={(e) => setAddr({ ...addr, notes: e.target.value })}
                      placeholder="Landmark, unloading facility, preferred timing"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <h2 className="font-display text-lg font-semibold">Review products</h2>
                  {cartLines.map(({ product, qty }) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-3 border-b pb-3 text-sm"
                    >
                      <span>
                        {product.name} × {qty}
                      </span>
                      <span className="font-semibold">{formatINR(product.offerPrice * qty)}</span>
                    </div>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <h2 className="font-display text-lg font-semibold">Delivery method</h2>
                  <RadioGroup value={shipping} onValueChange={setShipping} className="space-y-2">
                    {[
                      "Standard road transport (5-8 days)",
                      "Express dedicated truck (3-4 days)",
                      "Pick up from plant, Sinnar MIDC",
                    ].map((s) => (
                      <label
                        key={s}
                        className="flex items-center gap-3 rounded-md border p-3 text-sm"
                      >
                        <RadioGroupItem value={s} /> {s}
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-3">
                  <h2 className="font-display text-lg font-semibold">Payment method</h2>
                  <RadioGroup value={payment} onValueChange={setPayment} className="space-y-2">
                    {PAYMENTS.map((p) => (
                      <label
                        key={p}
                        className="flex items-center gap-3 rounded-md border p-3 text-sm"
                      >
                        <RadioGroupItem value={p} /> {p}
                      </label>
                    ))}
                  </RadioGroup>
                  <p className="text-xs text-muted-foreground">
                    Card details are never stored. Online payments will be processed through the
                    payment gateway service layer in production.
                  </p>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-3 text-sm">
                  <h2 className="font-display text-lg font-semibold">Review and place order</h2>
                  <p>
                    <span className="font-semibold">Deliver to:</span> {addr.name}, {addr.village},{" "}
                    {addr.taluka}, {addr.district}, {addr.state} - {addr.pincode}
                  </p>
                  <p>
                    <span className="font-semibold">Contact:</span> {addr.phone}{" "}
                    {addr.email && `· ${addr.email}`}
                  </p>
                  <p>
                    <span className="font-semibold">Delivery:</span> {shipping}
                  </p>
                  <p>
                    <span className="font-semibold">Payment:</span> {payment}
                  </p>
                  <p>
                    <span className="font-semibold">Grand total:</span> {formatINR(total)}
                  </p>
                </div>
              )}

              <div className="flex justify-between pt-2">
                <Button
                  variant="outline"
                  disabled={step === 0}
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
                {step < 5 ? (
                  <Button
                    onClick={() => {
                      if (step === 1 && (!addr.name || !addr.phone || !addr.pincode)) {
                        toast.error("Please fill name, mobile number and PIN code");
                        return;
                      }
                      setStep((s) => s + 1);
                    }}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      const order = placeOrder({
                        paymentMethod: payment,
                        address: `${addr.address}, ${addr.village}, ${addr.taluka}, ${addr.district}, ${addr.state} - ${addr.pincode}`,
                        total,
                      });
                      toast.success("Order placed successfully");
                      navigate({ to: "/order-success", search: { id: order.id } });
                    }}
                  >
                    Place order
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardContent className="space-y-2 p-5 text-sm">
            <h2 className="font-display text-base font-semibold">Summary</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatINR(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (12%)</span>
              <span>{formatINR(tax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Transport</span>
              <span>{formatINR(shippingCost)}</span>
            </div>
            <div className="flex justify-between border-t pt-3 font-display text-lg font-bold">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </SiteLayout>
  );
}
