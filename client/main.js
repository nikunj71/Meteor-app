import "./main.html";
import "../lib/task.js";

// -----------------------------router-------------------------

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

// --------------------------comman-function------------------------

layoutalert = () => {
  $("#layoutalert").show("slow");
  setTimeout(function () {
    $("#layoutalert").hide(500);
  }, 1000);
};

modelalert = () => {
  $("#modelalert").show("slow");
  setTimeout(function () {
    $("#modelalert").hide(500);
  }, 1000);
};

loginalert = () => {
  $("#loginalert").show("slow");
  setTimeout(function () {
    $("#loginalert").hide(500);
  }, 1000);
};

color = () => {
  const color = Session.get("color");
  console.log(color);
  if (color === "success") {
    return "alert alert-success";
  }
  if (color == "unsuccess") {
    return "alert alert-danger";
  }
};

messages = () => {
  const alertmessages = Session.get("alert");
  const error = Session.get("namealert");
  if (alertmessages === "sendemail") {
    return "Send Email!";
  }
  if (alertmessages === "reset") {
    return "Password reset..!";
  }
  if (alertmessages === "Meteor.reason") {
    return error;
  }
  if (alertmessages === "invalidemail") {
    return "invalid Email";
  }
  if (alertmessages === "emailmeass") {
    return "Email Update..!";
  }
  if (alertmessages === "passmeass") {
    return "Password reset..!";
  }
  if (alertmessages === "verify") {
    return "Verifyed Your Account";
  }
  if (alertmessages === "unverify") {
    return "Your Account is not verify";
  }
  if (alertmessages === "empty") {
    return "Empty password";
  }
  if (alertmessages === "same") {
    return "Password must same";
  }
  if (alertmessages === "already") {
    return "Password alredy use";
  }
  if (alertmessages === "success") {
    return "Success Reset password";
  }
  if (alertmessages === "invalid") {
    return "Invalid Password";
  }
  if (alertmessages === "emaiuse") {
    return "Email already use";
  }
  if (alertmessages === "emailempty") {
    return "Empty email";
  }
  if (alertmessages === "emailinvalid") {
    return "Invalid email";
  }
};

// ---------------------------------------------------------

Template.post.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Tracker.autorun(() => {
    Meteor.subscribe("tasks");
  });
});

Template.post.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get("hideCompleted")) {
      return Tasks.find(
        { checked: { $ne: true } },
        { sort: { createdAt: -1 } }
      );
    }
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },

  incompleteCount() {
    const incomplete = Tasks.find({ checked: { $ne: true } });
    return incomplete.count();
  },

  completedCount() {
    const complete = Tasks.find({ checked: { $ne: false } });
    return complete.count();
  },
  verificationstatus() {
    const id = Meteor.userId();
    const email = Meteor.users.findOne({ _id: id });
    const emailold = email && email.emails[0].verified;
    Session.set("statusicon", emailold);
    console.log(emailold);
    if (emailold === false) {
      return true;
    } else {
      return false;
    }
  },
});

Template.post.events({
  "submit .new-task"(event) {
    event.preventDefault();
    const target = event.target;
    const text = target.text.value;

    if (target.text.value !== "") {
      Meteor.call("tasks .insert", text);
    }
    target.text.value = "";
  },
  "click #delete"() {
    return Meteor.call("tasks .delete", this._id);
  },
  "click .toggle-checked"() {
    return Meteor.call("tasks.checked", this._id, !this.checked);
  },
  "click #onBtn"() {
    Meteor.disconnect();
    Session.set("enemy", false);

    $("#offBtn").show();
    $("#onBtn").hide();
    console.log("Server is:-", Meteor.status().status);
  },
  "click #offBtn"() {
    Meteor.reconnect();
    Session.set("enemy", true);
    $("#offBtn").hide();
    $("#onBtn").show();
    console.log("Server is:-", Meteor.status().status);
  },
  "click #logout"(e) {
    e.preventDefault();
    Meteor.logout();
    $("#login").show();
    $("#logout").hide();
  },
  "change .hide-completed input"(event, instance) {
    instance.state.set("hideCompleted", event.target.checked);
  },
  "click #toggle-private"() {
    Meteor.call("tasks.private", this._id, !this.private);
  },
  "submit #edit-task"(e) {
    e.preventDefault();
    const target = e.target;
    const edit = target.edit.value;
    const id = Session.get("id");
    Meteor.call("task .update", id, edit);
    $("#staticBackdrop").modal("hide");
    
  },
  "click button[name=updateclick]"(e) {
    Session.set("boxname", "edittask");
    $("#staticBackdrop").modal("show");
    $("#edit-task").show();
    $("#edit-email").hide();
    $("#edit-pass").hide();

    const edit = e.target.id;
    Session.set("id", edit);
  },
  "click #alerticon"() {
    $("#layout").fadeOut(1000);
  },
});

