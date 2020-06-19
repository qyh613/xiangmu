

$(".midLeft li").click(function () {
    $(this).addClass('mlLi').siblings().removeClass('mlLi');
    $(".midRight > div").eq($(this).index()).show().siblings().hide();
})

var h1 = localStorage.getItem('islogin');
if (h1 == 'true') {
    $('.clearFloat .navli2').show()
    $('.clearFloat .navli1').hide()
} else {
    $('.clearFloat .navli1').show()
    $('.clearFloat .navli2').hide()

}


/* 退出登录 */
$('#quitBtn').click(function () {
    localStorage.setItem('islogin', false);
    location.href="../logIn.html"
})



/* 渲染个人信息数据 */
var message = JSON.parse(localStorage.getItem('message'))

// 用户名
$('#loginName').val(message.loginName);
// 手机号
$('#phonenumber').val(message.phonenumber);
// 姓名
$('#userName').val(message.userName);
// 身份证
$('#idNumber').val(message.idNumber);
// 邮箱
$('#email').val(message.email);
// 学校
$('#school').val(message.school);
// 专业
$('#profession').val(message.profession);
// 班级
$('#grade').val(message.grade);


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




/* 渲染参赛信息 */

/* $('#message').click(function () {
    $.ajax({
        url: 'http://59.111.92.205:13002/api/innovation/project/selectProjectBycreateBy',
        type: 'post',
        contentType: 'application/json',
        success: function (res) {
            console.log(res)
        },
        error: function (err) {
            console.log(err)
        }
    })
}) */