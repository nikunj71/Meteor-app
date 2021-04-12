
FlowRouter.route("/", {
  action: function () {
    BlazeLayout.render("layout", { main: "home" });
  },
});

FlowRouter.route("/login", {
  name: "login",
  action: function () {
    BlazeLayout.render("layout", { main: "login" });
  },
});

FlowRouter.route("/post", {
  name: "post",
  action: function () {
    BlazeLayout.render("layout", { main: "post" });
  },
});

FlowRouter.route("/pop", {
  action: function () {
    BlazeLayout.render("layout", { main: "popmain" });
  },
});

FlowRouter.route("/tasks/:id", {
  name: "tasks",
  action: function () {
    BlazeLayout.render("layout", { main: "edit" });
  },
});

FlowRouter.route("/user/:userid", {
  name: "user",
  action: function () {
    BlazeLayout.render("layout", { main: "user" });
  },
});
FlowRouter.route("/reset-password/:token", {
  name: "reset",
  action: function () {
    BlazeLayout.render("layout", { main: "reset" });
  },
});

FlowRouter.route("/verify-email/:tokenemail", {
  name: "verify",
  action: function () {
    BlazeLayout.render("layout", { main: "verifyemail" });
  },
});
