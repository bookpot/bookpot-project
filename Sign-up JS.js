'use strict';

/* 
유효성 검사항목

1. 닉네임 조건 충족: 한글, 영 대소문자(특수기호, 공백 사용 불가) 2~10자
2. 이메일 조건 충족: 이메일 형식
3. 비밀번호 조건 충족: 8~16자 영문 대 소문자, 문자와 숫자는 최소 하나
4. 비밀번호 일치 충족: 비밀번호와 동일

--> 위 조건 완료시 동의하고 회원가입 버튼 활성화

*/

// 정규식 함수

//닉네임
var nicknameCheck = /^[가-힣a-zA-Z]{2,10}$/;
//특수기호
var symbolCheck = /[~!@#$%^&*()_+|<>?:{}]/; 
//이메일: 영 대소문자, 특수문자 가능 + 중간에 @ 필수로 들어가고 .뒤에 2~3글자 들어감
var emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
//비밀번호
var pwdCheck = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;




//닉네임 유효성 검사
$('#nickname').blur(function() {
    if (nicknameCheck.test($('#nickname').val())&&!symbolCheck.test($('#nickname').val())) {
        console.log('true');
        $('#nickname-check').text('');
        return true;
    } else {
        console.log('false');
        $('#nickname-check').text('닉네임을 확인해주세요.');
    }
});


//이메일 인증번호 입력 창 숨겨놓기
$('.email-code-set').hide();

//이메일 유효성 검사
$('#email').blur(function() {
    if (emailCheck.test($('#email').val())) {
        
            $('#email-check').text('');
            $('.email-code-set').show(); 
            return true;
            
    } else {
        console.log('false');
        $('#email-check').text('이메일을 확인하세요.');

    }
});



//비밀번호 유효성 검사
$('#password').blur(function() {
    if (pwdCheck.test($('#password').val())) {
        console.log('true');
        $('#pwd-check').text('');
        return true;
    } else {
        console.log('false');
        $('#pwd-check').text('비밀번호를 확인하세요.');
    }
});



//비밀번호 일치 확인 검사
$('#password-2').blur(function() {
    if ($('#password').val() == $(this).val()) {
        console.log('true');
        $('#pwd2-check').text('');
        return true;
    } else {
        console.log('false');
        $('#pwd2-check').text('비밀번호가 일치하지 않습니다.');
    }
});





/* 동의하고 회원가입 버튼 비활성화*/
$('#submit-button').prop("disabled", true);



/*회원가입 버튼 활성화 조건*/
$('#password-2').blur(function() {
    if (nicknameCheck.test($('#nickname').val())&&
    emailCheck.test($('#email').val())&&
    pwdCheck.test($('#password').val())&&
    $('#password').val() == $('#password-2').val()) 
    
    
    {   //조건 충족시 버튼 활성화 & 버튼색 변경
        $('#submit-button').prop("disabled", false);
        $('#submit-button').css("background-color", "#0f9b6b");
    }


    });

    // 제출버튼 클릭하면 회원가입 완료페이지로 이동
        $('#submit-button').click(function() {
            /*if (('#submit-button').prop("disabled", false))*/
            {location.href='Sign-up complete HTML.html';
            console.log("true");
            }
    });


