import { createFileRoute, Link, useNavigate } from "@/lib/router-compat";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, PageHeading } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Customer Login | Swarnkanak Portal" },
      {
        name: "description",
        content:
          "Log in to the Swarnkanak customer portal to track orders, manage quotations and access your dashboard.",
      },
      { property: "og:title", content: "Customer Login | Swarnkanak Portal" },
      {
        property: "og:description",
        content: "Secure login for Swarnkanak customers and administrators.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <SiteLayout>
      <PageHeading
        title="Login to Your Account"
        subtitle="Access your dashboard, orders, quotations and support tickets."
      />
      <div className="container-x grid max-w-4xl gap-6 py-12 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setBusy(true);
                setError("");
                const res = login(id, pw);
                setBusy(false);
                if (!res.ok) {
                  setError(res.error ?? "Login failed");
                  return;
                }
                toast.success(`Welcome back, ${res.user?.fullName}`);
                navigate({ to: res.user?.role === "admin" ? "/admin" : "/dashboard" });
              }}
            >
              <div>
                <Label htmlFor="id">Username or phone number</Label>
                <Input
                  id="id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
              <div>
                <Label htmlFor="pw">Password</Label>
                <div className="relative">
                  <Input
                    id="pw"
                    type={show ? "text" : "password"}
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <Checkbox defaultChecked /> Remember me
                </label>
                <Link to="/forgot-password" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              {error && (
                <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={busy}>
                {busy ? "Signing in..." : "Login"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                New here?{" "}
                <Link to="/register" className="font-semibold text-primary hover:underline">
                  Create an account
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>

        <Card className="h-fit bg-muted/60">
          <CardContent className="space-y-3 p-6 text-sm">
            <h2 className="font-display text-base font-semibold">Demo credentials</h2>
            <p className="text-muted-foreground">
              Marked for client demonstration only — change before production deployment.
            </p>
            <div className="rounded-md border bg-card p-3">
              <p className="font-semibold">Super Admin</p>
              <p>Username: admin · Phone: 9999999999</p>
              <p>Password: Admin@123</p>
            </div>
            <div className="rounded-md border bg-card p-3">
              <p className="font-semibold">Customer</p>
              <p>Username: farmerdemo · Phone: 9876543210</p>
              <p>Password: Farmer@123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SiteLayout>
  );
}
