   $("#login_button").click(function(){ 
    event.preventDefault();
    var username = $("#login_email").val();
    var password = $("#login_password").val();
    if (username != "" & password != ""){
      Parse.User.logIn(username, password, {
          success: function(user) {
             console.log("logged in ");
            window.location.href = "../HTML/app.html";
        },
        error: function(user, error) {
            console.log("failed to logg in " + error);
            $("#login_box").prepend("<p id='invalid' class='alert_text'> Please check your email and password and try again. </p>")
        }})
      } else if (username == "" & password != "") {
        $("#login_box").prepend("<p id='no_username' class='alert_text'> Please enter an email address. </p>")      
      } else if (password == "" & username != "") {
        $("#login_box").prepend("<p id='no_password' class='alert_text'> Please enter a password. </p>")
      } else {
        $("#login_box").prepend("<p id='no_both' class='alert_text'> Please enter an email address and password. </p>")     
      }
  });

  $("#forgotten_password").click(function(){
    $("#login_box").css("display", "none");
    $("#password_box").css("display", "block");
  })

  $("#reset_button").click(function(){
    event.preventDefault();
    var email = $("#reset_email").val();
    if (email != "") {
      Parse.User.requestPasswordReset(email, {
        success: function() {
         $(".alerts").append("<p class='alert alert-success alert_text alert-dismissible' role='alert id='invalid_email'> <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Password reset instructions have been sent to your email.</p>")

        },
        error: function(error) {
          $(".alerts").append("<p class='alert alert-danger alert_text alert-dismissible' role='alert id='invalid_email'> <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Error: " + error.message + "</p>")
        }
      });
    } else {
        $(".alerts").append("<p class='alert_text alert alert-dismissible alert-danger' id='no_email'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Please enter an email address. </p>")
    
    }
  });

  $("#register_link").click(function(){
    $("#login_box").css("display", "none");
    $("#register_box").css("display", "block");
  });

  $("#register_btn").click(function(){
    event.preventDefault();
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var email = $("#register_email").val();
    var conf_email = $("#confirm_email").val();
    var password = $("#register_password").val();
    var phone1 = $("phone1").val();
    var phone2 = $("phone2").val();
    var phone3 = $("phone3").val();
    var phone_number = phone1 + phone2 + phone3;
    if (fname != "" & lname != "" & email != "" & conf_email != "" & password != "" & phone1 != "" & phone2 != "" & phone3 != ""  ) {
      if (email === conf_email){
        var user = new Parse.User();
        user.set("first_name", fname);
        user.set("last_name", lname);
        user.set("username", email);
        user.set("password", password);
        user.set("email", email);
        user.set("phone_number", phone_number);
        user.set("Position", "Diner");

        user.signUp(null, {
          success: function(user) {
            analytics.track("register",{
        "first_name": fname,
        "last_name": lname,
        "email": email,
      });
            window.location.href = "../HTML/welcome.html";
          },
          error: function(user, error) {
            $("#register_box").prepend("<p class='alert_text' id='invalid_email'>Error: " + error.message + "</p>")
          }
        });
      } else {
        $("#register_box").prepend("<p class='alert_text' id='no_name'>Please make sure your emails match. </p>")
      } 
    } else if (fname === "" || lname ==="") {
      $("#register_box").prepend("<p class='alert_text' id='no_name'>Please fill in your name.</p>")
    } else if (email === "" || conf_email ==="") {
      $("#register_box").prepend("<p class='alert_text' id='no_name'>Please fill in your email.</p>")
    } else if (password === "") {
      $("#register_box").prepend("<p class='alert_text' id='no_name'>Please fill in your password.</p>")
    } else if (phone1 === "" || phone2 === "" || phone3 === "" ) {
      $("#register_box").prepend("<p class='alert_text' id='no_name'>Please check your email.</p>")
    } 
    
  });

  $("#to_login").click(function(){
    $("#login_box").css("display", "block");
    $("#password_box").css("display", "none");
  });

  $("#to_login1").click(function(){
    $("#login_box").css("display", "block");
    $("#register_box").css("display", "none");
  });
});
