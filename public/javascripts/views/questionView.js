var QuestionView = Backbone.View.extend({
  className: "question",
  tagName: "li",
  initialize: function() {
    this.on("change", this.render, this);
  },
  render: function() {
    this.$el = this.$el.html(this.model.get("question"));
    return this.$el;
  }
});