import { createFileRoute } from "@/lib/router-compat";
import { DealerEnquiryPage } from "@/components/PortalPages";

export const Route = createFileRoute("/dealer-enquiry")({ component: DealerEnquiryPage });
