export const capitaliseSentence = (sentence: string) => {
    const words = sentence.split(" ");

    return words
        .map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        })
        .join(" ");
};

export function capitaliseFirstLetter(str: string): string {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}
