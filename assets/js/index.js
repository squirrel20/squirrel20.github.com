
$(document).ready(function(){
    $(".page-header h1").before("<a class='jump' id='jump0'></a>");
    $(".index").append("<li><a  class='index-h1' href='#jump0'>" + $("title").text() + "</a></li>");
    var curNum = 1;
    $(".post-content h1, .post-content h2, .post-content h3, .post-content h4").each(function(){
        $(this).before("<a class='jump' id='jump" + curNum +"'></a>");
        var cname;
        if( $(this).is("h1") )
            cname = "h1";
        else if( $(this).is("h2") )
            cname = "h2";
        else if( $(this).is("h3") )
            cname = "h3";
        else
            cname = "h4";
            
        $(".index").append("<li><a href='#jump" + curNum + "' class='index-" + cname + "'>" + $(this).text() + "</a></li>");
        curNum++;
    });

    $(".topbar2").css("margin-top", ($(".menu").height() - $(".container").height()) + "px");
    $(window).scroll(function(){
        if($(window).scrollTop() > ($(".container").height() - $(".menu").height())){
            $(".topbar2").show();
            $(".topbar1").css("visibility", "hidden");
        }else{
            $(".topbar2").hide();
            $(".topbar1").css("visibility", "initial");
        }
    });
});
