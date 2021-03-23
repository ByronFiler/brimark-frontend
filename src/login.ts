import API from "./api";

const loginForm : HTMLElement | null = document.getElementById('loginForm');
const usernameOrEmail : HTMLInputElement = document.getElementById('usernameOrEmail') as HTMLInputElement;
const password: HTMLInputElement = document.getElementById('password') as HTMLInputElement;

function redirectToIndexPage() : void {
    API.redirectToPage("/index.html");
}

let SID : string = API.getCookieValue("SID");

if(SID && SID !== "") {
    redirectToIndexPage();
}

if(loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let usernameOrEmailValue : string = usernameOrEmail.value.trim();
        let passwordValue : string = password.value.trim();
        API.userLogin(usernameOrEmailValue, passwordValue).then(response => {
            const jsonData = response.json();

            switch(response.status) {
                case API.StatusCode.OK:
                    jsonData.then(data => {
                        API.setCookie({
                            "SID": data.sessionID
                        });
                        redirectToIndexPage();
                    });
                    break;
                case API.StatusCode.FORBIDDEN:
                    jsonData.then(data => {
                        switch(data.error) {
                            case API.Error.HAS_NOT_ACTIVATED:
                                // display error to user that they need to activate their account.
                                break;
                            case API.Error.INVALID_CREDENTIALS:
                                // display error about account not found or invalid details (don't want to provide too much information to the user trying to login. Security reasons.)
                                break;
                        }
                    });
                    break;
                default:
                    // weird unknown handled error, display generic error?
                    break;
            }
        });
    });
}