'use strict'
const body = document.getElementsByTagName("body");
const loginForm = document.getElementsByClassName("login-form");
const loginFormContainer = document.getElementById("login-form-container");

$(document).ready(function(){
    $(".login").click(function(){
        $("body").toggleClass("login-form-show");
        $("#login-form-container").show();
        $(".login-form").show();
    })

    $(".login-form-hide").click(function(){
        $("body").removeClass("login-form-show");
        $("#login-form-container").hide();
        $(".login-form").hide();
    })
})
