// Router.router("/",{
//     layoutTemplate: 'layout',
//     template:"home"
// })

FlowRouter.route("/", {
    action: function () {
      BlazeLayout.render("layout", { main: "home" });
    },
  });
  
  FlowRouter.route("/login", {
    action: function () {
      BlazeLayout.render("layout", { main: "login" });
    },
  });
  
  FlowRouter.route("/post", {
    action: function () {
      BlazeLayout.render("layout", { main: "post" });
    },
  });
  
  FlowRouter.route("/pop", {
    action: function (params) {
      BlazeLayout.render("layout", { main: "popmain" });
    },
  });
  
  FlowRouter.route("/tasks/:id", {
    action: function () {
      BlazeLayout.render("layout", { main: "edit" });
    },
  });
  
  FlowRouter.route("/user/:userid", {
    action: function () {
      BlazeLayout.render("layout", { main: "user" });
    },
  });
  FlowRouter.route("/reset-password/:token", {
    action: function () {
      BlazeLayout.render("layout", { main: "reset" });
    },
  });
  
  FlowRouter.route("/verify-email/:tokenemail", {
    action: function () {
      BlazeLayout.render("layout", { main: "verifyemail" });
    },
  });
  
