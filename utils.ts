export const makeImagePath = (image: string | null, width: string = "w500") =>
    `https://image.tmdb.org/t/p/${width}${image}`;

export const limitTextSize = (text: string, count: number) => {
    return `${text.slice(0, count)}${text.length > count ? "..." : ""}`
}
