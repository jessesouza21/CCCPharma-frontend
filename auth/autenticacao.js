import * as authService from "../services/authService.js";

/**
 * Functions to initializate with the application
 */
function init() {
    if (authService.isAuth()) {
        redirectRouter("/");
    } else {
        setupListeners();
    }
}

/**
 * Get the html component representing some input form
 */
function getInfo(name) {
    let query = `#form input[name=${name}]`;
    const $component = document.querySelector(query);
    return $component.value;
}

/**
 * Redirect the user to especific url
 */
function redirectRouter(url){
    window.location.href = url;
}

/**
 * Setup html components to "listen" functions to especific events 
 */
function setupListeners() {
    let $signUp = document.querySelector("#signUp");
    $signUp.onclick = register;

    let $signIn = document.querySelector("#signIn");
    $signIn.onclick = login;
}

/**
 * Set the display for alert messages
 */
function showMessage(msg, status) {
    const $msg = document.querySelector("#form .message");
    $msg.classList.remove("hidden");
    $msg.classList.remove("error");
    $msg.classList.remove("success");
    $msg.classList.add(status);
    $msg.innerText = msg;
}

/**
 * Function to send a new registerForm to service
 */
function register(){
    let email = getInfo("email");
    let password = getInfo("password");
    
    const user = {
        "email": email,
        "password": password,
    };

    authService.signUp(user)
    .then(function(success) {
        if (success) {
            showMessage("Conta criada com sucesso", "success");
        } else {
            showMessage("Falha ao criar conta. Verifique seus dados.", "error");
        }
    }).catch(function(error) {
        console.log(error);
    });
}

/**
 * Validate the email structure
 */
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Function to send a loginForm to service
 */
function login(){
    let email = getInfo("email");
    let password = getInfo("password");

    if (password.length < 6) {
        showMessage("Insira uma senha com mais de 6 caracteres.", "error");
        return;
    } else if (!validateEmail(email)) {
        showMessage("Insira um e-mail válido.", "error");
        return;
    }

    const user = {
        "email": email,
        "password": password
    };
    
    authService.signIn(user)
    .then(function(success) {
        if (success) {
            redirectRouter("/");
        } else {
            showMessage("A autenticação falhou! Por favor, verifique seus dados.", "error");
        }
    });
}

init();