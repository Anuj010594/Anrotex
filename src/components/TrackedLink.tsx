import { Link, LinkProps } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = LinkProps & {
  eventName?: string;
  eventSource: string;
};

const TrackedLink = ({
  eventName = "CTA Click",
  eventSource,
  onClick,
  to,
  ...props
}: TrackedLinkProps) => (
  <Link
    {...props}
    to={to}
    onClick={(event) => {
      trackEvent(eventName, {
        source: eventSource,
        destination: typeof to === "string" ? to : to.pathname,
      });
      onClick?.(event);
    }}
  />
);

export default TrackedLink;
