import { useEffect, useState, useRef } from "react";

export function useElementWidth<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [width, setWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (typeof ResizeObserver == "undefined") {
            setWidth(el.getBoundingClientRect().width);
            return;
        }

        const ro = new ResizeObserver((entries) => {
            const entry = entries[0];
            const w = entry?.contentRect?.width;
            if (typeof w == "number") setWidth(w);
        })

        ro.observe(el);
        return () => ro.disconnect();

    }, [])

    return {ref, width};
}