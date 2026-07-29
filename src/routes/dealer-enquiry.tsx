import { createFileRoute } from "@tanstack/react-router";
import { DealerEnquiryPage } from "@/components/PortalPages";

export const Route = createFileRoute("/dealer-enquiry")({ component: DealerEnquiryPage });
