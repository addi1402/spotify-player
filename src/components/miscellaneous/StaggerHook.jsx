import { useState, useEffect } from "react";

export default function useStaggeredAnimation(items, delay = 50) {
  const [animatedItems, setAnimatedItems] = useState([]);

  useEffect(() => {
    const timeouts = [];
    items.forEach((item, index) => {
      const timeout = setTimeout(() => {
        setAnimatedItems((prev) => [...prev, item]);
      }, index * delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [items, delay]);

  return animatedItems;
}
