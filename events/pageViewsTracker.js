export const initializePageViewTracker = (
    callback = (count, currentUrl, visitedUrls) => {}
) => {
    const handlePageViewEvent = () => {
        const currentUrl = window.location.href;

        const pastPageDetails =
            JSON.parse(
                sessionStorage.getItem("global-event-pageViewDetails")
            ) ?? {};

        if (
            currentUrl ===
            (pastPageDetails.visitedUrls ?? []).at(
                (pastPageDetails.visitedUrls ?? []).length - 1
            )
        ) {
            return;
        }

        const newCount = parseInt(pastPageDetails.pageViewCount ?? 0) + 1;
        const newVisitedUrls = [
            ...(pastPageDetails.visitedUrls ?? []),
            currentUrl,
        ];

        sessionStorage.setItem(
            "global-event-pageViewDetails",
            JSON.stringify({
                pageViewCount: newCount,
                visitedUrls: newVisitedUrls,
            })
        );

        // Run Callback
        callback(newCount, currentUrl, newVisitedUrls);

        // Dispatch Event
        const event = new CustomEvent("pageViewCount", {
            detail: {
                count: newCount,
                currentUrl,
                visitedUrls: newVisitedUrls,
            },
        });

        window.dispatchEvent(event);
    };

    window.addEventListener("load", handlePageViewEvent);
};

// TODO:
// Check if same url twice in a row
