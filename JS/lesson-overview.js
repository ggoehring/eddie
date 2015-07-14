Parse.initialize("RJsXk8OshoyQNiUCuRhwSLNuBlWRgLqfZbvlnCsE", "hDqXwY4WH2JyTc95rwyOpL6KqhnWRzc7tsRweAKQ");

var lesson_id = window.location.href.split("?");
var lesson_id = lesson_id[1];

var Lesson = Parse.Object.extend("Lesson");
var query = new Parse.Query(Lesson);
query.equalTo("objectId", lesson_id);
query.first({
  success: function(results) {
    var name = results.get("name");
    var lessons = results.get("Lessons");
    $(".title").text(name);
    
  }, 
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
});


var Module = Parse.Object.extend("Module");
var query = new Parse.Query(Module);
query.ascending("module_number");
query.find({
  success: function(list) {
    
    for (var i = 0; i < list.length; i++) {
     var module = list[i];

     var name = module.get("name");
     var order = module.get("module_number");
     
      $(".lesson-list").append(
        "<div class='course' id='"+name+ '-box'+"'>"+
        "<div class='course_pic'></div>"+
        "<h1 class='course_name'>"+ order +". " + name+"</h1>"+
        "<a class='course-a' href='../HTML/lesson-overview.html?"+module.id+"'>"+
        "<div class='btn btn-default start-lesson' id='lesson"+i+"' data='"+ module.id +"'>"+
        "Begin Lesson</div></a></div>"
        )
  }
}});
    
