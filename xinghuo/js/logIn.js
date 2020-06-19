
/* 登录页 */

/* 账号登录和手机登录tab切换 */
$(".clearFloat li").click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.logInBox1').eq($(this).index()).show().siblings('.logInBox1').hide();
})


/* 账号秘密登录 */
$("#login").click(function () {
    var userName = $('#inp1').val();
    var passWord = $('#inp2').val();
    $.ajax({
        url: 'http://59.111.92.205:13002/api/login',
        type: 'POST',
        data: {
            'username': userName,
            'password': passWord,
            'rememberMe': true,
        },
        success: function (res) {
            console.log(res)
            // console.log(res.total)
            if (res.code === 0) {
                alert('登录成功')
                location.href = "../apply.html";
                localStorage.setItem('islogin', true);
                localStorage.setItem('message', JSON.stringify(res.userInf));
            } else {
                alert('输入的用户名和密码不对!请重新输入')
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
})


/* 手机验证码登录 */

/* 验证码接口 */
$('#authorization').click(function () {

    var userName = $('#inp3').val();
    
    function phoneFun(phones) {
        var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!myreg.test(phones)) {
            alert('手机号格式不正确');
            return false;
        } else {
            console.log('手机号格式正确')

            $.ajax({
                url: 'http://59.111.92.205:13002/api/sendCode?mobile=' + userName,
                type: 'get',
                contentType: 'application/json',
                success: function (res) {
                    // console.log(res)
                    var p1 = $('#authorization');
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
                },
                error: function (err) {
                    console.log(err)
                }
            });

            return true;
        }
    }

    phoneFun(userName)
    /* $.ajax({
        url: 'http://59.111.92.205:13002/api/sendCode?mobile='+userName,
        type: 'get',
        contentType: 'application/json',
        success: function (res) {
            // console.log(res)
        },
        error: function (err) {
            console.log(err)
        }
    });
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
    }, 1000); */
})

/* 登录接口 */
$("#login2").click(function () {
    var userName = $('#inp3').val();
    var passWord = $('#inp4').val();
    $.ajax({
        url: 'http://59.111.92.205:13002/api/login',
        type: 'POST',
        data: {
            'username': userName,
            'password': passWord,
            'rememberMe': true,
        },
        success: function (res) {
            // console.log(res)
            // console.log(res.total)
            if (res.code === 0) {
                alert('登录成功')
                location.href = "../apply.html";
                localStorage.setItem('islogin', true);
                localStorage.setItem('message', JSON.stringify(res.userInf));
            } else {
                alert('输入的用户名和密码不对!请重新输入')
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
})


/* 登录和个人中切换 */
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
            $($('.footBox a')[i]).attr('href',res.rows[0].friendLinkList[i].linkUrl);
        }
        // 版权
        $('#copyright').html(res.rows[0].copyright + ' 网站标识码：' + res.rows[0].websiteId + ' 备案编号：' + res.rows[0].internetContentProvider);
        $('#tgbh').html('电子邮箱： ' + res.rows[0].email + ' 技术支持 ' + res.rows[0].technicalSupport);
    },
    error: function (err) {
        console.log(err)
    }
})
