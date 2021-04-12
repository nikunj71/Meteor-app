import "./main.html";
import "../lib/task.js";
import "./route/route.js";
import "../settings.json";
import "./comman-function/function.js";
import "./post/post.js";
import "./login/login.js";
import "./model/model.js";
import "./tasks/tasks.js";
import "./user/user.js";
import "./mainmodel/mainmodel.js";
import "./serach/serach.js";
import "./reset-password/reset-password.js";
import "./verifyemail/verifyemail.js";
import "./layout/layout.js";
import "./edittasks/edittasks.js";
import "./error/error.html";
import "./verificationstatusicon/verificationstatus.js";
import "./serverstatus/serverstatus.js";
import "./loginBtn/loginBtn.html";

// ----------------------------------------------filename-----------------------------------------------------------------------------------
Template.Route.onCreated(function(){
FlowRouter.go("post")
})
// Template.profile.helpers({
//   profile: () => {
//     const filename = Session.get("filename");

//     // console.log(filename);
//     // const id=Meteor.userId()
//     // console.log(id);
//     // const data=Meteor.user()
//     // console.log(data);
//     return filename;
//   },
// });
// // const  fs = Npm.require('fs');
// // console.log("hello")
