import "./post.html";

// localStorage.setItem("login",false)
Template.post.onCreated(function () {
  const tmp = this;
  tmp.state = new ReactiveDict();
  this.statusicon = new ReactiveVar();
  tmp.autorun(() => {
    tmp.subscribe("tasks");
  });
  setTimeout(function () {
    $(".layout").fadeOut(1000);
  }, 5000);
  
  var check=localStorage.getItem("login")
  console.log(check)
 if(check==="false")
 {
  return Meteor.logout() 
 }
 
  
});


Template.post.onRendered(() => {
  if (!Meteor.userId()) {
    loginmodel();
  }


 
  console.log("hello")
  // console.log(localStorage.getItem("Meteor.userId"));
  // if (localStorage.getItem("Meteoredid") === null) {
  //   Meteor.logout();
  // }
});

Template.post.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get("hideCompleted")) {
      return Tasks.find(
        { checked: { $ne: true } },
        { sort: { CreatedAt: -1 } }
      );
    }
    return Tasks.find({}, { sort: { Time: -1, Date: -1 } });
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
    const emailold =
      Meteor.user() &&
      Meteor.user().emails[0] &&
      Meteor.user().emails[0].verified;
    Template.instance().statusicon.set(emailold);
    if (emailold === false) {
      return true;
    } else {
      return false;
    }
  },
  time() {
    timeout = Meteor.setTimeout(function () {
      Session.set("now", new Date().toLocaleTimeString());
    }, 1000);
    return Session.get("now");
  },
});

Template.post.events({
  "submit .new-task"(event) {
    event.preventDefault();
    const target = event.target;
    const text = target.text.value;
    if (target.text.value !== "") {
      Meteor.call("inserttasks", text);
    }
    target.text.value = "";
  },
  "click .delete"() {
    return Meteor.call("deletetasks", this._id);
  },
  "click .toggle-checked"() {
    return Meteor.call("checkedtasks", this._id, !this.checked);
  },
  "click .onBtn"() {
    Meteor.disconnect();
    Session.set("enemy", false);
    $(".offBtn").show();
    $(".onBtn").hide();
    console.log("Server is:-", Meteor.status().status);
  },
  "click .offBtn"() {
    Meteor.reconnect();
    Session.set("enemy", true);
    $(".offBtn").hide();
    $(".onBtn").show();
    console.log("Server is:-", Meteor.status().status);
  },
  "click .logout"(e) {
    e.preventDefault();
    Meteor.logout();
  localStorage.setItem("login",false)


    $(".login").show();
    $(".logout").hide();
  },
  "change .hide-completed input"(event, instance) {
    instance.state.set("hideCompleted", event.target.checked);
  },
  "click .toggle-private"() {
    Meteor.call("privatetasks", this._id, !this.private);
  },
  "submit .edit-task"(e) {
    e.preventDefault();
    const target = e.target;
    const edit = target.edit.value;
    const id = target.edit.id;
    Meteor.call("updatetasks", id, edit);
    $(".staticBackdrop").modal("hide");
  },
  "click .updateclick"(e) {
    Session.set("boxname", "edittask");
    const complete = Tasks.findOne({ _id: this._id });
    if (complete.checked === true) {
      $(".staticBackdrop").modal("hide");
      $(".edit-task").hide();
      alert("it`s complete tasks");
    } else {
      $(".staticBackdrop").modal("show");
      $(".edit-task").show();
    }
    $(".edit-email").hide();
    $(".edit-pass").hide();
    $("#fileuploadform").hide();
    $(".incomplete").hide();
    $(".complete").hide();
    Session.set("id", this._id);
  },
  "click .alerticon"() {
    $(".layout").fadeOut(1000);
  },
  "click #fileupload"() {
    $(".staticBackdrop").modal("show");
    $("#fileuploadform").show();
    $(".edit-task").hide();
    $(".edit-email").hide();
    $(".edit-pass").hide();
  },
  "change #files"(e, r) {
    const id = Meteor.userId();
    const file = $("#files").get(0).files[0];
    const filename = file.name;
    Session.set("filename", filename);
    var reader = new FileReader();
    reader.onload = function () {
      Meteor.call("file-upload", file, reader.result, filename);
    };
    Meteor.call("filename", filename, id, function (error) {
      if (error) {
        alert(error.reason);
      } else {
        alert("success");
      }
    });
  },
  "click .incompleteCount"() {
    $(".staticBackdrop").modal("show");
    $("#fileuploadform").hide();
    $(".complete").hide();
    $(".incomplete").show();
    $(".edit-task").hide();
    $(".edit-email").hide();
    $(".edit-pass").hide();
    $("#fileuploadform").hide();

    Session.set("boxname", "incomplete");
    const incomplete = Tasks.find(
      { checked: false },
      { fields: { text: 1, username: 1 } }
    ).fetch();
    console.log(incomplete);
    Session.set("functionincomplete", incomplete);
  },
  "click .completedCount"() {
    $(".staticBackdrop").modal("show");
    $("#fileuploadform").hide();
    $(".incomplete").hide();
    $(".complete").show();
    $(".edit-task").hide();
    $(".edit-email").hide();
    $(".edit-pass").hide();
    $("#fileuploadform").hide();
    Session.set("boxname", "complete");
    const complete = Tasks.find(
      { checked: true },
      { fields: { text: 1, username: 1 } }
    ).fetch();
    Session.set("functionincomplete", complete);
  },
  "mouseenter .imagevarification"() {
    const verify = Template.instance().statusicon.get();
    if (verify === false) {
      $(".ptext").show(1000);
    } else {
      $(".ptext1").show(1000);
    }
  },
  "mouseleave .imagevarification"() {
    $(".ptext").hide(1000);
    $(".ptext1").hide(1000);
  },
});
