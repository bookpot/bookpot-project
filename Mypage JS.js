'use strict';

// 이미지 수정 미리보기


$(document).ready(function() {
    // 

    // 미리보기 이미지가 표시될 이미지 태그를 생성, input file 태그 생성하고,
    // js의 FileReader()를 통해 이미지가 로딩되면 이미지 태그의 src 속성이 교체됨

function imageRead (input) {
    // 인풋 태그에 파일이 있는 경우
    if(input.files && input.files[0]) {

        const reader = new FileReader()

        // 이미지 로드가 된 경우
        reader.onload = e => {
            const profileImage = document.getElementById("profile-img") 
            profileImage.src = e.target.result
            // e.target에 src 가져옴
        }
        // reader가 이미지 읽도록 하기(filereader의 readAsDataURL을 통해 파일의 URL읽어오기)
        reader.readAsDataURL(input.files[0])
    }
}

// input file에 change 이벤트 부여
const inputImage = document.getElementById("input-img")
inputImage.addEventListener("change", e => {
    // 이벤트가 대상에 전달될 때마다 change가 호출되도록 설정
    imageRead(e.target)
})

});




// 회원정보 수정 

/* 
유효성 검사항목

1. 닉네임 조건 충족: 한글, 영 대소문자(특수기호, 공백 사용 불가) 2~10자
2. 비밀번호 조건 충족: 8~16자 영문 대 소문자, 문자와 숫자는 최소 하나
3. 비밀번호 일치 충족: 비밀번호와 동일
*/



// 정규식 함수

//닉네임
var nicknameCheck = /^[가-힣a-zA-Z]{2,10}$/;
//특수기호
var symbolCheck = /[~!@#$%^&*()_+|<>?:{}]/; 
//비밀번호
var pwdCheck = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;




//닉네임 유효성 검사
$('#nickname-info').blur(function() {
    if (nicknameCheck.test($('#nickname-info').val())&&!symbolCheck.test($('#nickname').val())) {
        console.log('true');
        $('#nickname-check').text('');
        return true;
    } else {
        console.log('false');
        $('#nickname-check').text('닉네임을 확인해주세요.');
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





/*회원정보 수정 버튼 클릭 이벤트*/

$(document).ready( function() {

    $( '#change-button' ).click( function() { 
        $('#pwd-set').show();

    });

});



/* 비밀번호 확인 버튼 클릭 이벤트*/

$("#nickname-info").prop("disabled", true);

$(document).ready( function() {
    
    $('#pwd-button').click(function() {
        console.log($('#pwd-button').is('disabled'));
        $("#nickname-info").prop("disabled", false);

        /*비번 일치 검사 후 숨기기*/
        $('#pwd-set').hide();

        $('#change-button').hide();
        $('.upload-buttons').show();
        $('#nickname-info').width('386');
        $('#nickname-button').show();
        $('#password-set').show();
        $('#password-2-set').show();

        $('#nickname-info').css('font-weight', 'normal');


        /*회원 탈퇴 버튼 보이기*/
        $('#withdrawal-button').show();
                
    
    });
    
    });
    

/*적용&취소 버튼 클릭 시 이벤트*/
    $(document).ready( function() {

        $( '.upload-buttons' ).click( function() { 
            $('#change-button').show();
            
            $('.upload-buttons').hide();
            $('#nickname-info').width('506');
            $('#nickname-button').hide();
            $('#password-set').hide();
            $('#password-2-set').hide();
            $('#nickname-info').css('font-weight', 'bold');

            console.log($('#pwd-button').is('disabled'));
        $("#nickname-info").prop("disabled", true);
    
        });
    
    });
    

    // 회원탈퇴 버튼 클릭 시 이벤트


    function alertWithdrawl() {
        var result = confirm("정말로 탈퇴하시겠습니까?");
        
        result;
        if (result == true) {
            // 회원탈퇴 처리
            console.log(true);
        }
        else {
            console.log(false);
        }
    }

