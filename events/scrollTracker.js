export const initializeScrollTracker = () => {
    const handleScrollEvent = () => {
        const scrollPosition = window.scrollY;
        const totalPageHeight = document.documentElement.scrollHeight;

        const scrollPercentage = parseFloat(
            (
                (scrollPosition / (totalPageHeight - window.innerHeight)) *
                100
            ).toFixed(2)
        );

        const event = new CustomEvent("scrolled", {
            detail: {
                percentage: scrollPercentage,
                pixels: scrollPosition,
                pageHeight: totalPageHeight,
            },
        });

        window.dispatchEvent(event);
    };

    window.addEventListener("scroll", handleScrollEvent);
};
