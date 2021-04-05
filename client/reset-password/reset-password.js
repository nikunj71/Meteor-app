import "./reset-password.html"
Template.reset.rendered = function () {
    loginmodel();
  };
  Template.reset.events({
    "submit #resetpassword"(e) {
      e.preventDefault();
      const password = $("#pass").val();
      const conpassword = $("#conpass").val();
      const token = FlowRouter.getParam("token");
      if (password && password === conpassword) {
        Accounts.resetPassword(token, password, function (err) {
          if (err) {
            alert("We are sorry but something went wrong");
          } else {
            console.log("Your password has been changed. Welcome back!");
            Meteor.logout();
            FlowRouter.go("post");
            $("#exampleModal").modal("show");
            modelalert();
            Session.set("alert", "reset");
            $("#sigin").show(1000);
            $("#register-form").hide(1000);
          }
        });
      } else {
        alert("password must be password");
      }
    },
    "click #backreset"() {
      FlowRouter.go("post");
      $("#exampleModal").model("show");
      $("#sigin").show(1000);
      $("#register-form").hide(1000);
    },
  });
  