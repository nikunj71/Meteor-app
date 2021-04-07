import "./serach.html";
Template.search.events({
  "keyup .inputsearch"(e) {
    var value = $(e.target).val().toLowerCase();
    $(".textsearch ")
      .parent()
      .filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
  },
});
