
export type LayoutCtx = {
    setHeaderTitle: (title:string) => void;
    contentRef: React.RefObject<HTMLElement | null>;
};