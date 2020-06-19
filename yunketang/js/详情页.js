




/* 收藏和已收藏 */
$('.collect').click(function () {
    $(this).toggleClass('collectColor')
    $('.collectText').toggle()
})

/* 评论tab切换 */
$('.bottom .libt1').click(function () {
    $(this).addClass('active').siblings().removeClass('active')
    $('.details>li').eq($(this).index()).show().siblings().hide()

})

/* 点击搜索进入搜索页 */
$('.search button').click(function(){
    location.href='../搜索页.html'
})


/* 内容渲染 */
/* 字体图标五角星 */
var iconfont = '<div class="pull-right rightBox"><span class="play"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-bofang"></use></svg></span><span class="view">观看</span></div>';
/* 课程盒子 */
var knob = '<div class="pull-left leftBox"><span class="empty"></span></div>'
$.ajax({
    url: 'http://59.111.104.104:8086/pc/course/detail/' + localStorage.id,
    type: 'get',
    contentType: "application/json;charset=UTF-8",
    success: function (res) {


        /* 目录标题 */
        for (let i = 0; i < res.data.sections.length; i++) {
            var nm1 = "<div class='one'><h3></h3><dt></dt></div>"
            $('#nrxr').append(nm1)
            $($('.one h3')[i]).html(i + 1 + ".&nbsp;&nbsp;" + res.data.sections[i].sectionName + '<button><svg class="icon" aria-hidden="true"><use xlink:href="#icon-ziyuan"></use></svg> 下载</button>')

            /* 目录子标题 */
            for (let j = 0; j < res.data.sections[i].subSections.length; j++) {

                $($('#nrxr dt')[i]).append('<dl class="dlBox">' + iconfont + knob + '</dl>');
                $($('.one')[i]).find('.leftBox').eq(j).html((i + 1) + '-' + (j + 1) + '&nbsp;&nbsp;' + res.data.sections[i].subSections[j].sectionName);



            }


        }

        /* 课程描述 */
        $('.midimg img').attr('src', res.data.coverFileUrl);
        $('.midText h3').html(res.data.courseTitle);
        $('.nrlp').html(res.data.courseDetail);


        /* 观看和播放小按钮 */
        $('.one .dlBox').hover(function () {
            $(this).find('.play').hide()
            $(this).find('.view').show()
        }, function () {
            $(this).find('.play').show()
            $(this).find('.view').hide()
        })


    },
    error: function (err) {
        console.log(err)
    }
})






/* 评论 */
/* 大盒子 */
var plBOx = '<div class="message clearfix"><div class="pull-left"><span class="userimg"><img src="images/头像1.jpeg"></span><span class="userName"></span></div><ul class="pull-right"><li class="lipl"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-xingxing2"></use></svg></li><li class="lipl"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-xingxing2"></use></svg></li><li class="lipl"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-xingxing2"></use></svg></li><li class="lipl"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-xingxing2"></use></svg></li><li class="lipl"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-xingxing2"></use></svg></li></ul></div>'

var publishComment='<div><div class="pl"><p>评论</p><ul class="clearfix"><li><svg class="icon" aria-hidden="true"><use xlink:href="#icon-xingxing2"></use></svg></li><li><svg class="icon" aria-hidden="true"><use xlink:href="#icon-xingxing2"></use></svg></li><li><svg class="icon" aria-hidden="true"><use xlink:href="#icon-xingxing2"></use></svg></li><li><svg class="icon" aria-hidden="true"><use xlink:href="#icon-xingxing2"></use></svg></li><li><svg class="icon" aria-hidden="true"><use xlink:href="#icon-xingxing2"></use></svg></li><li><span>非常好</span></li></ul></div><div class="textk clearfix"><textarea placeholder="请发表您对课程的评价"></textarea><button class="btn1">发布评论</button></div><hr /></div>'
/* 内容评论 */
var nrpl = '<p class="userText"></p>';
/* 评论时间 */
var timepl = '<p class="userTime"></p>';

$.ajax({
    url: 'http://59.111.104.104:8086/pc/comment/commentList/course/' + localStorage.id,
    contentType: "application/json;charset=UTF-8",
    type: 'get',
    success: function (res) {
        // console.log(res.rows)
        $('#userplBox').append(publishComment)
        for (var i = 0; i < res.rows.length; i++) {

            $('#userplBox').append('<div class="userpl clearfix">' + plBOx + nrpl + timepl + '</div>');
            /* 评论内容 */
            $($('.userText')[i]).html(res.rows[i].commentContent);
            $($('.userName')[i]).html(res.rows[i].user.nickname);
            $($('.userTime')[i]).html(res.rows[i].createdTime + '<span> 回复</span>');
        }
    },
    error: function (err) {
        console.log(err)
    }

})









/* 底部渲染 */
$.ajax({
    url: 'http://59.111.104.104:8086/system/dict/data/list/open',
    type: 'post',
    contentType: 'application/x-www-form-urlencoded',
    data: {
        dictType: 'blogroll',
        pageNum: 1,
        pageSize: 10,
        orderByColumn: 'dictSort',
        isAsc: 'asc',
    },
    success: function (res) {
        $($('.link a')[0]).html(res.rows[0].dictLabel).attr('href', res.rows[0].dictValue);
        $($('.link a')[1]).html(res.rows[1].dictLabel).attr('href', res.rows[1].dictValue);
        $($('.link a')[2]).html(res.rows[2].dictLabel).attr('href', res.rows[2].dictValue);
        $($('.link a')[3]).html(res.rows[3].dictLabel).attr('href', res.rows[3].dictValue);
        $($('.link a')[4]).html(res.rows[4].dictLabel).attr('href', res.rows[4].dictValue);
    },
    error: function (err) {
        console.log(err)
    }
})






