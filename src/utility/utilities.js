
export const getZodiacSign = (date) => {
    
    let day = Number(date.substring(8, 10));
    let month = Number(date.substring(5, 7));

    if(( day >= 21 && month === 3)||( day <= 20 && month === 4))
        return 'aries';
    if(( day >= 24 && month === 9)||( day <= 23 && month === 10))
        return 'libra';
    if(( day >= 21 && month === 4)||( day <= 21 && month === 5))
        return 'tauro';
    if(( day >= 24 && month === 10)||( day <= 22 && month === 11))
        return 'escorpio';
    if(( day >= 22 && month === 5)||( day <= 21 && month === 6))
        return 'geminis';
    if(( day >= 23 && month === 11)||( day <= 21 && month === 12))
        return 'sagitario';
    if(( day >= 21 && month === 6)||( day <= 23 && month === 7))
        return 'cancer';
    if(( day >= 22 && month === 12)||( day <= 20 && month === 1))
        return 'capricornio';
    if(( day >= 24 && month === 7)||( day <= 23 && month === 8))
        return 'leo';
    if(( day >= 21 && month === 1)||( day <= 19 && month === 2))
        return 'acuario';
    if(( day >= 24 && month === 8)||( day <= 23 && month === 9))
        return 'virgo';
    if(( day >= 20 && month === 2)||( day <= 20 && month === 3))
        return 'piscis';
}

export const fixDate = (date) => {

    let day = Number(date.substring(2, 4));
    let month = Number(date.substring(0, 1));
    let year = Number(date.substring(5, 9));

    return `${year}-${month}-${day}`;

}