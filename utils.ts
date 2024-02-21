export const makeImagePath = (image: string, width: string = "w500") =>
    `https://image.tmdb.org/t/p/${width}${image}`;
