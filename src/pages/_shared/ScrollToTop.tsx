import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ScrollToTop() {
  const router = useRouter();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [router.asPath]);

  return null;
}
