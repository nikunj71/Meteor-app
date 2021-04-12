import "./mainmodel.html";

Template.main.helpers({
  userid: () => {
    return Meteor.userId();
  },
  selectbtn: () => {
    const checked = Tasks.find(
      { owner: Meteor.userId() },
      { fields: { _id: 1, checked: 1 } }
    ).fetch();
    var selectitem = "";
    checked.map((item, i) => {
      selectitem = item.checked;
    });
    if (selectitem == true) {
      return false;
    } else if (selectitem == false) {
      return true;
    } else {
      return true;
    }
  },
  currentUser:()=>{
    if(Meteor.userId()){
      return true
    }
    else{
      return false
    }
  }
});

Template.main.events({
  "click .resetemail":(e)=>{
    Session.set("boxname", "edit-email");
    $(".staticBackdrop").modal("show");
    $(".edit-task").hide();
    $(".edit-email").show();
    $(".edit-pass ").hide();
    $("#fileuploadform").hide();
    $(".incomplete").hide();
    $(".complete").hide();
  },

  "click .usernamechange":()=>{
    const userid = Meteor.userId();
    // FlowRouter.go(`/user/${userid}`);
    // window.open(`http://localhost:3000/user/${userid}`);
     window.open(Meteor.absoluteUrl()+`user/${userid}`)
  },

  "click .test":()=> {
    console.log("$2a$10$3mdYxjsOavzRx4cF7P2qceRc5gGrSHy7lQqwV1qXJaiDNQwEz8QgS");
    const id = '{"$binary": "Nikunj"}';
    console.log(EJSON.parse(id));
    console.log(EJSON.stringify(id));
  },

  "click .resetpasswordBtn":(e)=> {
    Session.set("boxname", "edit-pass");
    $(".staticBackdrop").modal("show");
    $(".edit-task").hide();
    $(".edit-email").hide();
    $(".edit-pass").show();
    $("#fileuploadform").hide();
    $(".incomplete").hide();
    $(".complete").hide();
  },

  "click .selectdelete":()=> {
    const checked = Tasks.find(
      { owner: Meteor.userId(), checked: true },
      { fields: { _id: 1 } }
    ).fetch();
    checked.map((item, r) => {
      Meteor.call("deletetasks", item._id);
    });
  },

  "click .selectall":(e)=> {
    const taskid = Tasks.find(
      { owner: Meteor.userId() },
      { fields: { _id: 1 } }
    ).fetch();
    taskid.map((item, i) => {
      Meteor.call("selectall", item._id);
    });
  },

  "click .disselectall":(e)=> {
    const taskid = Tasks.find(
      { owner: Meteor.userId() },
      { fields: { _id: 1 } }
    ).fetch();
    taskid.map((item, i) => {
      Meteor.call("disselectall", item._id);
    });
  },
});
