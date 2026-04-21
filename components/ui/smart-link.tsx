import Link from "next/link";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { isExternalHref } from "@/lib/utils";

type SmartLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  }
>;

export default function SmartLink({ href, children, ...props }: SmartLinkProps) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
