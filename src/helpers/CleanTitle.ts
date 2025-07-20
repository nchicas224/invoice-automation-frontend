
export default function cleanTitle(title: string): string {
    const words = title.split("-");
    let cleaned = "";
    for (const word of words) {
        const cap = word[0].toUpperCase();
        const formal = cap.concat(word.slice(1));
        cleaned += `${formal} `
    };
    return cleaned;
}