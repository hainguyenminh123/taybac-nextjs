import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/router";
import { type ReactNode } from "react";

interface NavLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
}

export default function NavLink({
  href,
  children,
  className = "",
  activeClassName = "text-primary font-medium",
  exact = false,
  ...props
}: NavLinkProps) {
  const router = useRouter();
  const currentPath = router.asPath.split("?")[0];
  const target = typeof href === "string" ? href : href.pathname || "";

  const isActive = exact
    ? currentPath === target
    : currentPath === target || currentPath.startsWith(`${target}/`);

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClassName : ""}`.trim()}
      {...props}
    >
      {children}
    </Link>
  );
}
