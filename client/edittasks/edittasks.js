import "./edittasks.html";
Template.edit.onCreated(()=>{
  Meteor.subscribe("editdata");
});
Template.edit.helpers({
  edittask:()=> {
    const id = FlowRouter.getParam("id");
    const data = Tasks.findOne(
      { _id: id },
      { fields: { username: 1, text: 1 } }
    );
   return data;
  },
  currentUser:()=>{
    if(Meteor.userId())
    {
      return true
    }
    else{
      return false
    }
  }
});
