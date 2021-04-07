import "./user.html";
Template.user.helpers({
  username: function () {
    const id = FlowRouter.getParam("userid");
    return Meteor.users.findOne(
      { _id: id },
      { fields: { email: 1, username: 1 } }
    );
  },
});

Template.user.events({
  "submit .view"(e) {
    e.preventDefault();
    const id = Meteor.userId();
    const view = e.target.view.value;
    Meteor.call("updateusername", id, view);
    FlowRouter.go("post");
  },
});
