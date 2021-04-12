import "./serverstatus.html";
Template.status.onCreated(function(){
  const tmp = this;
  Session.set("enemy", true);
});

Template.status.helpers({
  onstatus: () => Session.get("enemy"),
});
