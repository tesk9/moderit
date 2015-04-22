var Question = Backbone.Model.extend({
  initialize: function(questionObj, forum) {
    this.set("question", questionObj.question);
    this.set("forum", forum);
  },
  validate: function(attrs) {
    var question = attrs.question;
    if(!(question.length > 15 && question.match(/^[A-z]/))) {
      return "Invalid question";
    }
  },
  urlRoot: function() {
    return "forum/" + forumID + "/question";
  }
});