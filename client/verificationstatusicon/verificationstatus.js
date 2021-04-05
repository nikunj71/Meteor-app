import "./verificationstatus.html"
Template.Verificationstatus.helpers({
    icon: () => {
      const status = Session.get("statusicon");
  
      if (status === true) {
        return "./check1.png ";
      } else {
        return "./error.jpg";
      }
    },
  });