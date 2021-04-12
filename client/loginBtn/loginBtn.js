Template.login.helpers({
    currentUser:() => {
    if(Meteor.userId()){
        return true
    }
    else{
        return false
    }
    },
  });
  
  Accounts.on