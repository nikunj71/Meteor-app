import "./reset-password.html";

Template.reset.events({
  "submit .resetpassword"(e) {
    e.preventDefault();
    const password = $(".pass").val();
    const conpassword = $(".conpass").val();
    const token = FlowRouter.getParam("token");
    if (password && password === conpassword) {
      Accounts.resetPassword(token, password, function (err) {
        if (err) {
          Session.set("alert", "verifyemail");
          Session.set("color", "unsuccess");
          layoutalert();
        } else {
          Meteor.logout();
          FlowRouter.go("post");
          $(".exampleModal").modal("show");
          modelalert();
          Session.set("alert", "reset");
          $(".sigin").show(1000);
          $(".register-form").hide(1000);
        }
      });
    } else {
      alert("password must be same");
    }
  },

  "click #backreset"() {
    FlowRouter.go("post");
    $(".exampleModal").model("show");
    $(".sigin").show(1000);
    $(".register-form").hide(1000);
  },
});
