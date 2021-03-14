import "./main.html";
import "../lib/task.js";

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
  action: function (params ) {
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
  
    $("#offBtn").show()
    $("#onBtn").hide()
    console.log("Server is:-", Meteor.status().status);
  },
  "click #offBtn"() {
    Meteor.reconnect();
    Session.set("enemy", true);
    $("#offBtn").hide()
    $("#onBtn").show()
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
  "submit .edit-task"(e) {
    e.preventDefault();
    const target = e.target;
    const edit = target.edit.value;
    const id = Session.get("id");
    Meteor.call("task .update", id, edit);
    $("#staticBackdrop").modal("hide");
  },
  "click button[name=updateclick]"(e) {
    $("#staticBackdrop").modal("show");
    const edit = e.target.id;
    Session.set("id", edit);
  },
});

Template.login.onCreated(function(){
  Session.set("pass","password")
  Session.set("passin","password")

})
Template.login.helpers({
  password:()=>{
return Session.get("pass")
  },
  passwordin:()=>{
    return Session.get("passin")
      },    
})
Template.login.onCreated(function(){
  Meteor.subscribe("tasks")
})

Template.login.events({
  "submit #sigin": function (event) {
    event.preventDefault();
    const target = event.target;
    const username = target.username.value;
    const password = target.password.value;
    if (username && password !== "") {
      Meteor.loginWithPassword(username, password, function (error) {
        if (error) {
          alert(error.reason);
        } else {
          $("#exampleModal").modal("hide");
          $("#login").hide();
          $("#logout").show();
        }
      });
    } else {
      alert("invalid login");
    }
    target.username.value = "";
    target.password.value = "";
  },

  "submit #signup": function (event) {
    event.preventDefault();
    
    const target = event.target;
    const username = target.username.value;
    const password = target.password.value;
    const email=target.email.value
    debugger
    console.log(username,password,email,"email");
    Session.set("username", "connected");
    Meteor.call("signupmethod", username, password,email, function (error) {
      if (error) {
        alert(error.reason);
      } else {
        $("#sigin").show(1000);
        $("#signup").hide(1000);
      }
    });
    target.username.value = "";
    target.password.value = "";
  },
  "click #backBtn"() {
    $("#signup").hide(1000);
    $("#sigin").show(1000);
    $("#register-form").hide(1000)
  },
  "click #signupBtn"() {
    $("#signup").show(1000);
    $("#sigin").hide(1000);
  },
  "mouseenter #eye"(){
    Session.set("pass","text")
    $("#eye").hide()
    $("#eye1").show()

  },
  "mouseleave  #eye1"(){
    Session.set("pass","password")

   $("#eye").show()
    $("#eye1").hide()

  },
  "mouseenter #eyein"(){
    Session.set("passin","text")
    $("#eyein").hide()
    $("#eyein1").show()

  },
  "mouseleave #eyein1"(){
    Session.set("passin","password")

   $("#eyein").show()
    $("#eyein1").hide()

  },
  "click #back"(){
    $("#exampleModal").modal("hide");

  },
  "click #forgot_pswd"(){
    console.log("hello");
    $("#register-form").show()
    $("#sigin").hide(1000)
  },
  "submit #email"(e){
    e.preventDefault()
    const email=$("input[name=emailvarifiction]").val()
    // console.log(Tasks.find({emails:{$ne:email}}));
    // // { checked: { $ne: true } },+

      Accounts.forgotPassword({email: email}, function (e, r) {
          if (e) {
              alert("Enter valid email")
          } else {
            $("#resetpassword").show()
            $("#register-form").hide(1000)
          }
      }); 
  
    console.log(email);
  },
  "submit #resetpassword"(e)
  {
    e.preventDefault()
    const password=$("#pass").val()
    const conpassword=$("#conpass").val()
    console.log(password,conpassword,"pass");
    if (isNotEmpty(password) &&password===conpassword) {
      console.log("hello");
      Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
        if (err) {
            console.log('We are sorry but something went wrong.');
        } else {
            console.log('Your password has been changed. Welcome back!');
            Session.set('resetPassword', null);
        }
    });    
      }
  }

});
Template.model.helpers({
  edittask: function (e) {
    const id = Session.get("id");
    return Tasks.findOne({ _id: id });d
  },
})
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


Template.pop.events({
  "change select":function(e){
    if($(e.target).val()==="post")
    {
      localStorage.setItem("mybtn", "post" );
      FlowRouter.go("/post")
    }
    if($(e.target).val()==="home")
    {
      FlowRouter.go("/")
      localStorage.setItem("mybtn", "home");
      Meteor.logout();
    }    
  }
})
Template.edit.onCreated(function(){
  Meteor.subscribe("tasks");
})
Template.edit.helpers({
  editjob: function(){
      const id = FlowRouter.getParam('id');
    return Tasks.findOne({ _id: id });
  }
});
Template.edit.onCreated(function(){
  Meteor.subscribe("tasks");

})
Template.user.helpers({
  username: function(){
      const id = FlowRouter.getParam('userid');
   
    return Meteor.users.findOne({ _id: id });

  }
});

Template.main.helpers({
  userid:()=>{
    return Meteor.userId()
  }
})
Template.user.events({
  "submit #view"(e){
    e.preventDefault()
    const id=Meteor.userId()
    const view=e.target.view.value
    Meteor.call("task .view",id,view)
    FlowRouter.go("/post")
  }
})

Template.search.events({
  "keyup #inputsearch"(e) {
    var value = $(e.target).val();
    console.log(value);
    $(" #textsearch ").parent().filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1 )
    })
 }
})
