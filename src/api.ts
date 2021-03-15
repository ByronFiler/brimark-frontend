

async function get(url: string, params? : Record<string, string>) : Promise<Response> {
    
    if(params && typeof params === 'object') {
        const lastCharacter : string =  String(url.split('').pop());
        
        let tempURL : string = url;
        
        if(lastCharacter !== '?') {
            tempURL += '?';
        }

        tempURL += new URLSearchParams(params);

        return await fetch(tempURL);
    }
    return await fetch(url);
}

async function post(url: string, data: Record<string, string>) : Promise<Response> {
    // const response = await fetch(url, {
    //     method: 'POST',
    //     body: JSON.stringify(data)
    // });
    // return response.json();
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export namespace API {
    export const URL : string = 'https://brimark.api.connieprice.co.uk';

    export enum StatusCode {
        OK = 200,
        NO_CONTENT = 204,
        BAD_REQUEST = 400,
        FORBIDDEN = 403,
        INTERNAL_SERVER_ERROR = 500     
    }
    
    export enum Error {
        HAS_NOT_ACTIVATED = "HAS_NOT_ACTIVATED",
        INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
        ALREADY_ACTIVATE = "ALREADY_ACTIVATE",
        NO_MATCHING_ACCOUNT = "NO_MATCHING_ACCOUNT"
    }

    // Login 500, 403 (body, HAS_NOT_ACTIVATED OR INVALID_CREDENTIALS), 200, 400
    // Activate 500, 200 = OK, 204(ALREADY_ACTIVATE, NO_MATCHING_ACCOUNT) (No Content)
    // Search 200, 204, 500
    // getItem 200, 204, 500
    
    /** GET */
    export function searchForItem(query?: string) : Promise<Response> {
        const url : string = `${API.URL}/Search`;
        if(!query) {
            return get(url);
        } else {
            return get(url, {
                query: query
            });
        }
    }    
    
    export function getAccountById(id: string) : Promise<Response> {
        return get(`${API.URL}/Account`, {
            id: id
        });
    }

    export function getItemDetailsById(id: string) : Promise<Response> {
        return get(`${API.URL}/Item`, {
            id: id
        });
    }

    /** POST */

    // will need to ask about this one.
    export function activateAccount(hash: string) : Promise<Response> {
        return post(`${API.URL}/Activate`, {
            hash: hash
        });
    }
    
    export function registerAccount(username: string, email: string, password: string) : Promise<Response> {
        return post(`${API.URL}/Registration`, {
            username: username,
            email: email,
            password: password
        });
    }

    export function userLogin(id: string, password: string) : Promise<Response> {
        return post(`${API.URL}/User`, {
            id: id,
            password: password
        });
    }
}


export default API;