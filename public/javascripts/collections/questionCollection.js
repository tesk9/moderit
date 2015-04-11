var QuestionCollection = Backbone.Collection.extend({
  model: Question,
  url: function() {
    console.log(this.document.url(), "colleciton url");
    return "/forum/90832"
  }
});