 messages = () => {
    const alertmessages = Session.get("alert");
    const error = Session.get("namealert");
    if (alertmessages === "sendemail") {
      return "Send Email!";
    }
    if (alertmessages === "reset") {
      return "Password reset..!";
    }
    if (alertmessages === "Meteor.reason") {
      return error;
    }
    if (alertmessages === "invalidemail") {
      return "invalid Email";
    }
    if (alertmessages === "emailmeass") {
      return "Email Update..!";
    }
    if (alertmessages === "verify") {
      return "Verifyed Your Account";
    }
    if (alertmessages === "unverify") {
      return "Your Account is not verify";
    }
    if (alertmessages === "empty") {
      return "Empty password";
    }
    if (alertmessages === "same") {
      return "Password must same";
    }
    if (alertmessages === "already") {
      return "Password alredy use";
    }
    if (alertmessages === "success") {
      return "Success Reset password";
    }
    if (alertmessages === "invalid") {
      return "Invalid Password";
    }
    if (alertmessages === "emaiuse") {
      return "Email already use";
    }
    if (alertmessages === "emailempty") {
      return "Empty email";
    }
    if (alertmessages === "emailinvalid") {
      return "Invalid email";
    }
    if (alertmessages === "changepass") {
      return "Reset password success..";
    }
    if (alertmessages === "resetingpassword") {
      return "successfully reset password";
    }
  };
  layoutalert = () => {
    $("#layoutalert").show("slow");
    setTimeout(function () {
      $("#layoutalert").hide(500);
    }, 1000);
  };
  
  modelalert = () => {
    $("#modelalert").show("slow");
    setTimeout(function () {
      $("#modelalert").hide(500);
    }, 1000);
  };
  
  loginalert = () => {
    $("#loginalert").show("slow");
    setTimeout(function () {
      $("#loginalert").hide(500);
    }, 1000);
  };
  loginmodel = () => {
    $("#exampleModal").modal("show");
  };
  color = () => {
    const color = Session.get("color");
  
    if (color === "success") {
      return "alert alert-success";
    }
    if (color == "unsuccess") {
      return "alert alert-danger";
    }
  };
  
  
export{color,loginmodel,loginalert,modelalert,layoutalert,messages}  