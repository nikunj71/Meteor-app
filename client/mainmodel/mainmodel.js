import "./mainmodel.html";
Template.main.helpers({
  userid: () => {
    return Meteor.userId();
  },
  selectbtn: () => {
    const username = Meteor.user().username;
    const uservalue = Tasks.find(
      { username: username },
      { fields: { _id: 1, checked: 1 } }
    ).fetch();
    var selectitem = "";
    uservalue.map((item, i) => {
      selectitem = item.checked;
    });
    console.log(selectitem);
    if (selectitem == true) {
      return false;
    } else if (selectitem == false) {
      return true;
    } else {
      return true;
    }
  },
});

Template.main.events({
  "click .resetemailselectall"(e) {
    const id = Meteor.userId();
    Session.set("emailid", id);
    Session.set("boxname", "edit-email");
    $(".staticBackdrop").modal("show");
    $(".edit-task").hide();
    $(".edit-email").show();
    $(".edit-pass ").hide();
    $("#fileuploadform").hide();
    $(".incomplete").hide();
    $(".complete").hide();
  },
  "click .usernamechange"() {
    const userid = Meteor.userId();
    FlowRouter.go(`/user/${userid}`);
    // console.log("Root")
    // const Root = Meteor.settings.public.Root.URL;

    // window.open(`${Root}/nikunj71/Meteor-app`)
  },
  "click .resetpasswordBtn"(e) {
    Session.set("boxname", "edit-pass");
    $(".staticBackdrop").modal("show");
    $(".edit-task").hide();
    $(".edit-email").hide();
    $(".edit-pass").show();
    $("#fileuploadform").hide();
    $(".incomplete").hide();
    $(".complete").hide();
  },
  "click .selectdelete"() {
    const username = Meteor.users.findOne(Meteor.userId()).username;
    const id = Tasks.find(
      { username: username, checked: true },
      { fields: { _id: 1 } }
    ).fetch();
    id.map((item, r) => {
      Meteor.call("deletetasks", item._id);
    });
  },
  "click .selectall"(e) {
    console.log("hello");
    const username = Meteor.users.findOne(Meteor.userId()).username;
    const uservalue = Tasks.find(
      { username: username },
      { fields: { _id: 1 } }
    ).fetch();

    uservalue.map((item, i) => {
      Meteor.call("selectall", item._id);
    });
  },
  "click .disselectall"(e) {
    const username = Meteor.users.findOne(Meteor.userId()).username;
    const uservalue = Tasks.find(
      { username: username },
      { fields: { _id: 1 } }
    ).fetch();

    uservalue.map((item, i) => {
      Meteor.call("disselectall", item._id);
    });
  },
});
