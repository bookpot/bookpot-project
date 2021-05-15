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
    let qsDivision = ""; // 국내, 외국 선택
    let qsSort = "good"; //인기순(default, good), 최신순(date)
    var resultUrl = "";
    var qsCategories = []; //url로 보낼 때 카테고리에 선택된 분야에 대한 배열을 넣기 위한 변수
    let nowPage = "1";
    //전체 화면 보여주기
    resultUrl = "/writings/search?keyword=&division=&categories=&sort=good&page=1";
    $(".site-name").click(function() {
        resultUrl = "/writings/search?keyword=&division=&categories=&sort=good&page=1";
        nowPage = "1";
        //선택된 배열 초기화
        categories = [];
        qsCategories = [];
        //국내 버튼 선택 해제
        $("#domestic").css("backgroundColor", "rgb(255, 255, 255)");
        $("#domestic").css("color", "rgb(0, 0, 0)");
        //해외 버튼 선택 해제
        $("#overseas").css("backgroundColor", "rgb(255, 255, 255)");
        $("#overseas").css("color", "rgb(0, 0, 0)");
        //분야 버튼 선택 해제
        $(".field").css("backgroundColor", "rgb(255, 255, 255)");
        $(".field").css("color", "rgb(0, 0, 0)");
    })
    $.ajax({
        url : resultUrl,
        type : "get",
        dataType : "json",
        success : function(data) {
            showResult(data)
        }
    })
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
        //국내 선택 되었을 때
        if ($("#domestic").css("backgroundColor") == "rgb(255, 255, 255)" || $("#domestic").css("backgroundColor") == "") {
            console.log("국내 선택");
            //국내 버튼 활성화
            $("#domestic").css("backgroundColor", "#4FBA80");
            $("#domestic").css("color", "rgb(255, 255, 255)");
            //외국 버튼 비활성화
            $("#overseas").css("backgroundColor", "rgb(255, 255, 255)");
            $("#overseas").css("color", "rgb(0, 0, 0)");
            qsDivision = "한국"
        }else { //한 번 더 선택했을 때
            console.log("국내 선택 해제");
            $("#domestic").css("backgroundColor", "rgb(255, 255, 255)");
            $("#domestic").css("color", "rgb(0, 0, 0)");
            qsDivision = ""
        }
    })
    $("#overseas").click(function() {
        //외국 선택 되었을 때
        if ($("#overseas").css("backgroundColor") == "rgb(255, 255, 255)" || $("#overseas").css("backgroundColor") == "") {
            console.log("외국 선택");
            //외국 버튼 활성화
            $("#overseas").css("backgroundColor", "#4FBA80");
            $("#overseas").css("color", "rgb(255, 255, 255)");
            //국내 버튼 비활성화
            $("#domestic").css("backgroundColor", "rgb(255, 255, 255)");
            $("#domestic").css("color", "rgb(0, 0, 0)");
            qsDivision = "외국"
        }else {//한 번 더 선택했을 때
            console.log("외국 선택 해제");
            $("#overseas").css("backgroundColor", "rgb(255, 255, 255)");
            $("#overseas").css("color", "rgb(0, 0, 0)");
            qsDivision = ""
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
        //선택된 배열 초기화
        categories = [];
        qsCategories = [];
        //국내 버튼 선택 해제
        $("#domestic").css("backgroundColor", "rgb(255, 255, 255)");
        $("#domestic").css("color", "rgb(0, 0, 0)");
        //해외 버튼 선택 해제
        $("#overseas").css("backgroundColor", "rgb(255, 255, 255)");
        $("#overseas").css("color", "rgb(0, 0, 0)");
        //분야 버튼 선택 해제
        $(".field").css("backgroundColor", "rgb(255, 255, 255)");
        $(".field").css("color", "rgb(0, 0, 0)");
    })
    
    //찾기 눌렀을 때
    $("#filter-search").click(function() {
        qsCategories = []; //url로 보낼 카테고리 초기화(이중으로 담기는 것을 방지)
        //분야 중 선택된 게 없을 때
        for (let index = 0; index < categories.length - 1; index++) {
            qsCategories += categories[index] + ",";
        }
        if (categories.length > 0) {
            qsCategories += categories[categories.length - 1];
        }
        resultUrl = "/writings/search?keyword=&division=" + qsDivision + "&categories" + qsCategories + "&sort=good" + "&page=1";
        console.log(resultUrl);
        $.ajax({
            url : resultUrl,
            type : "get",
            dataType : "json",
            success : function(data) {
                showResult(data)
            }
        })
    })

    //인기순, 최신순
    $(".best").click(function() {
        if ($(".latest").is(".array-selected")) {
            console.log("인기순으로 전환");            
            $(".best").toggleClass("array-selected");
            $(".latest").removeClass("array-selected");
        }
        qsSort = "good"
        resultUrl = "/writings/search?keyword=&division=" + qsDivision + "&categories" + qsCategories + "&sort=good" + "&page=" + nowPage;
        $.ajax({
            url : resultUrl,
            type : "get",
            dataType : "json",
            success : function(data) {
                showResult(data)
            }
        })
    })
    $(".latest").click(function() {
        if ($(".best").is(".array-selected")) {
            $(".latest").toggleClass("array-selected");
            $(".best").removeClass("array-selected");
        }
        qsSort = "date";
        resultUrl = "/writings/search?keyword=&division=" + qsDivision + "&categories" + qsCategories + "&sort=date" + "&page=" + nowPage;
        $.ajax({
            url : resultUrl,
            type : "get",
            dataType : "json",
            success : function(data) {
                showResult(data)
            }
        })
    })

    //scrap 아이콘
    $(".scrap-icon").click(function() {
        var contentIndex = $(".scrap-icon").index(this); //클릭된 콘텐츠의 인덱스
        console.log("클릭된 콘텐츠의 인덱스 : " + contentIndex);
        let contentId = searchResult.writing[contentIndex].no; //콘텐츠의 고유 번호
        var clickScrap = $(".scrap-icon:eq(" + contentIndex + ")");
        console.log(clickScrap.attr("src"));
        //스크랩 추가
        if (clickScrap.attr("src") == "/resources/icon/scrap_white.svg") { 
            clickScrap.attr("src", "/resources/icon/scrap_green.svg");
            $.ajax ({
                url : "/writings/" + contentId + "/scrap",
                type : "post",
            })
        } else { //스크랩 삭제
            clickScrap.attr("src", "/resources/icon/scrap_white.svg");
            $.ajax ({
                url : "/writings/" + contentId + "/scrap",
                type : "delete",
            })
        }
    })

    //좋아요 아이콘
    $(".like-icon").click(function() {
        var contentIndex = $(".like-icon").index(this); //클릭된 콘텐츠의 인덱스
        console.log("클릭된 콘텐츠의 인덱스 : " + contentIndex);
        let contentId = searchResult.writing[contentIndex].no; //콘텐츠의 고유 번호
        var clickLike = $(".like-icon:eq(" + contentIndex + ")");
        console.log(clickLike.attr("src"));
        //좋아요 추가
        if (clickLike.attr("src") == "/resources/icon/like_white.svg") { 
            clickLike.attr("src", "/resources/icon/like_green.svg");
            $.ajax ({
                url : "/writings/" + contentId + "/good",
                type : "post",
            })
        } else { //좋아요 삭제
            clickLike.attr("src", "/resources/icon/like_white.svg");
            $.ajax ({
                url : "/writings/" + contentId + "/good",
                type : "delete",
            })
        }
    })

    $(".page-number").click(function() {
        let clickPage = $(".page-number").index(this);
        nowPage = clickPage.text();
        resultUrl = "/writings/search?keyword=&division=" + qsDivision + "&categories" + qsCategories + "&sort=date" + "&page=" + nowPage;
        $.ajax({
            url : resultUrl,
            type : "get",
            dataType : "json",
            success : function(data) {
                showResult(data)
            }
        })
    })

    function showResult(data) {
        $("#grid-view").empty();
        $("#list-view").empty();
        $("#page").empty();
        searchResult = data;
        contentNumber = searchResult.writing.length;
        let gridContent = ""; //grid 콘텐츠 들어갈 공간
        let listContent = ""; //list 콘텐츠 들어갈 공간
        let page = "" //page 번호들 들어갈 공간
        for (let index = 0; index < contentNumber; index++) {
            let likeIcon = '<img src="/resources/icon/like_white.svg">\n';
            let scrapIcon = '<img src="/resources/icon/scrap_white.svg"';
            if (searchResult.writing[index].isGood == true) {
                likeIcon = '<img src="/resources/icon/like_green.svg">\n';
            }
            if (searchResult.writing[index].isScrap == true) {
                scrapIcon = '<img src="/resources/icon/scrap_green.svg"';
            }
            gridContent += '<div class="grid-view-content">\n<div class="grid-view-content-img">\n' + scrapIcon + 'class="scrap-icon">' + '<img src=' + searchResult.writing[index].bookimg + ' alt="book image">\n</div>\n';
            gridContent += '<div class="grid-view-content-like">' + likeIcon + '<span class="like-number">' + searchResult.writing[index].goodCnt + '</span>\n</div>\n';                    
            gridContent += '<div class="grid-book-info">\n<h1 class="grid-content-title">' + searchResult.writing[index].title + '</h1>\n';
            gridContent += '<h3 class="grid-book-title">' + searchResult.writing[index].booktitle + '</h3>\n';
            gridContent += '<p class="summary">' + searchResult.writing[index].content + '</p>\n</div>\n';
            gridContent += '<div class="write-info">\n<div class="register-profile">\n<img src="' + searchResult.writing[index].userimg + '" >\n';
            gridContent += '<span class="profile-nickname">' + searchResult.writing[index].nickname + '</span>\n</div>';
            gridContent += '<span class="register-date">' + searchResult.writing[index].regDate + '</span>\n</div>\n';

            listContent += '<div class="list-view-content">\n<div class="list-content-number">' + searchResult.writing[index].idx + '</div>\n';
            listContent += '<div class="list-content-title">' + searchResult.writing[index].title + '</div>\n';
            listContent += '<div class="list-book-title">' + searchResult.writing[index].booktitle + '</div>\n';
            listContent += '<div class="list-profile-nickname">' + searchResult.writing[index].nickname + '</div>\n';
            listContent += '<div class="list-register-date">' + searchResult.writing[index].regDate + '</div>\n</div>\n';
            $("#grid-view").append(gridContent);
            $("#list-view").append(listContent);
        }
        if (searchResult.paging.preBtn == "true") {
            $("#pre-button").show;
        }
        if (searResult.paging.nextBtn == "false") {
            $("pre-button").show;
        }
        for (let index = 1; index <= searchResult.pageNum.length; index++) {
            page += '<div class="page-number">'+ index +'</div>'
        }
        $("#page").append(page);
    }
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
    listViewIcon.src = "/resources/icon/list_green.svg";
    gridViewIcon.src = "/resources/icon/grid_black.svg";
    listView.style.display = "flex"; gridView.style.display = "none" });
gridViewSelected.addEventListener("click", function(){
    let listViewIcon = document.getElementById('list-view-icon');
    let gridViewIcon = document.getElementById("grid-view-icon");
    listViewIcon.src = "/resources/icon/list_black.svg";
    gridViewIcon.src = "/resources/icon/grid_green.svg";
    listView.style.display = "none"; gridView.style.display = "flex" });
