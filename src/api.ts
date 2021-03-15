

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

export class API {
    private static readonly URL : string = 'https://brimark.api.connieprice.co.uk' 
    
    /** GET */
    public static searchForItem(query?: string) : Promise<Response> {
        const url : string = `${API.URL}/Search`;
        if(!query) {
            return get(url);
        } else {
            return get(url, {
                query: query
            });
        }
    }    
    
    public static getAccountById(id: string) : Promise<Response> {
        return get(`${API.URL}/Account`, {
            id: id
        });
    }

    public static getItemById(id: string) : Promise<Response> {
        return get(`${API.URL}/Item`, {
            id: id
        });
    }

    /** POST */

    // will need to ask about this one.
    public static activateAccount(hash: string) : Promise<Response> {
        return post(`${API.URL}/Activate`, {
            hash: hash
        });
    }
    
    public static registerAccount(username: string, email: string, password: string) : Promise<Response> {
        return post(`${API.URL}/Registration`, {
            username: username,
            email: email,
            password: password
        });
    }

    public static userLogin(id: string, password: string) : Promise<Response> {
        return post(`${API.URL}/User`, {
            id: id,
            password: password
        });
    }
}

export default API;