Template.login.onCreated(function () {
  Session.set("pass", "password");
  Session.set("passin", "password");
});
Template.login.helpers({
  password: () => {
    return Session.get("pass");
  },
  passwordin: () => {
    return Session.get("passin");
  },
  messages: () => {
    return messages();
  },
  color: () => {
    return color();
  },
});
Template.login.onCreated(function () {
  Meteor.subscribe("tasks");
});

Template.login.events({
  "submit #sigin": function (event) {
    event.preventDefault();
    const target = event.target;
    const username = target.username.value;
    const password = target.password.value;
    target.username.value = "";
    target.password.value = "";
    if (username && password !== "") {
      Meteor.loginWithPassword(username, password, function (error) {
        if (error) {
          Session.set("alert", "Meteor.reason");
          Session.set("namealert", error.reason);
          Session.set("color", "unsuccess");
          loginalert();
        } else {
          $("#exampleModal").modal("hide");
          $("#login").hide();
          $("#logout").show();
          Meteor.call("varifiction");
        }
      });
    }
  },

  "submit #signup": function (event) {
    event.preventDefault();

    const target = event.target;
    const username = target.username.value;
    const password = target.password.value;
    const email = target.email.value;
    target.username.value = "";
    target.password.value = "";
    target.email.value = "";

    console.log(username, password, email, "email");
    Session.set("username", "connected");
    Meteor.call("signupmethod", username, password, email, function (error) {
      if (error) {
        Session.set("alert", "Meteor.reason");
        Session.set("namealert", error.reason);
        Session.set("color", "unsuccess");
        loginalert();
      } else {
        $("#sigin").show(1000);
        $("#signup").hide(1000);
      }
    });
  },
  "click #backBtn"() {
    $("#signup").hide(1000);
    $("#sigin").show(1000);
    $("#register-form").hide(1000);
  },

  "click #signupBtn"() {
    $("#signup").show(1000);
    $("#sigin").hide(1000);
  },
  "mouseenter #eye"() {
    Session.set("pass", "text");
    $("#eye").hide();
    $("#eye1").show();
  },
  "mouseleave  #eye1"() {
    Session.set("pass", "password");

    $("#eye").show();
    $("#eye1").hide();
  },
  "mouseenter #eyein"() {
    Session.set("passin", "text");
    $("#eyein").hide();
    $("#eyein1").show();
  },
  "mouseleave #eyein1"() {
    Session.set("passin", "password");

    $("#eyein").show();
    $("#eyein1").hide();
  },
  "click #back"() {
    $("#exampleModal").modal("hide");
    console.log("hello");
  },
  "click #wrong"() {
    $("#register-form").hide(1000);
    $("#sigin").show(1000);
  },
  "click #forgot_pswd"() {
    $("#register-form").show();
    $("#sigin").hide(1000);
  },
  "change #files"(e, r) {
    console.log("hello");
    const file = $("#files").get(0).files[0];
    console.log(file);
    var reader = new FileReader();
    reader.onload = function (fileLoadEvent) {
      Meteor.call("file-upload", file, reader.result);
    };
    //  reader.readAsBinaryString(file);
    console.log(file);
  },
  "submit #email"(e) {
    e.preventDefault();
    const email = $("input[name=emailvarifiction]").val();

    Accounts.forgotPassword({ email: email }, function (e, r) {
      if (e) {
        Session.set("alert", "invalidemail");
        Session.set("color", "unsuccess");

        loginalert();
      } else {
        console.log("send link");
        loginalert();
        Session.set("alert", "passmeass");
        Session.set("color", "success");
        $("#sigin").show(1000);
        $("#register-form").hide(1000);
        Session.set("alert", "sendemail");
      }
    });
  },
});
Template.model.helpers({
  edittask: function (e) {
    const id = Session.get("id");
    return Tasks.findOne({ _id: id });
  },
  editemail: function (e) {
    const id = Session.get("emailid");
    console.log(id);
    const email = Meteor.users.findOne({ _id: id });
    console.log();
    const emailfullid = email.emails[0].address;
    console.log(Session.set("emailfullid", emailfullid));

    return emailfullid;
  },
  editdetails: () => {
    const editdetails = Session.get("boxname");
    if (editdetails === "edit-email") {
      return "Update email";
    }
    if (editdetails === "edittask") {
      return "Edit Task";
    }
    if (editdetails === "edit-pass") return "Reset password";
  },
  messages: () => {
    return messages();
  },
  color: () => {
    return color();
  },
});

