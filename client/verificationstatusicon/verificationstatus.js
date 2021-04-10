import "./verificationstatus.html";
Template.Verificationstatus.helpers({
  icon: () => {
    const statuscheck =
      Meteor.user() &&
      Meteor.user().emails[0] &&
      Meteor.user().emails[0].verified;
    if (statuscheck === true) {
      return "./check1.png ";
    } else {
      return "./error.jpg";
    }
  },
});
