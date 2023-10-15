export const baseUrl = "https://localhost:7128/api/"
const BaseRequests = <T>(controllerName: string) => {
    const url = baseUrl + controllerName

    return {
        getAll: async (): Promise<T[] | undefined> => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    return await response.json() as T[];
                }
            } catch (error) {
                console.error(`Error fetching ${url}:`, error);
            }
            return undefined;
        },
        get: async (id: number): Promise<T | undefined> => {
            try {
                const response = await fetch(url + "/" + id);
                if (response.ok) {
                    return await response.json() as T;
                }
            } catch (error) {
                console.error(`Error fetching ${url}:`, error);
            }
            return undefined;
        },

        post: async (body: T): Promise<T | undefined> => {
            try {
                const response = await fetch(url, {
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
        },

        put: async (body: T): Promise<T | undefined> => {
            try {
                const response = await fetch( url, {
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
        },

        delete: async (id: number): Promise<boolean> => {
            try {
                const response = await fetch(url + "/" + id, {
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
    }
}

export default BaseRequests