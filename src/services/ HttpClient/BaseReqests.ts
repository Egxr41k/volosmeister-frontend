export const baseUrl = "https://thebloominghome.azurewebsites.net/api/"

export const baseGet = async <T>(url: string): Promise<T | undefined> => {
    try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
            return await response.json() as T;
        }
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
    }
    return undefined;
}

export const basePost = async <T>(url: string, body: any): Promise<T | undefined> => {
    try {
        const response = await fetch(baseUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            return await response.json() as T;
        }
    } catch (error) {
        console.error(`Error posting to ${url}:`, error);
    }
    return undefined;
}

export const basePut = async <T>(url: string, body: any): Promise<T | undefined> => {
    try {
        const response = await fetch(baseUrl + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            return await response.json() as T;
        }
    } catch (error) {
        console.error(`Error updating ${url}:`, error);
    }
    return undefined;
}

export const baseDelete = async (url: string): Promise<boolean> => {
    try {
        const response = await fetch(baseUrl + url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.ok;
    } catch (error) {
        console.error(`Error deleting from ${url}:`, error);
        return false;
    }
}

// const BaseRequests = <T> () => {
//     const baseUrl = "https://thebloominghome.azurewebsites.net/"
//
//     return {
//         get: async (url: string): Promise<T | undefined> => {
//             try {
//                 const response = await fetch(baseUrl + url);
//                 if (response.ok) {
//                     return await response.json() as T;
//                 }
//             } catch (error) {
//                 console.error(`Error fetching ${url}:`, error);
//             }
//             return undefined;
//         },
//
//         post: async (url: string, body: any): Promise<T | undefined> => {
//             try {
//                 const response = await fetch(baseUrl + url, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(body),
//                 });
//                 if (response.ok) {
//                     return await response.json() as T;
//                 }
//             } catch (error) {
//                 console.error(`Error posting to ${url}:`, error);
//             }
//             return undefined;
//         },
//
//         put: async (url: string, body: any): Promise<T | undefined> => {
//             try {
//                 const response = await fetch(baseUrl + url, {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(body),
//                 });
//                 if (response.ok) {
//                     return await response.json() as T;
//                 }
//             } catch (error) {
//                 console.error(`Error updating ${url}:`, error);
//             }
//             return undefined;
//         },
//
//         delete: async (url: string): Promise<boolean> => {
//             try {
//                 const response = await fetch(baseUrl + url, {
//                     method: 'DELETE',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });
//                 return response.ok;
//             } catch (error) {
//                 console.error(`Error deleting from ${url}:`, error);
//                 return false;
//             }
//         }
//     }
// }
//
// export default BaseRequests