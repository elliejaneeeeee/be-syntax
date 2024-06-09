
export const isValidId = (id) => {
    const validRegex = /^U\d+$/gm

    return validRegex.test(id)
}