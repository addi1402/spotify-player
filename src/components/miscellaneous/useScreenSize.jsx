import { useState, useEffect } from "react";

export default function useScreenSize() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 765);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 765);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isSmallScreen;
}