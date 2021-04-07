import "./model.html"
Template.model.helpers({

    edittask: function (e) {
      const id = Session.get("id");
      return Tasks.findOne({ _id: id },{fields:{text:1}});
    },
  
    editdetails: () => {
      const editdetails = Session.get("boxname");
      if (editdetails === "edit-email") {
        return "Update email";
      }
      if (editdetails === "edittask") {
        return "Edit Task";
      }
      if (editdetails === "edit-pass") {
        return "Reset password";
      }
      if (editdetails == "incomplete") {
        return "Incomplete Tasks";
      }
      if (editdetails == "complete") {
        return "complete Tasks";
      }
    },

    messages: () => {
      return messages();
    },

    color: () => {
      return color();
    },
    
    incomplete: () => {
      const incompletevalue = Session.get("functionincomplete");
      console.log(incompletevalue)
      return incompletevalue;
    },

    complete: () => {
      const completevalue = Session.get("functionincomplete");
      return completevalue;
    },

  });
  
  Template.model.events({
    "submit .edit-email"(e) {
      e.preventDefault();
      const emailold = Meteor.user().emails[0].address
      
      console.log(emailold)
      const emailcurrent = e.target.current.value;
      const emailnew = e.target.new.value;
  
      if (emailcurrent !== "") {
        if (emailcurrent === emailold) {
          if (emailnew !== "") {
            if (emailnew && emailnew !== emailcurrent) {
              Meteor.call("addemail", id, emailnew, emailcurrent, function (e) {
                if (e) {
                  Session.set("alert", "Meteor.reason");
                  Session.set("namealert", error.reason);
                  Session.set("color", "unsuccess");
                  modelalert();
                } else {
                  $(".staticBackdrop").modal("hide");
  
                  layoutalert();
                  Session.set("alert", "emailmeass");
                  Session.set("color", "success");
                  Meteor.call("varifiction");
                }
              });
            } else {
              Session.set("alert", "emaiuse");
              Session.set("color", "unsuccess");
  
              modelalert();
            }
          } else {
            Session.set("alert", "emailempty");
            Session.set("color", "unsuccess");
            modelalert();
          }
        } else {
          Session.set("alert", "emailinvalid");
          Session.set("color", "unsuccess");
  
          modelalert();
        }
      } else {
        Session.set("alert", "emailempty");
        Session.set("color", "unsuccess");
        modelalert();
      }
      e.target.current.value = "";
      e.target.new.value = "";
    },
    "submit .edit-pass"(e) {
      e.preventDefault();
      const newpass = e.target.newpass.value;
      const oldpass = e.target.oldpass.value;
      const conpass = e.target.conpass.value;
      e.target.newpass.value = "";
      e.target.oldpass.value = "";
      e.target.conpass.value = "";
  
      if (newpass !== "" && oldpass !== "" && conpass !== "") {
        if (newpass === conpass) {
          if (newpass !== oldpass) {
            Accounts.changePassword(oldpass, newpass, function (e) {
              if (e) {
                modelalert();
                Session.set("alert", "invalid");
                Session.set("color", "unsuccess");
              } else {
                $(".staticBackdrop").modal("hide");
                Session.set("color", "success");
                Session.set("alert", "changepass");
                layoutalert();
              }
            });
          } else {
            Session.set("alert", "already");
            Session.set("color", "unsuccess");
            modelalert();
          }
        } else {
          Session.set("alert", "same");
          Session.set("color", "unsuccess");
          modelalert();
        }
      } else {
        Session.set("alert", "empty");
        Session.set("color", "unsuccess");
        modelalert();
      }
    },
  });
  