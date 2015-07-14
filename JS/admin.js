Parse.initialize("RJsXk8OshoyQNiUCuRhwSLNuBlWRgLqfZbvlnCsE", "hDqXwY4WH2JyTc95rwyOpL6KqhnWRzc7tsRweAKQ");


var Course = Parse.Object.extend("Course");
var query = new Parse.Query(Course);
query.find({
  success: function(results) {
    console.log("Successfully retrieved " + results.length + " courses.");
   
    for (var i = 0; i < results.length; i++) {
      var course = results[i];
      course.name = course.get("name");
      $(".select-course").append(
        	"<option value='"+course.id+"'>"+course.name+"</option>"
        )
      $(".select-lesson").append(
        	"<optgroup id='"+course.id+"-group' label='"+course.name+"'>"
        )
    }
  },
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
});

var Lesson = Parse.Object.extend("Lesson");
var query = new Parse.Query(Lesson);
query.find({
  success: function(results) {
    console.log("Successfully retrieved " + results.length + " lessons.");
   
    for (var i = 0; i < results.length; i++) {
      var lesson = results[i];
      lesson.name = lesson.get("name");
      var id = lesson.id;
      var parent_course = lesson.get("parent_course");
      var parent_id = parent_course.id;
      
      $("#"+parent_id+"-group").append(
        	"<option value='"+id+"' data='"+ parent_id +"'>"+lesson.name+"</option>"
        )
    }
  },
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
});

$("#c-submit").click(function(){
	var name = $("#course_name").val();
	newCourse(name);
})

$("#l-submit").click(function(){
	var name = $("#lesson_name").val();
	var parent_course = $("#select-course-l").val();
	var order = $("#lesson_number").val();
	newLesson(name, parent_course, order);
})

$("#m-submit").click(function(){
	var name = $("#module_name").val();
	var parent_lesson = $("#select-lesson-m").val();
	var order = $("#module_number").val();
	var type = $("#select-type").val();
	newModule(name, parent_lesson, order, type);
})



var newCourse = function(name){
	var Course = Parse.Object.extend("Course");
	var course  = new Course ();

	course.set("name", name);


	course.save(null, {
	  success: function(course) {
	  	var name = course.get("name");
	    $(".select-course").append(
	        	"<option value='"+course.id+"'>"+name+"</option>"
	        )

	   $("#course_name").val("");
	  },
	  error: function(course, error) {
	    console.log('Failed to create new object, with error code: ' + error.message);
	  }
	});
};

var newLesson = function(name,parent_course,order){
	var Course = Parse.Object.extend("Course");
	var query = new Parse.Query(Course);
	query.equalTo("objectId", parent_course);
	query.first({
	  success: function(results) {
	    console.log("Query 1: " + results)
	    var Lesson = Parse.Object.extend("Lesson");
		var lesson  = new Lesson ();
		lesson.set("name", name);
		lesson.set("parent_course", results);
		lesson.set("lesson_number", order);
		lesson.set("completed", false);
		console.log("After Set: " + results);

		lesson.save(null, {
		  success: function(lesson) {
		        	
		     console.log("New Lesson: " + lesson.id)
		     console.log("After Save: " + results);

		     var relation = results.relation("Lessons");
		     relation.add(lesson);
		     results.save();
		      
		  },
		  error: function(course, error) {
		    console.log('Failed to create new object, with error code: ' + error.message);
		  }
		});
			

	  },
	  error: function(object, error) {
	  	console.log('Failed to create new object, with error code: ' + error.message);
	  }
	})};

var newModule = function(name,parent_lesson,order,type){

	var Lesson = Parse.Object.extend("Lesson");
	var query = new Parse.Query(Lesson);
	query.equalTo("objectId", parent_lesson);
	query.first({
	  success: function(results) {
	    console.log("Query 1: " + results)
	    var Module = Parse.Object.extend("Module");
		var module  = new Module ();
		module.set("name", name);
		module.set("parent_lesson", results);
		module.set("module_number", order);
		module.set("type",type);
		module.set("completed", false);
		console.log("After Set: " + results);

		module.save(null, {
		  success: function(module) {
		        	
		     console.log("New Lesson: " + module.id)
		     console.log("After Save: " + results);

		     var relation = results.relation("Lessons");
		     relation.add(module);
		     results.save();
		      
		  },
		  error: function(course, error) {
		    console.log('Failed to create new object, with error code: ' + error.message);
		  }
		});
			

	  },
	  error: function(object, error) {
	  	console.log('Failed to create new object, with error code: ' + error.message);
	  }
	})};


	


