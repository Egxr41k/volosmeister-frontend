export const getIdFromUrl = (url: string): number => {
    let temp =  url.split("/")
    let result =parseInt(temp[temp.length - 1])
    console.log(url, result )
    return result
}