export const initializeScrollTracker = () => {
    let lastScrollPosition = window.scrollY;

    const handleScrollEvent = () => {
        const scrollPosition = window.scrollY;
        const totalPageHeight = document.documentElement.scrollHeight;

        const scrollPercentage = parseFloat(
            (
                (scrollPosition / (totalPageHeight - window.innerHeight)) *
                100
            ).toFixed(2)
        );

        const scrollDirection =
            scrollPosition > lastScrollPosition ? "down" : "up";
        lastScrollPosition = scrollPosition;

        const event = new CustomEvent("scrolled", {
            detail: {
                percentage: scrollPercentage,
                pixels: scrollPosition,
                pageHeight: totalPageHeight,
                direction: scrollDirection,
            },
        });

        window.dispatchEvent(event);
    };

    window.addEventListener("scroll", handleScrollEvent);
};
