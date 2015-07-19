Parse.initialize("RJsXk8OshoyQNiUCuRhwSLNuBlWRgLqfZbvlnCsE", "hDqXwY4WH2JyTc95rwyOpL6KqhnWRzc7tsRweAKQ");

var count = 1;
var $qs;

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
      /*$(".select-lesson").append(
        	"<optgroup id='"+course.id+"-group' label='"+course.name+"'>"
        )*/
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
      //var parent_id = parent_course.id;
      
      $("#select-lesson-m").append(
        	"<option value='"+id+"' data='"/*+ parent_id +*/+"'>"+lesson.name+"</option>"
        )
      /*$(".select-module").append(
        	"<optgroup id='"+lesson.id+"-group' label='"+lesson.name+"'>"
        )*/
    }
  },
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
});

var Module = Parse.Object.extend("Module");
var query = new Parse.Query(Module);
query.find({
  success: function(results) {
    console.log("Successfully retrieved " + results.length + " modules.");
   
    for (var i = 0; i < results.length; i++) {
      var module= results[i];
      module.name = module.get("name");
      var id = module.id;
      var type = module.get("module_type");
      var parent_lesson = module.get("parent_lesson");
      var parent_id = parent_lesson.id;
      
      $(".select-module").append(
        	"<option value='"+id+"' data-type='"+type+"' data='"+ parent_id +"'>"+module.name+"</option>"
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

$(".select-module").change(function(){
	var data = $(".select-module option:selected").data("type");
	$(".open").removeClass('open')
	$("#"+data).addClass("open");

})


$(".more_qs").click(function(){
	$('#qb'+count).after(function() {
		return $(this).clone().attr("id","qb"+(count+1));
	});
	return count ++;
})

$("#test-save").click(function(){
	var module = $(".select-module").val();
	var questions = [];
	var qnum = $(".questions").children().length
	for (var i=1; i <= qnum; i++){
		var qu = $("#qb"+[i]+" .question").val();
		var ans0 = $("#qb"+[i]+" #ans0").val();
		var ans1 = $("#qb"+[i]+" #ans1").val();
		var ans2 = $("#qb"+[i]+" #ans2").val();
		var ans3 = $("#qb"+[i]+" #ans3").val();
		var correct = $("#qb"+[i]+" .correct").val();
		var res = [qu,[ans0,ans1,ans2,ans3],correct];
		console.log(res);
		questions.push(res)
	}

	saveContent(module,questions);
})


$("#text-save").click(function(){
	var module = $(".select-module").val();
	var title = $("#text-title").val();
	var text = $("#text-content").val();
	var content = [title, text];
	saveContent(module,content);
})

$("#video-save").click(function(){
	var module = $(".select-module").val();
	var url = $("#video-link").val().split("=")
	var video_id = url[1];
	console.log(video_id);
	saveContent(module,[video_id]);
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

var newLesson = function(name,id,order){
	var Course = Parse.Object.extend("Course");
  	var query = new Parse.Query(Course);
  	query.equalTo("objectId", id);
  	query.find({
	    success: function(results) {
	      console.log("Successfully retrieved " + results.length + " scores.");
	      // Do something with the returned Parse.Object values
	      for (var i = 0; i < results.length; i++) {
	        var object = results[i];
	 		console.log("Query 1: " + object)
		    var Lesson = Parse.Object.extend("Lesson");
			var lesson  = new Lesson ();
			lesson.set("name", name);
			lesson.set("parent_course", object);
			lesson.set("lesson_number", order);
			console.log("After Set: " + results);

			lesson.save(null, {
			  success: function(lesson) {
			        	
			     console.log("New Lesson: " + lesson.id)
			     console.log("After Save: " + lesson);

			     var relation = object.relation("child_lessons");
			     relation.add(lesson);
			     object.save();
			      
			  },
			  error: function(course, error) {
			    console.log('Failed to create new object, with error code: ' + error.message);
			  }
			});
			}	

		  },
		  error: function(object, error) {
		  	console.log('Failed to create new object, with error code: ' + error.message);
		  }
		})};



	  	

var newModule = function(name,id,order,type){
	var Lesson = Parse.Object.extend("Lesson");
  	var query = new Parse.Query(Lesson);
  	query.equalTo("objectId", id);
  	query.find({
	    success: function(results) {
	      console.log("Successfully retrieved " + results.length + " scores.");
	      // Do something with the returned Parse.Object values
	      for (var i = 0; i < results.length; i++) {
	        var object = results[i];
	 		console.log("Query 1: " + object)
		    var Module = Parse.Object.extend("Module");
			var module = new Module ();
			module.set("name", name);
			module.set("parent_lesson", object);
			module.set("module_number", order);
			module.set("module_type", type);
			console.log("After Set: " + results);

			module.save(null, {
			  success: function(module) {
			        	
			     console.log("New Lesson: " + module.id)
			     console.log("After Save: " + module);

			     var relation = object.relation("child_module");
			     relation.add(module);
			     object.save();
			      
			  },
			  error: function(course, error) {
			    console.log('Failed to create new object, with error code: ' + error.message);
			  }
			});
			}	

		  },
		  error: function(object, error) {
		  	console.log('Failed to create new object, with error code: ' + error.message);
		  }
		})};
	
var saveContent = function(module, content){
	var Module = Parse.Object.extend("Module");
  	var query = new Parse.Query(Module);
  	query.equalTo("objectId", module);
  	query.find({
	    success: function(results) {
	      for (var i = 0; i < results.length; i++) {
	      	var module = results[i];
	      			module.set("content",content);
	      			module.save();
	      	}
		}, error: function(course, error) {
				console.log('Failed to create new object, with error code: ' + error.message);
			}
			})};
