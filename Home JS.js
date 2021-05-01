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
let listViewSelected = document.getElementById("list-view-selected");
let gridViewSelected = document.getElementById("grid-view-selected");
let listView = document.getElementById("list-view");
let gridView = document.getElementById("grid-view");

$(document).ready(function(){
    let categories = []; //선택된 분야 넣을 배열
    let searchResult = ""; //검색 결과 넣을 배열
    let contentNumber; //콘텐츠의 총 갯수 넣을 배열
    let division = ""; // 국내, 외국 선택
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
    //국내 / 외국 선택
    $("#domestic").click(function() {
        //선택되었을 때
        if ($("#domestic").css("backgroundColor") == "rgb(255, 255, 255)" || $("#domestic").css("backgroundColor") == "") {
            $("#domestic").css("backgroundColor", "#4FBA80");
            $("#domestic").css("color", "rgb(255, 255, 255)");
            division += "한국"
        }else {
            $("#domestic").css("backgroundColor", "rgb(255, 255, 255)");
            $("#domestic").css("color", "rgb(0, 0, 0)");
            division -= "한국"
        }
    })
    $("#overseas").click(function() {
        if ($("#overseas").css("backgroundColor") == "rgb(255, 255, 255)" || $("#overseas").css("backgroundColor") == "") {
            $("#overseas").css("backgroundColor", "#4FBA80");
            $("#overseas").css("color", "rgb(255, 255, 255)");
            division += "외국"
        }else {
            $("#overseas").css("backgroundColor", "rgb(255, 255, 255)");
            $("#overseas").css("color", "rgb(0, 0, 0)");
            division -= "외국"
        }
    })

    //분야 선택시 색 변하게 & 배열 담아서 선택된 분야에 대한 데이터 보내기
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
    
    //초기화 눌렀을 때 -> 선택된 배열 없게끔
    $("#initialize").click(function(){
        categories = [];
    })
    
    //찾기 눌렀을 때
    $("#filter-search").click(function() {
        var resultUrl = "";
        var qsCategories = "&categories"; //url로 보낼 때 카테고리에 선택된 분야에 대한 배열을 넣기 위한 변수
        //분야 중 선택된 게 없을 때
        for (let index = 0; index < categories.length - 1; index++) {
            qsCategories += categories[index] + ",";
        }
        if (categories.length > 0) {
            qsCategories += categories[categories.length - 1];
        }
        resultUrl += "/writing/search?keyword=&division=" + division + qsCategories + "&sort=good";
        console.log(resultUrl);
        $.ajax({
            url : resultUrl,
            type : "get",
            dataType : "json",
            success : function(data) {
                $(".grid-view").empty();
                $(".list-view").empty();
                searchResult = data;
                contentNumber = searchResult.writing.length;
                let gridContent = "";
                let listContent = "";
                for (let index = 0; index < contentNumber; index++) {
                    let likeIcon = '<img src="icon/like_white.svg">\n';
                    let scrapIcon = '<img src="icon/scrap_white.svg"';
                    if (searchResult.writing[index].isGood == true) {
                        likeIcon = '<img src="icon/like_green.svg">\n';
                    }
                    if (searchResult.writing[index].isScrap == true) {
                        scrapIcon = '<img src="icon/scrap_green.svg"';
                    }
                    gridContent += '<div class="grid-view-content">\n<div class="grid-view-content-img">\n' + scrapIcon + 'class="scrap-icon">' + '<img src=' + searchResult.writing[index].bookimg + ' alt="book image">\n</div>\n';
                    gridContent += '<div class="grid-view-content-like">' + likeIcon + '<span class="like-number">' + searchResult.writing[index].goodCnt + '</span>\n</div>\n';                    
                    gridContent += '<div class="grid-book-info">\n<h1 class="grid-content-title">' + searchResult.writing[index].title + '</h1>\n';
                    gridContent += '<h3 class="grid-book-title">' + searchResult.writing[index].booktitle + '</h3>\n';
                    gridContent += '<p class="summary">' + searchResult.writing[index].content + '</p>\n</div>\n';
                    gridContent += '<div class="write-info">\n<div class="register-profile">\n<img src="' + searchResult.writing[index].userimg + '" >\n';
                    gridContent += '<span class="profile-nickname">' + searchResult.writing[index].nickname + '</span>\n</div>';
                    gridContent += '<span class="register-date">' + searchResult.writing[index].regDate + '</span>\n</div>\n';

                    listContent += '<div class="list-view-content">\n<div class="list-content-number">' + index+1 + '</div>\n';
                    listContent += '<div class="list-content-title">' + searchResult.writing[index].title + '</div>\n';
                    listContent += '<div class="list-book-title">' + searchResult.writing[index].booktitle + '</div>\n';
                    listContent += '<div class="list-profile-nickname">' + searchResult.writing[index].nickname + '</div>\n';
                    listContent += '<div class="list-register-date">' + searchResult.writing[index].regDate + '</div>\n</div>\n';
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

    //scrap 아이콘
    $(".scrap-icon").click(function() {
        var contentIndex = $(".scrap-icon").index(this); //클릭된 콘텐츠의 인덱스
        let contentId = searchResult.writing[contentIndex].no; //콘텐츠의 고유 번호
        var clickScrap = $(".scrap-icon:eq(" + contentIndex + ")");
        //스크랩 추가
        if (clickScrap.attr("src") == "icon/scrap_white.svg") { 
            clickScrap.attr("src", "icon/scrap_green.svg");
            $.ajax ({
                url : "/writings/" + contentId + "/scrap",
                type : "post",
            })
        } else { //스크랩 삭제
            $.ajax ({
                url : "/writings/" + contentId + "/scrap",
                type : "delete",
            })
        }
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
