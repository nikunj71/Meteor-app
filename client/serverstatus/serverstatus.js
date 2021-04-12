import "./serverstatus.html";
Template.status.onCreated(()=> {
  const tmp = this;
  Session.set("enemy", true);
});

Template.status.helpers({
  onstatus: () => Session.get("enemy"),
});
