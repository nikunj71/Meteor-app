import "./verifyemail.html";
Template.verifyemail.events({
  "click .yes":()=> {
    const token = FlowRouter.getParam("tokenemail");
    Accounts.verifyEmail(token, function (e) {
      if (e) {
        Session.set("alert", "verifyemail");
        Session.set("color", "unsuccess");
        layoutalert();
      } else {
        FlowRouter.go("post");
        Session.set("color", "success");
        Session.set("alert", "verify");
        layoutalert();
      }
    });
  },
  "click .no":()=> {
    FlowRouter.go("post");
    window.close()
    Session.set("color", "unsuccess");
    Session.set("alert", "unverify");
    layoutalert();
  },
});
