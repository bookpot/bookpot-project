'use strict'
const body = document.getElementsByTagName("body");
const loginForm = document.getElementsByClassName("login-form");
const loginFormContainer = document.getElementById("login-form-container");
let gridContentSummary = document.getElementsByClassName("summary");
let bookTypeField = document.getElementsByClassName("field");
// login 관련 변수
let loginFormErrormessage;
let loginFormSubmit = document.getElementById("login-form-submit");
let loginEmail;
let loginPassword;
// 그리드뷰&리스트뷰 관련 변수
let viewType = document.getElementsByClassName("view-type");
let viewTypeSelect = document.getElementsByClassName("view-type-select");
let listViewSelected = document.getElementById("list-view-selected");
let gridViewSelected = document.getElementById("grid-view-selected");
let listView = document.getElementById("list-view");
let gridView = document.getElementById("grid-view");
let contentView;

// 로그인 창 띄우고&닫기
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

    $("#login-form-submit").click(function() {
        var token = $("meta[name='csrf']").attr('content');
        var header = $("meta[name='csrf_header']").attr('content');
        $.ajax({
            url : "/login",
            type : "post",
            dataType : "json",
            data : {
                username : $("#login-email").val(),
                password : $("#login-password").val()
            },
            beforeSend : function(xhr) {
                if(token && header)
                    xhr.setRequestHeader(header, token);
            },
            success : function(result) {
                if(result.success) {
                    console.log("로그인 성공");
                    window.location.href = result.returnUrl;
                } else {
                    $("#login-form-error-message").show();
                }
            },
            error : function(a, b, c) {
                console.log("로그인 에러" + a + b + c);                
            }
        })
    })
})

//분야 선택
function bookTypeSelected(iOfField) {
    console.log(bookTypeField[iOfField].style.backgroundColor);
    if (bookTypeField[iOfField].style.backgroundColor == "#FFFFFF") {
        console.log("하이라이트로 변경");
        bookTypeField[iOfField].style.backgroundColor = "#4FBA80";
        bookTypeField[iOfField].style.color = "#FFFFFF";
    }
    else{
        console.log("기본으로 변경");
        bookTypeField[iOfField].style.backgroundColor = "#FFFFFF";
        bookTypeField[iOfField].style.color = "#000000";
    }
}

function showLoginError() {
    console.log("showLoginError 함수 실행됨");
    loginFormErrormessage = document.getElementById("login-form-error-message");
    if (loginFormErrormessage.innerText == "") {
        console.log("error가 날 상황이 아님");
        loginFormErrormessage.style.display = "none"
    }
}

// view 전환
listViewSelected.addEventListener("click", function(){
    let listViewIcon = document.getElementById('list-view-icon');
    let gridViewIcon = document.getElementById("grid-view-icon");
    listViewIcon.src = "icon/list_green.svg";
    gridViewIcon.src = "icon/grid_black.svg";
    listView.style.display = "flex"; gridView.style.display = "none" });
gridViewSelected.addEventListener("click", function(){
    let listViewIcon = document.getElementById('list-view-icon');
    let gridViewIcon = document.getElementById("grid-view-icon");
    listViewIcon.src = "icon/list_black.svg";
    gridViewIcon.src = "icon/grid_green.svg";
    listView.style.display = "none"; gridView.style.display = "flex" });
