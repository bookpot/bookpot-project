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

console.log('a\nb\nc');

$(document).ready(function(){
    // 로그인 창 띄우고&닫기
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

    //분야 선택시 색 변하게 & 배열 담아서 선택된 분야에 대한 데이터 보내기
    var categories = new Array(); //선택된 분야 넣을 배열
    $(".field").click(function() {
        var index = $(".field").index(this);
        var clickButton = $(".field:eq(" + index + ")");
        //선택되었을 때
        if (clickButton.css("backgroundColor") == "rgb(255, 255, 255)" || clickButton.css("backgroundColor") == "") {
            console.log("하이라이트 버튼으로 변경");
            clickButton.css("backgroundColor", "#4FBA80");
            clickButton.css("color", "rgb(255, 255, 255)");
            categories.push(clickButton.text());
        } else { //선택 해제되었을 때
            console.log("기본 버튼으로 변경");
            clickButton.css("backgroundColor", "rgb(255, 255, 255)");
            clickButton.css("color", "rgb(0, 0, 0)");
            categories.splice(categories.indexOf(clickButton.text()),1);
        }
        console.log(categories);
    })
    //찾기 눌렀을 때
    $("#filter-search").click(function() {
        var resultUrl = "";
        var qsCategories = "";
        //분야 중 선택된 게 없을 때
        if (categories.length == 0) {
            qsCategories += "&categories=";
        }else {
            for (let index = 0; index < categories.length; index++) {
                qsCategories += "&categories=" + categories[index];
            }
        }
        
        resultUrl += "/writing/search?keyword=&division=" + qsCategories + "&sort=good";
        console.log(resultUrl);
        $.ajax({
            url : resultUrl,
            type : "get",
            dataType : "json",
            success : function(data) { 
                const searchResult = JSON.parse(data);
                let gridContent = "";
                for (let index = 0; index < searchResult.writing.length; index++) {
                    let likeIcon = '<img src="icon/like_white.svg">\n';
                    if (searchResult.writing[index].isGood == true) {
                        likeIcon = '<img src="icon/like_green.svg">\n';
                    }
                    gridContent += '<div class="grid-view-content">\n<div class="grid-view-content-img">' + '<img src=' + searchResult.writing[index].bookimg + ' alt="book image">\n</div>\n';
                    gridContent += '<div class="grid-view-content-like">' + likeIcon + '<span class="like-number">' + searchResult.writing[index].goodCnt + '</span>\n</div>\n';                    
                    gridContent += '<div class="grid-book-info">\n<h1 class="grid-content-title">' + searchResult.writing[index].title + '</h1>\n';
                    gridContent += '<h3 class="grid-book-title">' + searchResult.writing[index].booktitle + '</h3>\n';
                    gridContent += '<p class="summary">' + searchResult.writing[index].content + '</p>\n</div>\n</div>'
                }
                $("#grid-view").append(gridContent);
            }
        })
    })

    //인기순, 최신순
    $(".best").click(function() {
        $(".best").toggleClass("array-selected");
        $(".latest").removeClass("array-selected");
    })
    $(".latest").click(function() {
        $(".latest").toggleClass("array-selected");
        $(".best").removeClass("array-selected");
    })
})

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
