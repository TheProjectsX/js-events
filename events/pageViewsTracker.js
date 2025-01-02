export const initializePageViewTracker = () => {
    const trackPageView = () => {
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

        const event = new CustomEvent("pageViewCount", {
            detail: {
                count: newCount,
                currentUrl,
                visitedUrls: newVisitedUrls,
            },
        });

        window.dispatchEvent(event);
    };

    window.addEventListener("load", trackPageView);
};

// TODO:
// Check if same url twice in a row
