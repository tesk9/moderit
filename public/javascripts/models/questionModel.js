var Question = Backbone.Model.extend({
  initialize: function(questionObj) {
    this.set('question', questionObj.question);
    // console.log("this.model.url", this.url());
  },
  validate: function() {
    if(this.get('question')) {
      console.log("validating", this.get('question'));
    }
  }
});