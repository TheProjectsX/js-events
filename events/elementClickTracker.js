export const initializeElementClickTracker = (
    query,
    callback = (count, element, event) => {}
) => {
    let clickCount = 0;

    const handleElementClickEvent = (e) => {
        clickCount++;

        // Run callback
        callback(clickCount, e.target, e);

        // Dispatch Event
        const event = new CustomEvent("elementClicksCount", {
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
        ?.addEventListener("click", handleElementClickEvent);
};
