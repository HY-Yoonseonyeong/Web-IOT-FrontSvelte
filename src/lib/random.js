

export const  randomString = () => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    const stringLength = 10;
    let ranString = '';
    for (let i = 0; i < stringLength; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        ranString += chars[rnum];
    }
    return ranString;
}

export const  gen_m2m_ri = () => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    const stringLength = 10;
    let ranString = '';
    for (let i = 0; i < stringLength; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        ranString += chars[rnum];
    }
    return ranString;
}
