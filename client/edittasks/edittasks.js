import "./edittasks.html"
Template.edit.onCreated(function () {
    Meteor.subscribe("tasks");
  });
  Template.edit.helpers({
    editjob: function () {
      const id = FlowRouter.getParam("id");
      return Tasks.findOne({ _id: id });
    },
  });