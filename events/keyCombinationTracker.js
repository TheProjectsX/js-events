export const initializeKeyCombinationTracker = (
    keys = [],
    callback = (keys, event) => {}
) => {
    const modifierKeys = ["alt", "control", "ctrl", "meta", "shift"];

    // Convert keys to lowercase, handle 'ctrl' as 'control', and remove duplicates
    keys = [
        ...new Set(
            keys
                .map((key) => {
                    const lowerKey = key.toLowerCase();
                    if (
                        modifierKeys.includes(lowerKey) ||
                        lowerKey.length === 1
                    ) {
                        return lowerKey === "control" ? "ctrl" : lowerKey; // Handle 'ctrl' as 'control'
                    }
                    return null; // Exclude non-modifier, non-single-character words
                })
                .filter(Boolean) // Remove null values (excluded keys)
        ),
    ];

    // Function to check key combination
    const checkKeyCombo = (e) => {
        // Skip if the key is a modifier or not in the target keys
        if (
            modifierKeys.includes(e.key.toLowerCase()) ||
            !keys.includes(e.key.toLowerCase())
        )
            return;

        // Check if all the keys, including modifiers, are pressed
        const keysClicked = keys.every((key) => {
            if (key.length === 1) return true;
            // Below line uses the modifier keys given by the user to check if it was clicked. As the modifier keys follows same pattern as 'alt'Key , 'shift'Key and so on...
            else return e[`${key}Key`];
        });

        if (!keysClicked) {
            return;
        }

        // Run Callback
        callback(keys, e);

        // Dispatch Event
        const event = new CustomEvent("keyCombinationPressed", {
            detail: {
                keys,
                event: e,
            },
        });

        window.dispatchEvent(event);
    };

    // Add event listener for keydown
    window.addEventListener("keydown", checkKeyCombo);
};
