Parse.initialize("RJsXk8OshoyQNiUCuRhwSLNuBlWRgLqfZbvlnCsE", "hDqXwY4WH2JyTc95rwyOpL6KqhnWRzc7tsRweAKQ");

var course_name = $(".name").val();
var Course = Parse.Object.extend("Course");
var query = new Parse.Query(Course);
query.find({
  success: function(results) {
    console.log("Successfully retrieved " + results.length + " scores.");
   
    for (var i = 0; i < results.length; i++) {
      var course = results[i];
      course.name = course.get("name");
      $(".course-list").append(
        "<div class='course' id='"+course.name+ '-box'+"'>"+
        "<div class='course_pic'></div>"+
        "<h1 class='course_name'>"+course.name+"</h1>"+
        "<a class='course-a' href='../HTML/course-overview.html?"+course.id+"'><div class='btn btn-default start-course' id='course"+i+"' data='"+ course.id +"'>"+
        "Resume Course</div></a></div>"
        )
    }
  },
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
});