Template.model.events({
  "submit #edit-email"(e) {
    e.preventDefault();
    // debugger
    const id = Session.get("emailid");
    const email = Meteor.users.findOne({ _id: id });
    const emailold = email.emails[0].address;
    const emailcurrent = e.target.current.value;
    const emailnew = e.target.new.value;

    if (emailcurrent !== "") {
      if (emailcurrent === emailold) {
        if (emailnew !== "") {
          if (emailnew && emailnew !== emailcurrent) {
            Meteor.call("addemail", id, emailnew, emailcurrent, function (e) {
              if (e) {
                Session.set("alert", "Meteor.reason");
                Session.set("namealert", error.reason);
                Session.set("color", "unsuccess");
                modelalert();
              } else {
                $("#staticBackdrop").modal("hide");

                layoutalert();
                Session.set("alert", "emailmeass");
                Session.set("color", "success");
                Meteor.call("varifiction");
              }
            });
          } else {
            Session.set("alert", "emaiuse");
            Session.set("color", "unsuccess");

            modelalert();
          }
        } else {
          Session.set("alert", "emailempty");
          Session.set("color", "unsuccess");
          modelalert();
        }
      } else {
        Session.set("alert", "emailinvalid");
        Session.set("color", "unsuccess");

        modelalert();
      }
    } else {
      // alert("invalid email");
      Session.set("alert", "emailempty");
      Session.set("color", "unsuccess");
      modelalert();
    }
    e.target.current.value = "";
    e.target.new.value = "";
  },
  "submit #edit-pass"(e) {
    e.preventDefault();
    const newpass = e.target.newpass.value;
    const oldpass = e.target.oldpass.value;
    const conpass = e.target.conpass.value;
    e.target.newpass.value = "";
    e.target.oldpass.value = "";
    e.target.conpass.value = "";

    if (newpass !== "" && oldpass !== "" && conpass !== "") {
      if (newpass === conpass) {
        if (newpass !== oldpass) {
          Accounts.changePassword(oldpass, newpass, function (e) {
            if (e) {
              modelalert();
              Session.set("alert", "invalid");
            } else {
              $("#staticBackdrop").modal("hide");
              Session.set("color", "success");
              layoutalert();
            }
          });
        } else {
          Session.set("alert", "already");
          Session.set("color", "unsuccess");

          modelalert();
        }
      } else {
        Session.set("alert", "same");
        Session.set("color", "unsuccess");
        modelalert();
      }
    } else {
      Session.set("alert", "empty");
      Session.set("color", "unsuccess");

      modelalert();
    }
  },
});
Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
console.log("Server is:-", Meteor.status().status);

Template.status.onCreated(function () {
  Session.set("enemy", true);
});

Template.status.helpers({
  onstatus: () => Session.get("enemy"),
});

