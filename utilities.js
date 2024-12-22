export function calulateDiscount(cP, oP) {
    let temp = (cP / oP) * 100;
    return 100 - Math.round(temp);
}

