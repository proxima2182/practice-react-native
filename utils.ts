export const makeImagePath = (image: string | null, width: string = "w500") =>
    `https://image.tmdb.org/t/p/${width}${image}`;

export const limitTextSize = (text: string, count: number) => {
    if (!text) return ""
    return `${text.slice(0, count)}${text.length > count ? "..." : ""}`
}

export const extractKey = (item: IRootItem, index: number) => item.id ?? 'I' + index;

/**
 * to create interface
 * @param obj
 */
export const extractObject = (obj: any) => {
    if (!obj) return;
    console.log(obj)
    console.log("----------------------------")
    let json = JSON.parse(JSON.stringify(obj));
    for (let key in json) {
        console.log(`${key} : ${typeof json[key]};`);
    }
    console.log("----------------------------")
    console.log("----------------------------")
}
