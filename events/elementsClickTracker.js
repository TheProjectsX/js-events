export const initializeElementsClickTracker = (
    query,
    callback = (count, element, event) => {}
) => {
    let clickCount = 0;

    const handleElementsClickEvent = (e) => {
        clickCount++;

        // Run callback
        callback(clickCount, e.target, e);

        // Dispatch Event
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
        .querySelectorAll(query)
        .forEach((element) =>
            element.addEventListener("click", handleElementsClickEvent)
        );
};
