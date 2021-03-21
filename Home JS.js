'use strict'
const body = document.getElementsByTagName("body");
const loginForm = document.getElementsByClassName("login-form");
const loginFormContainer = document.getElementById("login-form-container");
let gridContentSummary = document.getElementsByClassName("summary");
let bookTypeField = document.getElementsByClassName("field");
let viewType = document.getElementsByClassName("view-type");
let viewTypeSelect = document.getElementsByClassName("view-type-select");
let listViewSelected = document.getElementById("list-view-selected");
let gridViewSelected = document.getElementById("grid-view-selected");
let listView = document.getElementById("list-view");
let gridView = document.getElementById("grid-view");
let indexOfView
//view 인덱스 변수 선언하기

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

function contentSummaryPrint() {
    for (let i=0; i<gridContentSummary.length; i++) {
        console.log(gridContentSummary[i]);
        gridContentSummary[i].innerText = gridContentSummary[i].innerText.slice(0,46) + "...";
    }
}
contentSummaryPrint();

listViewSelected.addEventListener("click", function(){listView.style.display = "flex"; gridView.style.display = "none"});
gridViewSelected.addEventListener("click", function(){listView.style.display = "none"; gridView.style.display = "flex"});
