$(document).ready(function(){
    $("#tests").mouseenter(function(){
        $("#testlist").show();
        $(this).addClass('testmedia');
    }),
    $("#tests").mouseleave(function(){
        $("#testlist").hide();
        $(this).removeClass('testmedia');
    });
    $('#paragraphContent').show();
    $('#testlist span').addClass('testvalue');
    $(".testvalue").click(function(){
        $('#questionContent').show();
         $('#testContent').show();
        $("#scoreContent, #paragraphContent, #aboutContent, #servicesContent, #contactContent").hide();
                 var x=$(this).text();
                if(x == "HTML5"){
                    var htmlurl='json/html.json';
                }else if(x == "CSS3"){
                    var htmlurl='json/css.json';
                }else if(x == "JavaScript"){
                    var htmlurl='json/js.json';
                }else if(x == "JQuery"){
                    var htmlurl='json/jquery.json';
                }else{
                    var htmlurl='json/ajax.json';
                }
      $(".submitbutton").hide();
      $("#questionary h1 span").html("");    
        
        $.getJSON( htmlurl, function(data) {
            
            var arr = new Array();
            var ansArray = new Array();
            var userAnsarray = new Array();
            var a=0;
            var count=0;
            var i=0, j=-1, score=0;
            var uName = "";
            
            $("#questionContent").html("<p>Begin your " + x +" assessment by clicking Start <br/><br/>Enter your name: <input id='userName' type='text' name='username'></p>");
            $(".nextbutton").html("<button id='next' class='nextbtn'>Start</button>");
            
            $.each(data, function(key, value){ 
                var valOpt =value.options;
                arr.push(
                            "<br/>"+ value.question +
                                 "<br/><label><input type='radio' name='btn1' class='chbox' value='1'>" + valOpt.option1 +"</label>"+
                                 "<br/><label><input type='radio' name='btn1' class='chbox' value='2'>" +valOpt.option2 +"</label>"+
                                 "<br/><label><input type='radio' name='btn1' class='chbox' value='3'>" + valOpt.option3 +"</label>"+
                                 "<br/><label><input type='radio' name='btn1' class='chbox' value='4'>" +valOpt.option4 +"</label>"
                ); 
                ansArray.push(value.answer);
            });
            
            $("#next").click(function(){
                if($("#userName").val() != null)
                {
                    uName = ($("#userName").val());
                }
                if(uName == ""){
                    $("#questionary h1 span").html(" Guest");
                }
                else{
                    $("#questionary h1 span").html(" "+uName);
                }
                var ansChecked = $('input[name=btn1]').filter(':checked').val();
                userAnsarray.push(ansChecked);
                if (a==10){
                    $(".submitbutton").html("<button id='submit' class='nextbtn'>Submit</button>").show();
                   }
                else{
                    $(this).html("Next");
                    $("#questionContent").html(arr[a]).addClass('qno');
                    a++;  
                    }
                if(ansArray[j] == userAnsarray[i]){
                    score++;
                }
                i++;
                j++;
            });
            
            $(".submitbutton").click(function(){
                var finalScore= score-1;
                var average = (finalScore/10)*100;
                var status = function(){
                    if (finalScore < 7){
                       var rslt = "Poor";
                    }else if(finalScore = 7){
                        var rslt = "Average";
                    }else{
                        var rslt = "Excellent";
                    }
                    return rslt;
                }
                $('#testContent').hide();
                $('#scoreContent').show().css('margin-top','25px');
                $('#score').html(finalScore);
                $('#average').html(average+"%");
                $('#status').html(status());
                
                
            });
        
        });   
    });
  $("#home").click(function(){
        $('#testContent, #paragraphContent').show();
        $("#scoreContent, #aboutContent, #contactContent, #questionContent, button, input").hide(); 
     });
       $("#about").click(function(){
        $('#aboutContent').show().load("templates/about.html");
        $("#scoreContent, #testContent, #paragraphContent,  #contactContent, #questionContent, button, input").hide(); 
     });
    
      $("#contus").click(function(){
        $('#contactContent').show().load("templates/contact.html");
        $("#scoreContent, #testContent, #paragraphContent, #aboutContent, #questionContent, button, input").hide(); 
     });
});    
