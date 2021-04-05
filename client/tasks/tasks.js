import "./tasks.html"
Template.task.helpers({
    isOwner() {
      return this.owner === Meteor.userId();
    },
  });
  console.log("Server is:-", Meteor.status().status);
  