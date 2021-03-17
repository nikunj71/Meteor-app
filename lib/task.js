Tasks = new Mongo.Collection("tasks");
//  Tasks.schema = new SimpleSchema({
//   text: {type: Number},
//   createdAt: {type: Date},
//   owner: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
//   username:{type:String}
// });
if (Meteor.isServer) {
  // Email.send({form:"nikunj.dhaduk723@gmail.com",to:email,subject:"Subject",text:"Here is home text"})
  Meteor.publish("tasks", function () {
    if (!this.userId) {
      return this.ready();
    }
    return Tasks.find({
      $or: [{ private: { $ne: true } }, { owner: this.userId }],
    });
  });
}
Meteor.startup(function () {
  // process.env.MAIL_URL = 'smtp://postmaster@sandbox5cdaacaee012408cb07f5c99df749478.mailgun.org:b00ea9304af8c848cda4282991461266-6e0fd3a4-65692eaa@smtp.mailgun.org:587';
  let url = "";
  Accounts.emailTemplates.resetPassword.text = (user, url) =>
    (url = url.replace("#/", ""));
  return "Click this link to reset your password: " + url;
});
Meteor.methods({
  "tasks .insert"(text) {
    check(text, String);
    const insert = Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  "tasks .delete"(taskId) {
    check(taskId, String);
    Tasks.remove(taskId);
  },
  "tasks.checked"(taskId, setchecked) {
    check(taskId, String);
    check(setchecked, Boolean);
    Tasks.update(taskId, { $set: { checked: setchecked } });
  },
  "tasks.private"(taskId, settoprivate) {
    check(taskId, String);
    check(settoprivate, Boolean);
    Tasks.update(taskId, { $set: { private: settoprivate } });
  },
  "task .update"(TaskId, edit) {
    check(edit, String);
    check(TaskId, String);

    Tasks.update(TaskId, { $set: { text: edit } });
  },
  "task .view"(TasksId, view) {
    check(TasksId, String);
    check(view, String);
    Meteor.users.update(TasksId, { $set: { username: view } });
  },
  signupmethod(username, password, email) {
    Accounts.createUser({
      username: username,
      password: password,
      email: email,
    });
  },
  varifiction() {
    const userId = Meteor.userId();
    if (userId) {
      console.log("Email has been sent");
      return Accounts.sendVerificationEmail(userId);
    }
  },
  addemail(id, emailnew, emailcurrent) {
    Accounts.removeEmail(id, emailcurrent);
    Accounts.addEmail(id, emailnew, true);
  },
  resetpass(oldpass, newpass) {
    Accounts.changePassword(oldpass, newpass, function (e) {
      if (e) {
        alert(Meteor.reason);
      } else {
        alert("reset sucessfully");
      }
    });
  },
});
