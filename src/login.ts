import API from "./api";

const loginForm : HTMLElement | null = document.getElementById('loginForm');
const usernameOrEmail : HTMLInputElement = document.getElementById('usernameOrEmail') as HTMLInputElement;
const password: HTMLInputElement = document.getElementById('password') as HTMLInputElement;

if(loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let usernameOrEmailValue : string = usernameOrEmail.value.trim();
        let passwordValue : string = password.value.trim();
        API.userLogin(usernameOrEmailValue, passwordValue).then(response => {
            console.log(response);
        });
    });
}