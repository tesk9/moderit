var QuestionsView = Backbone.View.extend({
  className: "forum",
  template: _.template("<div>Submit a Question:<form><input type='text' class='new-question'></input><button id='submit-question'>Submit</button></form></div><div>Questions:<ul></ul></div>"),
  events: {
    "click #submit-question": function() {
      var newQuestion = this.$el.find("form .new-question").val();
      var newQ = new Question({question: newQuestion});
      if(newQ.save()) {
        this.collection.add(newQ);
        this.$el.find("form p.invalid-question").remove();
        this.$el.find("form .new-question").val("");
      } else { 
        this.$el.find("form").append("<p class='invalid-question'> Question must be at least 15 characters</p>");
      }
    }
  },
  initialize: function() {
    this.collection.on("change add", this.render, this);
    this.render();
  },
  render: function() {
    this.$el.html(this.template());
    $("section").append(this.$el);
    this.$el.find("ul").append(
      this.collection.map(function(question) {
        return new QuestionView({model: question}).render();
      })
    );
  }
});