import API from "./api";

const signupForm : HTMLElement | null = document.getElementById('signupForm');
const username : HTMLInputElement = document.getElementById('usernameField') as HTMLInputElement;
const email : HTMLInputElement = document.getElementById('emailField') as HTMLInputElement;
const password: HTMLInputElement = document.getElementById('passwordField') as HTMLInputElement;
const password2: HTMLInputElement = document.getElementById('passwordRepeatField') as HTMLInputElement;

function isValidEmail(email: string) : boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}

function isValidPassword(password: string) : boolean {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;
    return re.test(password);
}

if(signupForm) {
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // we know they they exist and the user hasn't messed with the page at all
        if(username && email && password && password2) {
            // rechecking they've all been filled out as the user can remove the required tag.
            // // const emailValue : string = email
            const usernameValue : string = username.value.trim();
            const emailValue : string = email.value.trim();
            const passwordValue: string = password.value.trim();
            const passwordValue2: string = password2.value.trim();

            if(!isValidEmail(emailValue)) {
                // display error
            } else {
                if(passwordValue !== passwordValue2) {
                    // display error
                } else {
                    if(!(isValidPassword(passwordValue) && isValidPassword(passwordValue2))) {
                        // weird error idk as passwords are the same, so should match?
                    } else {
                        // make a request to the server.
                        API.registerAccount(usernameValue, emailValue, passwordValue).then(response => {
                            console.log(response);
                        });
                    }
                }
            }
        } else {
            // display an error, the user probably deleted them or the fields ids changed?
        }
    });
}
