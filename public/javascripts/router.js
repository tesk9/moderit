var Router = Backbone.Router.extend({
  routes: {
    ":forum": "loadForum"
  },

  loadForum: function(forum) {
    Backbone.ajax({
      method: "GET",
      url: "/forum/" + forum,
      success: function(result) {
        console.log(result);
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
  Backbone.history.start()
});