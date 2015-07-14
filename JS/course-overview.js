Parse.initialize("RJsXk8OshoyQNiUCuRhwSLNuBlWRgLqfZbvlnCsE", "hDqXwY4WH2JyTc95rwyOpL6KqhnWRzc7tsRweAKQ");

var course_id = window.location.href.split("?");
var course_id = course_id[1];

var Course = Parse.Object.extend("Course");
var query = new Parse.Query(Course);
query.equalTo("objectId", course_id);
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


var Lesson = Parse.Object.extend("Lesson");
var query = new Parse.Query(Lesson);
query.ascending("lesson_number");
query.find({
  success: function(list) {
    
    for (var i = 0; i < list.length; i++) {
     var lesson = list[i];

     var name = lesson.get("name");
     var order = lesson.get("lesson_number");
     
      $(".lesson-list").append(
        "<div class='course' id='"+name+ '-box'+"'>"+
        "<div class='course_pic'></div>"+
        "<h1 class='course_name'>"+ order +". " + name+"</h1>"+
        "<a class='course-a' href='../HTML/lesson-overview.html?"+lesson.id+"'>"+
        "<div class='btn btn-default start-lesson' id='lesson"+i+"' data='"+ lesson.id +"'>"+
        "Begin Lesson</div></a></div>"
        )
  }
}});
    
