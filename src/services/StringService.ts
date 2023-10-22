export const getIdFromUrl = (url: string): number => {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    return parseInt(lastPart);
}

export const textFormatter = (text: string, length: number) => {
    if (text.length <= length) return text;
    else {
        const textWithSpaces = addSpaceBeforeNewlines(text);
        const words = textWithSpaces.split(" ");
        const trimmedText = trimToLength(words, length);
        return trimmedText + "...";
    }
}

const addSpaceBeforeNewlines = (text: string) => {
    return text.replace(/\n/g, " \n");
}

const trimToLength = (words: string[], length: number) => {
    return words.reduce((acc, word) => {
        return (acc + " " + word).length <= length ? acc + " " + word : acc;
    }, "").trim();
}