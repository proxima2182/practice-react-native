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
    let json = JSON.parse(JSON.stringify(obj));
    for (let key in json) {
        if (json[key]) {
            if (typeof json[key] === 'object') {
                if (Array.isArray(json[key])) {
                    if (json[key].length > 0) {
                        if (json[key][0]) {
                            const item = json[key][0]
                            if (typeof item === 'object') {
                                console.log(`${key} : {`);
                                extractObject(item)
                                console.log(`}[];`);
                            } else {
                                console.log(`${key} : ${typeof item}[];`);
                            }
                        }
                    } else {
                        console.log(`${key} : ${typeof json[key]};`);
                    }
                } else {
                    console.log(`${key} : {`);
                    extractObject(json[key])
                    console.log(`};`);
                }
            } else {
                console.log(`${key} : ${typeof json[key]};`);
            }
        }
    }
}
