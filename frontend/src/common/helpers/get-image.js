export const getImage = (path) => {
    const publicUrl = "http://localhost:3000";
    const divider = path.startsWith("/") ? "" : "/";
    return [publicUrl, path].join(divider);
};
