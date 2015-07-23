Parse.initialize("RJsXk8OshoyQNiUCuRhwSLNuBlWRgLqfZbvlnCsE", "hDqXwY4WH2JyTc95rwyOpL6KqhnWRzc7tsRweAKQ");
var course_id = window.location.href.split("?");
var id = course_id[1];
var score = 0; 
var test_length;
var graphData = [];
var data_adjustment = [];
var content;
var adjust_array=[]
var input_array=[]
var data_array = [];

var Module = Parse.Object.extend("Module");
var query = new Parse.Query(Module);
query.equalTo("objectId", id);
query.find({
  success: function(results) {
    console.log("Successfully retrieved " + results.length + " scores.");
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) {
      var object = results[i];
      var type = object.get("module_type");
      content = object.get("content");
      var parent = object.get("parent_lesson");
      var parentId = parent.id
      console.log(object.id + ' - ' + object.get('name') + ' - ' + type);
      $(".title").text(name);
      switch(type){
        case "text":
          $("#text").removeClass("inactive");
          var title = content[0];
          var text = content[1];
          $(".title").text(title);
          $(".text").text(text);
          break;
        case "test":
          $("#test").removeClass("inactive");
          test_length = content.length;
          for (var i = 0; i < content.length; i++) {
            var question = content[i];
            var qtext = question[0];
            var answers = question[1];
            var answer0 = answers[0];
            var answer1 = answers[1];
            var answer2 = answers[2];
            var answer3 = answers[3];
            var correct = question[2];

            $("#test").append(
              "<div class='qbox q-not' id='q"+[i]+"'>"+
              "<h3 class='qtitle' id='qtitle"+[i]+"'>"+qtext+"</h3>"+
              "<div class='btn btn-default answer' data-correct='"+correct+"' data-value='0' id='ans0' data-qnumber='"+i+"'>"+answer0+"</div>"+
              "<div class='btn btn-default answer' data-correct='"+correct+"' data-value='1' id='ans1' data-qnumber='"+i+"'>"+answer1+"</div><br>"+
              "<div class='btn btn-default answer' data-correct='"+correct+"' data-value='2' id='ans2' data-qnumber='"+i+"'>"+answer2+"</div>"+
              "<div class='btn btn-default answer' data-correct='"+correct+"' data-value='3' id='ans3' data-qnumber='"+i+"'>"+answer3+"</div><br>"+
              "</div>"
              )
          }
          $("#q0").removeClass("q-not");
        break;
        case "video":
          $("#video").removeClass("inactive");
          var link = "https://www.youtube.com/embed/"+content[0]
          $("#video").append(
            "<iframe width='420' height='315' src='"+link+"' frameborder='0' allowfullscreen></iframe>")
        break;
        case "graph-data":
          $("#graph-data").removeClass("inactive");
          var title = content[0];
          $(".title").text(title);
          loadGraphExercise(content);
    }
  }
    $(".back-to-lesson").attr("href","../HTML/lesson-overview.html?"+parentId);
    
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }})

  $("#test").on("click", ".answer", function(){
      var answer = $(this).attr("data-value");
      var correct = $(this).attr("data-correct");
      var qnum = $(this).attr("data-qnumber");
      scoreQuestion(answer, correct, qnum)
  })

$(".next-slide").click(function(){
  var element = $(".p-active");
  var snum = Number(element.attr("id").split("e")[1]);
  if (snum == 0){
      graphData[snum+"-input"] = $("#input"+snum).val();
      changeSlide(element,content);
  } else {
      changeSlide(element,content);
    }
}
  )



var scoreQuestion = function(answer, correct, qnum){
  if (answer == correct) {
    console.log("correct")
    score ++;
  } else{
    console.log("incorrect")
  };
    var num = Number(qnum);
    var nextq = num += 1;
  if (nextq < test_length){
      console.log(nextq)
      $("#q"+qnum).addClass("q-not");
      $("#q"+nextq).removeClass("q-not");
    } else {
      $("#q"+qnum).addClass("q-not");
      $(".title").text(
          "You got "+score+" questions correct out of "+test_length +" questions."
        )
      console.log("done")
    }
}

var loadGraphExercise = function(content){
  var results = content[2];
  var input;
  for (var i = 0; i < results.length; i++) {
    var prompt = results[i]
    if (prompt[1]!=="none"){
     input = "<input type='"+prompt[1]+"' class='slide-input input-"+prompt[1]+"'id='input"+[i]+"'>"
    } else{
      input = "";
    }
  $(".prompts").append(
    "<div class='slide p-not' id='slide"+[i]+"'>"+
      "<h2 class='ptext' id='ptext"+[i]+"' data-adjustment='"+prompt[2]+"'>"+prompt[0]+"</h2><br>"+
      input+
      "</div>"
    )
    data_adjustment.push(prompt[2])
  } 
  
  $("#slide0").removeClass("p-not");
  $("#slide0").addClass("p-active");
}

