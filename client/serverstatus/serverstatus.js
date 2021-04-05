

import "./serverstatus.html"
Template.status.onCreated(function () {
    Session.set("enemy", true);
  });
  
  Template.status.helpers({
    onstatus: () => Session.get("enemy"),
  });