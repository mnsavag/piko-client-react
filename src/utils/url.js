const apiUrl = process.env.REACT_APP_API_URL + "/"

export function getBackgroundImageRemoteURL(url) {
    return `url('${new URL(apiUrl + url).href}')`
}

export function getStaticFilesURL() {
    return apiUrl;
}