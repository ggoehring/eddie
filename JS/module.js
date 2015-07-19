Parse.initialize("RJsXk8OshoyQNiUCuRhwSLNuBlWRgLqfZbvlnCsE", "hDqXwY4WH2JyTc95rwyOpL6KqhnWRzc7tsRweAKQ");
var course_id = window.location.href.split("?");
var id = course_id[1];
var score = 0; 
var test_length;


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
      var content = object.get("content");
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



