import API from "./api";

const loginForm : HTMLElement | null = document.getElementById('loginForm');
const usernameOrEmail : HTMLInputElement = document.getElementById('usernameOrEmail') as HTMLInputElement;
const password: HTMLInputElement = document.getElementById('password') as HTMLInputElement;

if(loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
    });
}