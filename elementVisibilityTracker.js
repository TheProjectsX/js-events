export const initializeElementVisibilityTracker = (
    query,
    callback = (element, isVisible) => {}
) => {
    const checkVisibility = () => {
        const element = document.querySelector(query);

        const rect = element.getBoundingClientRect();
        const isVisible =
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth;

        // Run Callback
        callback(element, isVisible);

        // Dispatch Event
        const event = new CustomEvent("elementVisible", {
            detail: {
                element: element,
                isVisible,
            },
        });

        window.dispatchEvent(event);
    };

    // Call initially in case the element is already visible when page loads
    checkVisibility();

    // Listen for scroll events to check visibility
    window.addEventListener("scroll", checkVisibility);
};
