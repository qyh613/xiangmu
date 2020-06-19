

/* qq群显示隐藏 */
$("#liShow").hover(function () {
    $(".zwer").show();
}, function () {
    $(".zwer").hide();
})



$(".sectionLeft li").click(function () {
    $(".sectionLeft li").find('img').attr('src', 'images/wxz.png');
    $(this).find("img").attr('src', "images/xz.png").not($(this)).find("img").attr('src', 'images/wxz.png');
    $(".sectionRight .box1").eq($(this).index()).show().siblings(".box1").hide();
})



// 主体后天获取数据
function data(x, img, bt, time) {
    $.ajax({
        url: 'http://59.111.92.205:13002/api/innovation/notice/list',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            'type': x,
        }),
        success: function (res) {
            // console.log(res)
            localStorage.setItem('id', res.rows[0].id)
            img.attr('src', res.rows[0].coverUrl);
            bt.html(res.rows[0].title);
            time.html(res.rows[0].publishTime);
        },
        error: function (err) {
            console.log(err);
        }
    })
}


/* 通知公告 */
var one = data(1, $('.liImg #img1'), $($('.liJs a')[0]), $($('.time span')[0]));

/* 创新活动 */
$('#innovate').click(function () {
    data(2, $('.liImg #img2'), $('.liJs #a2'), $('.time #span2'))
});

/* 荣誉 */
$('#honor').click(function () {
    data(3, $('.liImg #img3'), $('.liJs #a3'), $('.time #span3'))
});




/* 登录和个人中心切换 */
var h1 = localStorage.getItem('islogin');
if (h1 == 'true') {
    $('.clearFloat .navli2').show()
    $('.clearFloat .navli1').hide()
} else {
    $('.clearFloat .navli1').show()
    $('.clearFloat .navli2').hide()
}

// console.log($('.footBox a'))
/* 底部渲染 */



$.ajax({
    url: 'http://59.111.92.205:13002/api/innovation/footerInfo/list',
    type: 'POST',
    contentType: 'application/x-www-form-urlencoded',
    success: function (res) {
        // console.log(res.rows[0].friendLinkList)
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

