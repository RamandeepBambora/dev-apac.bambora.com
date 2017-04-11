export function excludeGetParameters(path: string) {
    return path.replace(/\?.*/ ,"",);
}