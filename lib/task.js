Tasks = new Mongo.Collection("tasks");
// const fs = require("fs");
// const path = require("path");
// console.log(fs)
//  Tasks.schema = new SimpleSchema({
//   text: {type: Number},
//   createdAt: {type: Date},
//   owner: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
//   username:{type:String}
// });
Meteor.startup(function () {
  const USERNAME=Meteor.settings.public.Mailgun.USERNAME
  const PASSWORD=Meteor.settings.public.Mailgun.PASSWORD
  // console.log(USERNAME)
  // console.log(PASSWORD)
  // process.env.MAIL_URL = 'smtp://postmaster@sandbox5cda  acaee012408cb07f5c99df749478.mailgun.org:b00ea9304af8c848cda4282991461266-6e0fd3a4-65692eaa@smtp.mailgun.org:587';
  // process.env.MAIL_URL = `smtp://${'USERNAME'}:${'PASSWORD'}`
  // let url = "";
  // Accounts.emailTemplates.resetPassword.text = (user, url) =>
  //   (url = url.replace("#/", ""));
  // return "Click this link to reset your password: " + url;
  
});

if (Meteor.isServer) {
  // Email.send({form:"nikunj.dhaduk723@gmail.com",to:email,subject:"Subject",text:"Here is home text"})
  Meteor.publish("tasks", function () {
    // this.stop()
    if (!this.userId) {
      return this.ready();
    }
    return Tasks.find({
      $or: [{ private: { $ne: true } }, { owner: this.userId }],
    });
  });
  Meteor.methods({
    inserttasks(text) {
      check(text, String);
      const data = new Date();
      Tasks.insert({
        text: text,
        CreatedAt: new Date(),
        Time: data.toLocaleTimeString(),
        Date: data.toLocaleDateString(),
        owner: this.userId,
        username: Meteor.user().username,
        checked:false,
        private:false
      });
    },
    deletetasks(taskId) {
      check(taskId, String);
      Tasks.remove(taskId);
    },
     selectall(taskid) {
      Tasks.update(taskid, { $set: { checked: true } });
    },
    disselectall(taskid) {
      Tasks.update(taskid, { $set: { checked: false } });
    },
    checkedtasks(taskId, setchecked) {
      check(taskId, String);
      check(setchecked, Boolean);
      Tasks.update(taskId, { $set: { checked: setchecked } });
    },
    privatetasks(taskId, settoprivate) {
      check(taskId, String);
      check(settoprivate, Boolean);
      Tasks.update(taskId, { $set: { private: settoprivate } });
    },
    updatetasks(TaskId, edit) {
      check(edit, String);
      check(TaskId, String);
      const time = new Date().toLocaleTimeString();
      const date = new Date().toLocaleDateString();
      Tasks.update(TaskId, { $set: { text: edit, Time: time, Date: date } });
    },
    updateusername(TasksId, newusername) {
      check(TasksId, String);
      check(newusername, String);
      Meteor.users.update(TasksId, { $set: { username: newusername } });
      Tasks.update({owner:TasksId}, { $set: { username: newusername } });
  
    },
    signupmethod(username, password, email, filename) {
      Accounts.createUser({
        username: username,
        password: password,
        email: email,
        // filename:filename,
      });
    },
    varifiction() {
      if (this.userId && Meteor.isServer ) {
        return Accounts.sendVerificationEmail(this.userId);
      }
    },
    addemail(id, emailnew, emailcurrent) {
      Accounts.removeEmail(id, emailcurrent);
      Accounts.addEmail(id, emailnew, false);
    },
    resetpass(oldpass, newpass) {
      Accounts.changePassword(oldpass, newpass, function (e) {
        if (e) {
          alert("not chenge");
        } else {
          alert("reset sucessfully");
        }
      });
    },
    "file-upload": function (fileInfo, fileData) {
      console.log("received file " + fileInfo.name + " data: " + fileData);
      fs.writeFile(fileInfo.name, fileData);
      console.log(fileInfo.name, "filrname");
      fse.copy("nikunj.png", "../public", function (err) {
        if (err) return console.error(err);
      });
    },
  
    filename(filename, id) {
      // debugger
      console.log(id);
      if (id) {
        Meteor.users.update({ _id: id }, { $set: { filename: filename } });
      }
    },
  });
  
}
