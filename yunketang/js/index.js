


/* 进入搜索页 */

$('#searchBtn').click(function () {

    // $('#searchSS').val();
    // console.log(1)
    localStorage.setItem('keyword', $('#searchSS').val());

    /* 进入状态 */
    localStorage.setItem('price', true);

    // location.href = "../搜索页.html";
    location.href = "../搜索页.html";
})




/* 轮播图 */
var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay: true,
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})



/* 直播课程tab切换 */
$(".box_right li").mouseover(function () {
    $(this).addClass('active').siblings().removeClass('active');

    $('.box_left img').eq($(this).index()).show().siblings('.box_left img').hide();

    $('.shade').eq($(this).index()).show().siblings('.shade').hide();

})




/* 专题列表 */

$.ajax({
    url: 'http://59.111.104.104:8086/weChat/applet/subject/list',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify({
        'enable': 1,
    }),
    success: function (res) {
        // console.log(res.rows)
        $('#lessonClassify').append('<ul class="classify"></ul>')
        for (var i = 0; i < res.rows.length; i++) {
            $('.classify').append('<li name=' + res.rows[i].subjectId + '><a></a></li>')
            $($('.classify a')[i]).html(res.rows[i].title)
        }

        /* 分类 */
        $('.classify li').click(function () {
            localStorage.setItem('lessonID', $(this).attr('name'))
            var course = $(this).find('a').html();
            localStorage.setItem('course', course);
            localStorage.setItem('price', false);
            location.href = "../搜索页.html"
        })

    },
    error: function (err) {
        console.log(err)
    }
})






/* 轮播图渲染 */
$.ajax({
    url: 'http://59.111.104.104:8086/weChat/applet/course/banner/list',
    type: 'get',
    data: {
        number: 5
    },
    success: function (res) {
        // console.log(res.data[2].imgUrlPc)
        $($('.lbImg')[0]).css({
            backgroundImage: "url(" + res.data[4].imgUrlPc + ")"
        })
        $($('.lbImg')[1]).css({
            backgroundImage: "url(" + res.data[0].imgUrlPc + ")"
        })
        $($('.lbImg')[2]).css({
            backgroundImage: "url(" + res.data[1].imgUrlPc + ")"
        })
        $($('.lbImg')[3]).css({
            backgroundImage: "url(" + res.data[2].imgUrlPc + ")"
        })
        $($('.lbImg')[4]).css({
            backgroundImage: "url(" + res.data[3].imgUrlPc + ")"
        })
        $($('.lbImg')[5]).css({
            backgroundImage: "url(" + res.data[4].imgUrlPc + ")"
        })
        $($('.lbImg')[6]).css({
            backgroundImage: "url(" + res.data[0].imgUrlPc + ")"
        })
    },
    error: function (err) {
        console.log(err)
    }
})






/* 商品渲染 */
// type 状态
// pageNum      页数
// pageSize     个数
// x            标签下标
// y            获取下标
var arr = [];

function commodity(type, pageNum, pageSize, x, y) {
    $.ajax({
        url: 'http://59.111.104.104:8086/weChat/applet/course/list/type',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            type: type,
            pageNum: pageNum,
            pageSize: pageSize,
        },
        /* 改成同步执行 */
        async: false,
        success: function (res) {
            // console.log(res)
            /* 数据渲染 */
            console.log($($('.commodityLi')[x]));
            $($('.commodityLi')[x]).attr('name', res.rows[y].courseId);
            $($('.imgBox img')[x]).attr('src', res.rows[y].coverFileUrl);
            $($('p.bt')[x]).html(res.rows[y].courseTitle);
            $($('span.festival')[x]).html('&nbsp;' + res.rows[y].subSectionNum + '&nbsp;');
            $($('span.person')[x]).html(res.rows[y].participationsCount);
        },
        error: function (err) {
            console.log(err)
        }
    })

}

// console.log($('.imgBox img'))      图片
// console.log($('p.bt'))             标题
// console.log($($('span.festival'))) 节课
// console.log($($('span.person')))   人数


/* 免费 */
commodity('free', 1, 10, 0, 0);
commodity('free', 1, 10, 1, 1);
commodity('free', 1, 10, 2, 2);
commodity('free', 1, 10, 3, 3);
commodity('free', 1, 10, 4, 4);
commodity('free', 1, 10, 5, 5);
commodity('free', 1, 10, 6, 6);
commodity('free', 1, 10, 7, 7);
commodity('free', 1, 10, 8, 8);
commodity('free', 1, 10, 9, 9);

/* 精品课程 */
commodity('boutique', 1, 5, 10, 0);
commodity('boutique', 1, 5, 11, 1);
commodity('boutique', 1, 5, 12, 2);
commodity('boutique', 1, 5, 13, 3);
commodity('boutique', 1, 5, 14, 4);

/* 折扣课程 */
commodity('discount', 1, 5, 15, 0);
commodity('discount', 1, 5, 16, 1);
commodity('discount', 1, 5, 17, 2);
commodity('discount', 1, 5, 18, 3);
commodity('discount', 1, 5, 19, 4);



/* 进入缓冲页 */
// $('.commodityUl')
$('.commodityLi').click(function () {
    localStorage.setItem('id', $(this).attr('name'));
    location.href = "../详情页.html"

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



