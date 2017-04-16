// Global function
export const isExist = val => {
    if (
        typeof val === 'undefined' ||
        val === undefined ||
        val === null ||
        val === '' ||
        (typeof val === 'array' && val.length === 0) ||
        (typeof val === 'object' && Object.keys(val).length === 0)
    ) {
        return false;
    }
    else {
        return true;
    }
}
