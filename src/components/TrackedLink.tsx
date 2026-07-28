import { track } from "@vercel/analytics";
import { Link, LinkProps } from "react-router-dom";

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
      track(eventName, {
        source: eventSource,
        destination: typeof to === "string" ? to : to.pathname,
      });
      onClick?.(event);
    }}
  />
);

export default TrackedLink;