Template.edit.onCreated(function () {
  Meteor.subscribe("tasks");
});
Template.edit.helpers({
  editjob: function () {
    const id = FlowRouter.getParam("id");
    return Tasks.findOne({ _id: id });
  },
});
Template.edit.onCreated(function () {
  Meteor.subscribe("tasks");
});
Template.user.helpers({
  username: function () {
    const id = FlowRouter.getParam("userid");

    return Meteor.users.findOne({ _id: id });
  },
});

Template.main.helpers({
  userid: () => {
    return Meteor.userId();
  },
});
Template.main.events({
  "click a[name=resetemail]"(e) {
    const id = Meteor.userId();
    Session.set("emailid", id);
    Session.set("boxname", "edit-email");
    $("#staticBackdrop").modal("show");
    $("#edit-task").hide();
    $("#edit-email").show();
    $("#edit-pass").hide();
  },
  "click a[name=resetpass]"(e) {
    Session.set("boxname", "edit-pass");
    $("#staticBackdrop").modal("show");
    $("#edit-task").hide();
    $("#edit-email").hide();
    $("#edit-pass").show();
  },
});

Template.user.events({
  "submit #view"(e) {
    e.preventDefault();
    const id = Meteor.userId();
    const view = e.target.view.value;
    Meteor.call("task .view", id, view);
    FlowRouter.go("/post");
  },
});

Template.search.events({
  "keyup #inputsearch"(e) {
    var value = $(e.target).val();
    console.log(value);
    $(" #textsearch ")
      .parent()
      .filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
  },
});

Template.reset.onCreated(function () {});
Template.reset.events({
  "submit #resetpassword"(e) {
    e.preventDefault();
    const password = $("#pass").val();
    const conpassword = $("#conpass").val();
    const token = FlowRouter.getParam("token");
    console.log(password, conpassword, token, "pass");
    if (password && password === conpassword) {
      console.log("hello");
      Accounts.resetPassword(token, password, function (err) {
        if (err) {
          console.log("We are sorry but something went wrong.");
        } else {
          console.log("Your password has been changed. Welcome back!");
          Meteor.logout();
          FlowRouter.go("/post");
          $("#exampleModal").modal("show");
          modelalert();
          Session.set("alert", "reset");
          $("#sigin").show(1000);
          $("#register-form").hide(1000);
        }
      });
    } else {
      alert("note reset password");
    }
  },
  "click #backreset"() {
    console.log("hello");
    FlowRouter.go("/post");
    $("#exampleModal").dal("show");
    $("#sigin").show(1000);
    $("#register-form").hide(1000);
  },
});
Template.layout.helpers({
  messages: () => {
    return messages();
  },
  color: () => {
    return color();
  },
});

Template.verifyemail.events({
  "click #yes"(e) {
    const token = FlowRouter.getParam("tokenemail");
    console.log(token);
    Accounts.verifyEmail(token, function (e) {
      if (e) {
        alert(error.reason);
        // Session.set("alert", "Meteor.reason");
        // Session.set("namealert", error.reason);
        // Session.set("color", "unsuccess");
        // loginalert();
      } else {
        FlowRouter.go("/post");
        Session.set("color", "success");
        Session.set("alert", "verify");
        layoutalert();
      }
    });
  },
  "click #no"() {
    FlowRouter.go("/post");
    Session.set("color", "unsuccess");
    Session.set("alert", "unverify");
    layoutalert();
  },
});

// Template.verificationstatus.helpers(()=>{
// const status=Session.get("Verificationstatus")
// console.log(status);
// icon=()=>{
//   // if(status===false){
//   //   return "fa fa-times"
//   //   }
//   //   return "fa fa-check"
//   return "fa fa-times"
// }

// })
Template.Verificationstatus.helpers({
  icon: () => {
    const status = Session.get("statusicon");
    console.log(status);
    if (status === true) {
      return "./check1.png ";
    } else {
      return "./error.jpg";
    }
  },
});

Template.Verificationstatus.events({
  "click #wr"() {
    console.log("hello");
  },
});
