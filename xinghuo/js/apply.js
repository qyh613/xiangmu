

/* 大赛报名 */


$("#notice").click(function () {
    $(".midBox1").hide();
    $(".midBox2").show();
})


/* 报名须知 */
$("#return").click(function () {
    $(".midBox1").show();
    $(".midBox2").hide();
})






/* 点击我要报名 */
$(".apply span").click(function () {
    var h1 = localStorage.getItem('islogin')
    if (h1 == 'true') {
        $(".midBox3").show();
        $(".midBox1").hide();
    } else {
        alert('未登录或登录超时，请重新登录');
        location.href = "../logIn.html";
    }
})


$(".midBox3 .return").click(function () {
    $(".midBox3").hide();
    $(".midBox1").show();
})



/* 登录和个人中心切换 */
var h1 = localStorage.getItem('islogin');
if (h1 == 'true') {
    $('.clearFloat .navli2').show()
    $('.clearFloat .navli1').hide()
} else {
    $('.clearFloat .navli1').show()
    $('.clearFloat .navli2').hide()

}

/* 底部信息 */

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



/* 点击提交 */
/* $('.resetBox .submit').click(function(){
    alert('提交成功')
}) */

// $('.resetBox .submit').click(function () {
//     // console.log(1)
//     // 作品名称
//     var worksTitle = $('#worksTitle').val();
//     // 作品方向
//     var projectCategory = $('#projectCategory').val();
//     // 所属行业
//     var industry = $('#industry').val();
//     // 指导老师
//     var instructor = $('#instructor').val();
//     // 创新点
//     var innovationPoint = $('#innovationPoint').val();
//     // 推广引用价值
//     var applicationWhere = $('#applicationWhere').val();
//     // 作品简介
//     var worksBrief = $('#worksBrief').val();

//     // 参赛者姓名
//     var name1 = $('#name1').val();
//     var name2 = $('#name2').val();
//     var name3 = $('#name3').val();
//     // 参赛职务
//     var job1 = $('#job1').val();
//     var job2 = $('#job2').val();
//     var job3 = $('#job3').val();

//     // 性别

//     var gender1 = $('#gender1').val();
//     var gender2 = $('#gender2').val();
//     var gender3 = $('#gender3').val();

//     // 参赛者年龄
//     var age1 = $('#age1').val();
//     var age2 = $('#age2').val();
//     var age3 = $('#age3').val();

//     // 身份证
//     var idNumber1 = $('#idNumber1').val();
//     var idNumber2 = $('#idNumber2').val();
//     var idNumber3 = $('#idNumber3').val();
//     // 手机号
//     var phoneNumber1 = $('#phoneNumber1').val();
//     var phoneNumber2 = $('#phoneNumber2').val();
//     var phoneNumber3 = $('#phoneNumber3').val();

//     var applyName = JSON.stringify([
//         {
//             'name': name1,
//             'job': job1,
//             'gender': gender1,
//             'age': age1,
//             'idNumber': idNumber1,
//             'phoneNumber': phoneNumber1,
//         },
//         {
//             'name': name2,
//             'job': job2,
//             'gender': gender2,
//             'age': age2,
//             'idNumber': idNumber2,
//             'phoneNumber': phoneNumber2,

//         },
//         {
//             'name': name3,
//             'job': job3,
//             'gender': gender3,
//             'age': age3,
//             'idNumber': idNumber3,
//             'phoneNumber': phoneNumber3,
//         }
//     ])




//     $.ajax({
//         url: 'http://59.111.92.205:13002/api/innovation/project/add',
//         type: 'post',
//         contentType: 'application/x-www-form-urlencoded',
//         xhrFields: {


//             withCredentials: true // 要在这里设置 跨域设置cookie 

//         },
//         data: {
//             worksTitle: worksTitle,
//             projectCategory: '1',
//             industry: industry,
//             instructor: instructor,
//             innovationPoint: innovationPoint,
//             participantList: applyName,
//             applicationWhere: applicationWhere,
//             worksBrief: worksBrief,
//             category:'1',
//             contestRegistrationId:'23',

//         },
//         success: function (res) {
//             console.log(res)
//         },
//         error: function (err) {
//             console.log(err)
//         }
//     })
// })




$.ajax({
    url:'http://59.111.92.205:13002/api/innovation/registration/detail',
    type:'post',
    contentType:'application/json',
    data:JSON.stringify({
        'category':'12'
    }),
    success:function(res){
        // console.log(res)
        $('.midBox1 h3').html(res.data.title);
        $('.midBox1 p').html(res.data.introduction);
    },
    error:function(err){
        console.log(err)
    }
})