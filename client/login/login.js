import "./login.html";
Template.login.onCreated(function () {
  Meteor.subscribe("tasks");
  Session.set("pass", "password");
  Session.set("passin", "password");
});

// Template.login.rendered = function () {
//   $('#sigin').validate();
// };
Template.login.onRendered(function () {});
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
Accounts.onLoginFailure(() => {
  loginalert();
});

Accounts.onLogout(() => {
  $(".exampleModal").modal("show");
});

Accounts.onLogin(() => {});
Template.login.events({
  "submit .sigin": function (event) {
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

          // const loginRule = {
          //   userId(userId) {
          //     const user = Meteor.users.findOne(userId);
          //     console.log(user.type,"user")
          //     return user && user.type !== 'admin';
          //   },
          //   type: 'method',
          //   name: 'login'
          // };
          // DDPRateLimiter.addRule(loginRule, 2, 30000);
        } else {
          $(".exampleModal").modal("hide");
          $(".login").hide();
          $(".logout").show();
          // Meteor.setTimeout(function () {
          //   Meteor._localStorage.removeItem("Meteor.userId");
          //   Meteor._localStorage.removeItem("Meteor.loginToken");
          //   Meteor._localStorage.removeItem("Meteor.loginTokenExpires");
          // }, 30000);
          const email = Meteor.user().emails[0].verified;
          console.log(email);
          if (email == false) {
            Meteor.call("varifiction");
          }
        }
      });
    }
  },

  "submit .signup": function (event) {
    event.preventDefault();
    const filename = Session.get("filename");
    console.log(filename);
    const target = event.target;
    const username = target.username.value;

    const password = target.password.value;

    const email = target.email.value;
    target.username.value = "";
    target.password.value = "";
    target.email.value = "";

    Session.set("username", "connected");

    Meteor.call("signupmethod", username, password, email, function (error) {
      if (error) {
        Session.set("alert", "Meteor.reason");
        Session.set("namealert", error.reason);
        Session.set("color", "unsuccess");
        loginalert();
      } else {
        $(".sigin").show(1000);
        $(".signup").hide(1000);
      }
    });
  },
  "click .backBtn"() {
    $(".signup").hide(1000);
    $(".sigin").show(1000);
    $(".register-form").hide(1000);
  },

  "click .signupBtn"() {
    $(".signup").show(1000);
    $(".sigin").hide(1000);
  },
  "mouseenter .eye"() {
    Session.set("pass", "text");
    $(".eye").hide();
    $(".eye1").show();
  },
  "mouseleave  .eye1"() {
    Session.set("pass", "password");

    $(".eye").show();
    $(".eye1").hide();
  },
  "mouseenter .eyein"() {
    Session.set("passin", "text");
    $(".eyein").hide();
    $(".eyein1").show();
  },
  "mouseleave .eyein1"() {
    Session.set("passin", "password");

    $(".eyein").show();
    $(".eyein1").hide();
  },
  "click .back"() {
    $(".exampleModal").modal("hide");
  },
  "click .wrong"() {
    $(".register-form").hide(1000);
    $(".sigin").show(1000);
  },
  "click .forgot_pswd"() {
    $(".register-form").show();
    $(".sigin").hide(1000);
  },

  "submit .email"(e) {
    e.preventDefault();
    const email = $("input[name=emailvarifiction]").val();
    Accounts.forgotPassword({ email: email }, function (e, r) {
      if (e) {
        Session.set("alert", "invalidemail");
        Session.set("color", "unsuccess");
        loginalert();
      } else {
        loginalert();
        Session.set("color", "success");
        $(".sigin").show(1000);
        $(".register-form").hide(1000);
        Session.set("alert", "sendemail");
      }
    });
  },
});
