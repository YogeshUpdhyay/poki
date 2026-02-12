import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ location }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  return null;
}
