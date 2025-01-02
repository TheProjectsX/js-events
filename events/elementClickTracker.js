export const initializeElementClickTracker = (
    query,
    callback = (count, element, event) => {}
) => {
    let clickCount = 0;

    const trackElementClicks = (e) => {
        clickCount++;

        // Run callback
        callback(clickCount, e.target, e);

        const event = new CustomEvent("elementsClickCount", {
            detail: {
                count: clickCount,
                element: e.target,
                event: e,
            },
        });

        window.dispatchEvent(event);
    };

    document
        .querySelector(query)
        ?.addEventListener("click", trackElementClicks);
};
