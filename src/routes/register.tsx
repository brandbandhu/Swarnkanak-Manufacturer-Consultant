import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout, PageHeading } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Your Customer Account | Swarnkanak Portal" },
      { name: "description", content: "Register as a farmer, dealer, distributor or institution to order agricultural machinery, request quotations and track deliveries." },
      { property: "og:title", content: "Create Your Customer Account | Swarnkanak" },
      { property: "og:description", content: "Free registration for the Swarnkanak agricultural machinery customer portal." },
    ],
  }),
  component: RegisterPage,
});

const PW_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function RegisterPage() {
  const { register } = useStore();
  const navigate = useNavigate();
  const [stage, setStage] = useState<"form" | "otp">("form");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<Record<string, string>>({ customerType: "Farmer" });
  const [terms, setTerms] = useState(false);

  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.fullName) e.fullName = "Full name is required";
    if (!data.username) e.username = "Username is required";
    if (!/^[6-9]\d{9}$/.test(data.phone ?? "")) e.phone = "Enter a valid 10-digit Indian mobile number";
    if (!PW_RULE.test(data.password ?? "")) e.password = "Minimum 8 characters with uppercase, lowercase, number and special character";
    if (data.password !== data.confirm) e.confirm = "Passwords do not match";
    if (!terms) e.terms = "You must accept the terms and conditions";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <SiteLayout>
      <PageHeading title="Create Your Account" subtitle="Register once to order machinery, request quotations and manage support from a single dashboard." />
      <div className="container-x max-w-3xl py-12">
        <Card><CardContent className="p-6">
          {stage === "form" ? (
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => { e.preventDefault(); if (validate()) { setStage("otp"); toast.info("Demo OTP is 123456"); } }}
            >
              {([
                ["fullName", "Full name *"], ["username", "Username *"], ["phone", "Mobile number *"],
                ["email", "Email address"], ["password", "Password *"], ["confirm", "Confirm password *"],
                ["address", "Address"], ["village", "Village"], ["taluka", "Taluka"], ["district", "District"],
                ["state", "State"], ["pincode", "PIN code"], ["businessName", "Business / farm name"],
                ["gst", "GST number (optional)"], ["referral", "Referral code (optional)"],
              ] as const).map(([k, label]) => (
                <div key={k}>
                  <Label htmlFor={k} className="text-xs">{label}</Label>
                  <Input
                    id={k}
                    type={k === "password" || k === "confirm" ? "password" : "text"}
                    value={data[k] ?? ""}
                    onChange={(ev) => set(k, ev.target.value)}
                    aria-invalid={!!errors[k]}
                  />
                  {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
                </div>
              ))}
              <div>
                <Label htmlFor="customerType" className="text-xs">Customer type</Label>
                <select id="customerType" className="h-10 w-full rounded-md border bg-card px-3 text-sm" value={data.customerType} onChange={(e) => set("customerType", e.target.value)}>
                  {["Farmer", "Dealer", "Distributor", "Business", "Institution"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="flex items-start gap-2 text-sm">
                  <Checkbox checked={terms} onCheckedChange={(v) => setTerms(!!v)} />
                  <span>I accept the <Link to="/terms" className="text-primary hover:underline">terms and conditions</Link> and <Link to="/privacy-policy" className="text-primary hover:underline">privacy policy</Link>.</span>
                </label>
                {errors.terms && <p className="mt-1 text-xs text-destructive">{errors.terms}</p>}
              </div>
              <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
                <Button type="submit">Continue to OTP verification</Button>
                <p className="text-sm text-muted-foreground">Already registered? <Link to="/login" className="font-semibold text-primary hover:underline">Login</Link></p>
              </div>
            </form>
          ) : (
            <div className="mx-auto max-w-sm space-y-4 text-center">
              <h2 className="font-display text-lg font-semibold">Verify your mobile number</h2>
              <p className="text-sm text-muted-foreground">We sent a 6-digit code to {data.phone}. Demo OTP: <span className="font-semibold text-foreground">123456</span></p>
              <Input value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} placeholder="Enter OTP" aria-label="OTP" className="text-center tracking-[0.4em]" />
              <Button
                className="w-full"
                onClick={() => {
                  if (otp !== "123456") { toast.error("Invalid OTP. Use 123456 for the demo."); return; }
                  const res = register({ ...data, password: data.password } as never);
                  if (!res.ok) { toast.error(res.error ?? "Registration failed"); setStage("form"); return; }
                  toast.success("Welcome to Swarnkanak! Your account is ready.");
                  navigate({ to: "/dashboard" });
                }}
              >
                Verify and create account
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setStage("form")}>Back to form</Button>
            </div>
          )}
        </CardContent></Card>
      </div>
    </SiteLayout>
  );
}
