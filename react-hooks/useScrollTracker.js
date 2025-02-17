import { useEffect, useState, useCallback } from "react";

const useScrollTracker = () => {
    const [scrollInfo, setScrollInfo] = useState({
        percentage: 0,
        pixels: 0,
        pageHeight: 0,
        lastScrollPosition: 0,
        scrollDirection: "",
    });

    const handleScrollEvent = useCallback(() => {
        const scrollPosition = window.scrollY;
        const totalPageHeight = document.documentElement.scrollHeight;

        const scrollPercentage = parseFloat(
            (
                (scrollPosition / (totalPageHeight - window.innerHeight)) *
                100
            ).toFixed(2)
        );

        setScrollInfo((prev) => ({
            percentage: scrollPercentage,
            pixels: scrollPosition,
            pageHeight: totalPageHeight,
            lastScrollPosition: scrollPosition,
            scrollDirection:
                scrollPosition > prev.lastScrollPosition ? "down" : "up",
        }));
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScrollEvent);
        return () => {
            window.removeEventListener("scroll", handleScrollEvent);
        };
    }, [handleScrollEvent]);

    return {
        percentage: scrollInfo.percentage,
        pixels: scrollInfo.pixels,
        pageHeight: scrollInfo.pageHeight,
        direction: scrollInfo.scrollDirection,
    };
};

export default useScrollTracker;
