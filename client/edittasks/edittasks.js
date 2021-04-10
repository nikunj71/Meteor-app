import "./edittasks.html";
Template.edit.onCreated(function () {
  Meteor.subscribe("tasks");
});
Template.edit.helpers({
  edittask: function () {
    const id = FlowRouter.getParam("id");
    const data = Tasks.findOne(
      { _id: id },
      { fields: { username: 1, text: 1 } }
    );
   return data;
  },
});