var changeSlide = function(element, content){
  var snum = Number(element.attr("id").split("e")[1]);
  if (snum !== content[3]){
    var data;
    element.addClass("p-not");
    var nextp = $("#slide"+(snum+1)).text();
    var search1 = nextp.search("%");
    var search2 = nextp.search("@");
    if (search1 !== -1 || search2 !== -1 ){
      /*var co = (nextp.match(new RegExp("%", "g")) || []).length;
      var count = co / 2;*/
      if (search1 !== -1 && search2 === -1){
          var start_pos = nextp.indexOf('%') + 1;
          var end_pos = nextp.indexOf('%',start_pos);
          var inside = nextp.substring(start_pos,end_pos);
          var in_search="%"+inside+"%"
          var inside = Number(inside) -1;
          var key = inside+"-input"
          var rep_text = graphData[key];
          if (typeof rep_text !== "string"){
            rep_text = rep_text + data_adjustment[snum];
          }
          new_text = nextp.replace(in_search,rep_text);
          $("#ptext"+(snum+1)).text(new_text);
          graphData[snum+"-input"] = $("#input"+snum).val();
          input_array.push($("#input"+snum).val())
      } else if (search1 !== -1 && search2 !== -1){
          var start_pos = nextp.indexOf('%') + 1;
          var end_pos = nextp.indexOf('%',start_pos);
          var inside = nextp.substring(start_pos,end_pos);
          var start_pos2 = nextp.indexOf('@') + 1;;
          var end_pos2 = nextp.indexOf('@',start_pos2);
          var inside2 = nextp.substring(start_pos2,end_pos2);
          var in_search="%"+inside+"%"
          var in_search2="@"+inside2+"@"
          var inside = Number(inside)-1;
          var inside2 = Number(inside2)-1;
          var rep_text = graphData[inside+"-input"];
          var rep_text2 = graphData[inside2+"-input"];
          console.log(rep_text2)
          var t2 = Number(rep_text2);
          if (t2 !== NaN){
            rep_text2 = t2 + Number(data_adjustment[snum+1]);
            console.log(rep_text2 + " adjusted2");
          }
          new_text = nextp.replace(in_search,rep_text).replace(in_search2,rep_text2);
          $("#ptext"+(snum+1)).text(new_text);
          input_array.push($("#input"+snum).val())
          adjust_array.push(rep_text2)
      }else if (search1 === -1 && search2 !== -1){
          var start_pos = nextp.indexOf('@') + 1;
          var end_pos = nextp.indexOf('@',start_pos);
          var inside = nextp.substring(start_pos,end_pos);
          var in_search="@"+inside+"@"
          console.log(inside);
          var inside = Number(inside) -1;
          var key = inside+"-input"
          var rep_text = graphData[key];
          console.log(rep_text);
          if (typeof rep_text !== "string"){
            rep_text = rep_text + data_adjustment[snum];
          }
          new_text = nextp.replace(in_search,rep_text);
          $("#ptext"+(snum+1)).text(new_text);
          input_array.push($("#input"+snum).val())
      }
    } 
    $("#slide"+(snum+1)).removeClass("p-not");
    $("#slide"+(snum+1)).addClass("p-active");
    $(element).addClass("p-not");
    $(element).removeClass("p-active");
  } else if (snum === content[3]){
     input_array.push($("#input"+snum).val())
    console.log("graph")
    for (var i = 0; i < adjust_array.length; i++) {
      var array =[Number(adjust_array[i]), Number(input_array[i+3])]
      data_array.push(array)
    }
    console.log(data)
    chartjsGraph(data_array);
    $("#slide"+(snum+1)).removeClass("p-not");
    $("#slide"+(snum+1)).addClass("p-active");
    $(element).addClass("p-not");
    $(element).removeClass("p-active");
    
}}
var data = {
  labels:[],
};

var chartjsGraph = function(array){
  function Comparator(a,b){
  if (a[0] < b[0]){
   return 1
 } else if (a[0] > b[0]){ return -1};
  return 0;
  }
  var x_val= [];
  array = array.sort(Comparator);
  console.log(array+" sortd")
    for (var i = 0; i < data_array.length; i++) {
        var i_array = array[i];   
        console.log(i_array)
        data.labels.push(i_array[1]);
        x_val.push(i_array[0]);
    }
  data.datasets = [{data:x_val}];

  var ctx = $("#graph").get(0).getContext("2d");
  // This will get the first returned node in the jQuery collection.
  var myNewChart = new Chart(ctx);
  var options = {

      ///Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines : true,

      //String - Colour of the grid lines
      scaleGridLineColor : "rgba(0,0,0,.05)",

      //Number - Width of the grid lines
      scaleGridLineWidth : 1,

      datasetFill : false,

    }
  var myLineChart = new Chart(ctx).Line(data, options);
  $("#y-label").text("Price per "+graphData["0-input"])
  $("#x-label").text("Quantity of "+graphData["0-input"]+" Purchased")
}


