var h1 = localStorage.getItem('islogin');
if (h1 == 'true') {
    $('.clearFloat .navli2').show()
    $('.clearFloat .navli1').hide()
} else {
    $('.clearFloat .navli1').show()
    $('.clearFloat .navli2').hide()

}
// 手机验证码
$('#codeBtn').click(function () {
    /* 计时器 */
    var p1 = $('#codeBtn');
    var time = 59;
    p1.html('(&nbsp;' + time + '&nbsp;)&nbsp;&nbsp;后重试');
    p1.css({
        backgroundColor: '#f8f8f9',
        // borderColor:'#C0C0C0',
        cursor: 'not-allowed',
        color: '#C0C0C0'
    });
    var timeFunc = setInterval(function () {
        time--;
        if (time < 10 && time > 0) {
            p1.html( time + '后重试');

            // p1.html('(&nbsp;0' + time + '&nbsp;)&nbsp;&nbsp;后重试');
            p1.prop('disabled', 'true');
        } else if (time >= 10) {
            p1.html( time + '后重试');
            // p1.html('(&nbsp;' + time + '&nbsp;)&nbsp;&nbsp;后重试');
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
    // 手机号
    var phonenumber = $('#phonenumber').val();

    console.log(phonenumber);

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


// 更改密码
$('#alterBtn').click(function () {
    var phonenumber = $('#phonenumber').val();
    var password = $('#password').val();
    var code = $('#code').val()
    $.ajax({
        url: 'http://59.111.92.205:13002/api/findPwd',
        type: 'post',
        contentType: 'application/json',


        data: JSON.stringify({
            'phonenumber': phonenumber,
            'password': password,
            'code': code
        }),
        success: function (res) {
            console.log(res)
        },
        error: function (err) {
            console.log(err)
        }
    })


})





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
