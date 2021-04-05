import "./layout.html"
Template.layout.helpers({
    messages: () => {
      return messages();
    },
    color: () => {
      return color();
    },
  });
  