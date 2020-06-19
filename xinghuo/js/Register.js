$(".clearFloat .choice").click(function () {
    $(this).addClass('active').siblings('.choice').removeClass('active');
    $('.logIn form').eq($(this).index()).show().siblings('form').hide()
})



/* 获取验证码 */

$(".formBox2 button").click(function () {
    var p1 = $(this);
    var time = 59;
    p1.html('(&nbsp;' + time + '&nbsp;)&nbsp;&nbsp;后重试');
    p1.css({
        backgroundColor: '#f8f8f9',
        cursor: 'not-allowed',
        color: '#C0C0C0'
    });
    var timeFunc = setInterval(function () {
        time--;
        if (time < 10 && time > 0) {
            p1.html('(&nbsp;0' + time + '&nbsp;)&nbsp;&nbsp;后重试');
            p1.prop('disabled', 'true');
        } else if (time >= 10) {
            p1.html('(&nbsp;' + time + '&nbsp;)&nbsp;&nbsp;后重试');
            p1.prop('disabled', 'true');
        } else if (time == 0) {
            clearInterval(timeFunc);
            p1.html('获取验证码');
            p1.prop('disabled', 'false');
            p1.css({
                backgroundColor: '#2d8cf0',
                cursor: 'pointer',
                color: '#fff'
            })
        }
    }, 1000);
})



// 手机验证码
$('#codeBtn').click(function () {
    // 手机号
    var phonenumber = $("#phonenumber").val();
    // console.log(phonenumber);
    $.ajax({
        url: 'http://59.111.92.205:13002/api/sendCode?mobile=' + phonenumber,
        type: 'get',
        contentType: 'application/json',
        success: function (res) {
            console.log(res)
        },
        error: function (err) {
            console.log(err)
        }
    })
})




// // 注册
$(".registerBox button").click(function () {

    // 用户名
    var loginName = $("#loginName").val();
    // 密码
    var password = $("#password").val();
    // 真实姓名
    var userName = $("#userName").val();
    // 邮箱
    var email = $("#email").val();
    // 验证码
    var code = $("#code").val();
    // 身份证
    var idNumber = $("#idNumber").val();
    // 手机号
    var phonenumber = $("#phonenumber").val();
    // 学校
    var school = $('#school').val();
    // 专业
    var profession = $('#profession').val();
    // 班级
    var grade = $('#grade').val();
    $.ajax({
        url: 'http://59.111.92.205:13002/api/register',
        type: 'post',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true // 要在这里设置 跨域设置cookie 
        },
        data: JSON.stringify({
            'loginName': loginName,
            'userName': userName,
            'password': password,
            'email': email,
            'phonenumber': phonenumber,
            'code': code,
            'idNumber': idNumber,
            'school': school,
            'profession': profession,
            'grade': grade,
        }),
        success: function (res) {
            // console.log(res)
            alert("注册成功！请登录");
            location.href = "../logIn.html";
        },
        error: function (err) {
            console.log(err)
        }
    })
})





var h1 = localStorage.getItem('islogin');
if (h1 == 'true') {
    $('.clearFloat .navli2').show()
    $('.clearFloat .navli1').hide()
} else {
    $('.clearFloat .navli1').show()
    $('.clearFloat .navli2').hide()
}









/* 底部渲染 */
$.ajax({
    url: 'http://59.111.92.205:13002/api/innovation/footerInfo/list',
    type: 'POST',
    contentType: 'application/x-www-form-urlencoded',
    success: function (res) {
        console.log(res.rows[0].friendLinkList)
        // console.log(res.rows[0])
        for (var i = 0; i < res.rows[0].friendLinkList.length; i++) {
            $($('.footBox a')[i]).html(res.rows[0].friendLinkList[i].linkName);
            $($('.footBox a')[i]).attr('href', res.rows[0].friendLinkList[i].linkUrl);
        }
        // 版权
        $('#copyright').html(res.rows[0].copyright + ' 网站标识码：' + res.rows[0].websiteId + ' 备案编号：' + res.rows[0].internetContentProvider);
        $('#tgbh').html('电子邮箱： ' + res.rows[0].email + ' 技术支持 ' + res.rows[0].technicalSupport);
    },
    error: function (err) {
        console.log(err)
    }
})
