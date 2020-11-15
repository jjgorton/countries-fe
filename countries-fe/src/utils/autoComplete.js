export const autoComplete = (query, arr) => {
    const str = `${query}`.toLocaleLowerCase();

    if (!str.length) return [];

    const option = arr.filter(
        (val) =>
            `${val}`.toLocaleLowerCase().startsWith(str) &&
            str.length < `${val}`.length
    )[0];

    return query + (option ? option.slice(str.length) : '');
};
