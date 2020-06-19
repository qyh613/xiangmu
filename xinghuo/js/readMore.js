

/* 动态详情 */

$.ajax({
    url: 'http://59.111.92.205:13002/api/innovation/notice/detail',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify({
        'id': localStorage.id
    }),
    success: function (res) {
        console.log(res)
        $("#header").html(res.data.title)
        $("#p1").html('发布时间:'+res.data.publishTime)
        $("#p2").html(res.data.content)
    },
    error: function (err) {
        console.log(err)
    }
})

var h1 = localStorage.getItem('islogin');
if(h1 == 'true'){
    $('.clearFloat .navli2').show()
    $('.clearFloat .navli1').hide()
}else{
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
