import "./verifyemail.html"
Template.verifyemail.events({
    "click #yes"(e) {
      const token = FlowRouter.getParam("tokenemail");
      Accounts.verifyEmail(token, function (e) {
        if (e) {
          alert(error.reason);
          // Session.set("alert", "Meteor.reason");
          // Session.set("namealert", error.reason);
          // Session.set("color", "unsuccess");
          // loginalert();
        } else {
          FlowRouter.go("post");
          Session.set("color", "success");
          Session.set("alert", "verify");
          layoutalert();
        }
      });
    },
    "click #no"() {
      FlowRouter.go("post");
      Session.set("color", "unsuccess");
      Session.set("alert", "unverify");
      layoutalert();
    },
  });