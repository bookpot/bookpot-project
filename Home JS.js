'use strict'
const body = document.getElementsByTagName("body");
const loginForm = document.getElementsByClassName("login-form");

$(document).ready(function(){
    $("body").click(function(){
        $("body").toggleClass("login-tab");
    })
})

function loginTab() {
    if (loginForm.style.display == "none") {
        loginForm.style.display = "block";
        console.log("none->block");
    } else {
        loginForm.style.display = "none";
        console.log("block->none");
    }
}