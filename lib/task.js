Tasks = new Mongo.Collection("tasks");
//  Tasks.schema = new SimpleSchema({
//   text: {type: Number},
//   createdAt: {type: Date},
//   owner: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
//   username:{type:String}
// });
if (Meteor.isServer) {
  Meteor.publish("tasks", function () {
    if (!this.userId) {
      return this.ready();
    }
    return Tasks.find({
      $or: [{ private: { $ne: true } }, { owner: this.userId }],
    });
  });
}
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
  "signupmethod"(username, password,email) {
    Accounts.createUser({
      username: username,
      password: password,
      email:email 
    });
  },
  "forgetpassword"(email)
  {
    console.log(email,"method");
  }

});
