Parse.initialize("RJsXk8OshoyQNiUCuRhwSLNuBlWRgLqfZbvlnCsE", "hDqXwY4WH2JyTc95rwyOpL6KqhnWRzc7tsRweAKQ");

var lesson_id = window.location.href.split("?");
var lesson_id = lesson_id[1];
var child_modules = [];
var current_lesson;

var Lesson = Parse.Object.extend("Lesson");
var query = new Parse.Query(Lesson);
query.equalTo("objectId", lesson_id);
console.log("Pre-Query: "+lesson_id);
query.first({
  success: function(results) {
    console.log("Query1: "+results);
    var name = results.get("name");
    var lessons = results.get("Lessons");
    $(".title").text(name);
    var parent = results.get("parent_course");
    var parentId= parent.id;
    $(".back-to-course").attr("href","../HTML/course-overview.html?"+parentId);

    var relation = results.relation("child_module")
    relation.query().find({
      success: function(list) {
      for (var i = 0; i < list.length; i++) {
        var results = list[i];
        console.log(results.id);
        child_modules.push(results.id)
       }
        var Module = Parse.Object.extend("Module");
        var query = new Parse.Query(Module);
        query.containedIn("objectId",child_modules);
        console.log("Pre-Query2: "+ child_modules)
        query.ascending("module_number");
        query.find({
          success: function(list) {
            for (var i = 0; i < list.length; i++) {
             var module = list[i];
             console.log("Query2: "+module);
             var name = module.get("name");
             var order = module.get("module_number");
             
              $("#module-list").append(
                "<div class='lesson' id='"+name+ '-box'+"'>"+
                "<div class='lesson_pic'></div>"+
                "<h1 class='lesson_name'>"+ order +". " + name+"</h1>"+
                "<a class='lesson-a' href='../HTML/module.html?"+module.id+"'>"+
                "<div class='btn btn-default start-module' id='module"+i+"' data='"+ module.id +"'>"+
                "Begin Module</div></a></div>"
                )
          }
        }});
      }
  }); 
  }, 
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
});



    
