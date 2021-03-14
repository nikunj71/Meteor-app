import { Accounts } from 'meteor/accounts-base';
console.log(Accounts);
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
 });