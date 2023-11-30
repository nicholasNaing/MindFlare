import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//this componenet is needed to fix the scroll being in bottom even after navigate to other component
//this is a bug caused by the react-router
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}