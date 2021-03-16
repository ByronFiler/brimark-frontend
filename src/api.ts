

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

export interface searchForItemParams {
    query: string, 
    brand?: string, 
    sizing?: string, 
    minimumPrice?: number, 
    maximumPrice?: number
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

    /** 
         * Searches for an item via a query
         * @param {string} query the query you want to search for
         * @example 
         * API.searchForItem("boots").then(response => {
         *      if(response.code === API.StatusCode.OK) {
         *          // okay request
         *          let jsonData = response.json();
         *          // do something with the data?
         *      }
         * });
         * @returns {Promise<Repsonse>}
     */
    export function searchForItem(params: searchForItemParams) : Promise<Response> {
        const url : string = `${API.URL}/Search`;
        let data : Record<string, string> = {};
        
        for (let [key, value] of Object.entries(params)) {
            data[key] = String(value);
        }
       
        return get(url, data);
    }    

    /** 
         * Gets the account by Id
         * @param {string} id the id of the account that want to get  
         * @example 
         * API.getAccountById("0").then(response => {
         *      if(response.code === API.StatusCode.OK) {
         *          // okay request
         *          let jsonData = response.json();
         *          // do something with the data?
         *      }
         * });
         * @returns {Promise<Repsonse>}
     */
    export function getAccountById(id: string) : Promise<Response> {
        return get(`${API.URL}/Account`, {
            id: id
        });
    }

    /** 
         * Gets the item details by Id
         * @param {string} id the id of the item you want to get the details of 
         * @example 
         * API.getItemDetailsById("0").then(response => {
         *      if(response.code === API.StatusCode.OK) {
         *          // okay request
         *          let jsonData = response.json();
         *          // do something with the data?
         *      }
         * });
         * @returns {Promise<Repsonse>}
     */
    export function getItemDetailsById(id: string) : Promise<Response> {
        return get(`${API.URL}/Item`, {
            id: id
        });
    }

    /** POST */

    /** 
         * Activates an account via an activation code
         * @param {string} activationCode the activation code provided by the server (should be in the URL Params) 
         * @example 
         * API.activateAccount("5eb63bbbe01eeed093cb22bb8f5acdc3").then(response => {
         *      switch(response.code) {
         *          case API.StatusCode.OK:
         *              // handle okay response
         *              break;
         *          case API.StatusCode.NO_CONTENT:
         *              let jsonData = response.json();
         *              jsonData.then(response => {
         *                  if(response.error === API.Error.ALREADY_ACTIVE) {
         *                      // handle this however you want, accounts already active? maybe redirect to the login and display a message?
         *                  }
         *                  if(response.error === API.Error.NO_MATCHING_ACCOUNT) {
         *                      // random url that is not valid? redirect to login and maybe, display an error saying account does not exist?
         *                  }
         *              });
         *              break;
         *          case API.StatusCode.FORBIDDEN:
         *              // display some kind of error?
         *              break; 
         *      }
         * });
         * @returns {Promise<Repsonse>}
     */
    export function activateAccount(activationCode: string) : Promise<Response> {
        return post(`${API.URL}/Activate`, {
            hash: activationCode
        });
    }
    
    /**
         * Registers an account (used for sign up!)
         * @param {string} username 
         * @param {string} email 
         * @param {string} password 
         * @example
         * API.registerAccount(username: "test", email: "test@test.com", password: "125oiasdoa").then(response => {
            switch(response.code) {
                case API.StatusCode.OK:
                    // handle okay response
                    break;
                case API.StatusCode.FORBIDDEN:
                    // handle forbidden?? server broke.
                    break;
            }
         * });
         * @returns {Promise<Repsonse>}
     */
    export function registerAccount(username: string, email: string, password: string) : Promise<Response> {
        return post(`${API.URL}/Registration`, {
            username: username,
            email: email,
            password: password
        });
    }

    /**
         * @param {string} usernameOrEmail the username or email you want to provide to login with
         * @param {string} password the password for the user
         * @returns {Promise<Repsonse>}
     */
    export function userLogin(usernameOrEmail: string, password: string) : Promise<Response> {
        return post(`${API.URL}/User`, {
            usernameOrEmail: usernameOrEmail,
            password: password
        });
    }
}


export default API;