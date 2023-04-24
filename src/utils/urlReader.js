import { API } from "../components/managers/ApiAddresses"


export const urlReader = (url) => {
    let thisUrl = false
    if (url !== null) {
        [, thisUrl] = url.split("/media/")
        thisUrl = decodeURIComponent(thisUrl)
        thisUrl = `${API}/${thisUrl}`
    }
    return thisUrl
}