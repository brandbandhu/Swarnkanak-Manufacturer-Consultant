import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout, PageHeading } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Your Password | Swarnkanak Portal" },
      { name: "description", content: "Recover access to your Swarnkanak customer portal account using mobile OTP verification." },
      { property: "og:title", content: "Reset Your Password | Swarnkanak Portal" },
      { property: "og:description", content: "Secure password recovery with OTP verification." },
    ],
  }),
  component: Forgot,
});

function Forgot() {
  const [step, setStep] = useState(0);
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <SiteLayout>
      <PageHeading title="Forgot Password" subtitle="Verify your registered mobile number to set a new password." />
      <div className="container-x max-w-md py-12">
        <Card><CardContent className="space-y-4 p-6">
          {step === 0 && (
            <>
              <Input placeholder="Registered phone number or email" aria-label="Phone or email" />
              <Button className="w-full" onClick={() => { setStep(1); toast.info("Demo OTP is 123456"); }}>Send OTP</Button>
            </>
          )}
          {step === 1 && (
            <>
              <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP (123456)" aria-label="OTP" />
              <Button className="w-full" onClick={() => (otp === "123456" ? setStep(2) : toast.error("Invalid OTP"))}>Verify OTP</Button>
            </>
          )}
          {step === 2 && (
            <>
              <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="New password" aria-label="New password" />
              <Input type="password" value={cpw} onChange={(e) => setCpw(e.target.value)} placeholder="Confirm new password" aria-label="Confirm new password" />
              <Button className="w-full" onClick={() => (pw && pw === cpw ? setStep(3) : toast.error("Passwords do not match"))}>Reset password</Button>
            </>
          )}
          {step === 3 && (
            <div className="space-y-3 text-center">
              <p className="font-display text-lg font-semibold text-success">Password reset successful</p>
              <Button asChild className="w-full"><Link to="/login">Back to login</Link></Button>
            </div>
          )}
        </CardContent></Card>
      </div>
    </SiteLayout>
  );
}
