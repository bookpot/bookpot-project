//'use strict';


$(document).ready(function () {

var arrayCheck = new Array(); 
var radioChecked = new Array();
var arrayTag = new Array();


    //label, checkbox 선택부분
    $("label").click(function () {

        $('input[type=checkbox]').on('change', function () {
            if ($(this).is(":checked") == true){
                $(this).prev().addClass("selected");
                arrayCheck.push($(this).prev().text());
            }else{
                $(this).prev().removeClass("selected");
                arrayCheck.pop($(this).prev().text());   
            }
            
            if ($('input[type=checkbox]:checked').length > 5){
                alert("5개까지 선택가능합니다.");
                //$(this).prev().Class("selected");
                $(this).prop('checked', false);      
            }

        });
    });  
    console.log(arrayCheck);

     //radio버튼 선택부분
        $('input[type="radio"]').change(function () {
            $('input[type="radio"]').each(function (){
                if ($(this).is(":checked") == true){
                    $(this).next().addClass("selected");
                    radioChecked.push($(this).next().text());
                    
                }else {
                    $(this).next().removeClass("selected");
                }

            });      
            
        }); 

    
    //플러스&마이너스 버튼 관련 요소 숨기기/보이게하기
    $('button[id=plus-button-1]').click(function () {
        if($('.period').css('display') == 'none'){
            $('.period').css('display', 'flex');
            $('#minus-button-1').css('display', 'inline-block;');
        }else{
            $('.period').css('display', 'none');
            $('#minus-button-1').css('display', 'none');
        }
    });

    $('button[id=plus-button-2]').click(function () {
        if($('.highlight').css('display') == 'none'){
            $('.highlight').css('display', 'flex');
            $('#minus-button-2').css('display', 'inline-block;');
        }else{
            $('.highlight').css('display', 'none');
            $('#minus-button-2').css('display', 'none');
        }
    });


    //필수 입력사항들 확인, 경고창 띄우기 
    $('#send-button').click(function () {
        if($('.name-area').value == '') {
            alert('도서명 입력은 필수입니다.');
        }
    });
    // 발행버튼을 눌렀을때, 필수 입력사항들 (서명/저자/국내해외/분야/제목/본문 이중 
    // 하나라도 값이 비었으면 보내지지 않게 하고 경고창 뜨게 한다.)

    //해시태그 달기 기능
    $('#tag').keyup(function(key) {
        if (key.keyCode == 13 && $('#tag').val() !== "") {
            $('tag').addClass("tagClass");
            $('tag').append("#" + $('#tag').val());
            arrayTag.push("#" + $('#tag').val());
            $('#tag').val("");
            console.log(arrayTag);
        }
    });
    


    $("#send-button").click(function() {
        
        $.ajax({
            url : "",
            type : "POST",
            dataType : "json",
            data : {
                bookname : $(".name-area").val(),
                writer : $("#book-writer").val(),
                publish : $("#book-publish").val(),
                radio : radioChecked,
                checkbox : arrayCheck,
                title : $("#title").val(),
                tag : $("#tag").val(),
                firstdate : $("#first-date").val(),
                lastdate : $("#last-date").val(),
                highlight : $("#highlight").val(),
                maintext : $("#maintext").val()

            },
            success : function(result) {
                if(result.success) {
                    console.log("전송 성공");
                    window.location.href = result.returnUrl;
                } else {
                    alert("오류");
                    console.log("오류");
                    console.log(data);
                }
            },
            error : function() {
                alert("에러:전송실패")
                console.log("에러");
                console.log(data);                
            }
        })
        


    })

    

});