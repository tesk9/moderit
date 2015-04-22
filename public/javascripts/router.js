var Router = Backbone.Router.extend({
  routes: {
    ":forum": "loadForum"
  },

  loadForum: function(forum) {
    Backbone.ajax({
      method: "GET",
      url: "/" + forum,
      success: function(result) {
        var forumQuestions = new QuestionCollection(result, forum);
        new QuestionsView({collection: forumQuestions});
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