var forumID;
var Router = Backbone.Router.extend({
  routes: {
    ":forum": "loadForum"
  },

  loadForum: function(forum) {
    Backbone.ajax({
      method: "GET",
      url: "/" + forum,
      success: function(result) {
        var forumQuestions = new QuestionCollection(result);
        new QuestionsView({collection: forumQuestions});
        forumID = forum;
      },
      error: function(err) {
        console.log("Err");
        console.error(err);
      }
    });
  }
});

$(function() {
  new Router();
  Backbone.history.start();
});