export const sortByPopularity = (a, b) => {
    if (a < b) {
        return 1
    }
    else if (a > b) {
        return -1
    }
    return 0
}

export const sortDate = (a, b) => {
    if (a < b) {
        return 1
    }
    else if (a > b) {
        return -1
    }
    return 0
}
