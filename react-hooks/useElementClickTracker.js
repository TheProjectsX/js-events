import { useEffect, useRef, useState } from "react";

const useElementClickTracker = () => {
    const elementRef = useRef(null);

    const [clickData, setClickData] = useState({
        count: 0,
        element: null,
        event: null,
    });

    const handleElementClicked = (event) =>
        setClickData((prev) => ({
            count: prev.count + 1,
            element: event.target,
            event: event,
        }));

    useEffect(() => {
        if (!elementRef.current) return;

        elementRef.current.addEventListener("click", handleElementClicked);

        return () => {
            elementRef.current?.removeEventListener(
                "click",
                handleElementClicked
            );
        };
    }, [elementRef]);

    return { elementRef, ...clickData, elementClicked: handleElementClicked };
};

export default useElementClickTracker;
