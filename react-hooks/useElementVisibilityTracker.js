import { useEffect, useRef, useState } from "react";

const useElementVisibilityTracker = () => {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!elementRef.current) return;
        window.addEventListener("scroll", () => {
            const rect = elementRef.current.getBoundingClientRect();
            const elmIsVisible =
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= window.innerHeight &&
                rect.right <= window.innerWidth;

            setIsVisible(elmIsVisible);
        });
    }, [elementRef]);

    return { elementRef, isVisible };
};

export default useElementVisibilityTracker;
