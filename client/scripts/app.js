var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },

  //Controler
  toggleLike: function() {
    // your code here
    //make a var movieLike
    var movieLike = this.get('like');
    if (movieLike === true) {
      this.set({like: false});
    } else {
      this.set({like: true});
    }
    // console.log(this)
  }

});


//-----------------------------------------------
var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
    // your code here
    this.on("change:comparator", MoviesView.render, this);   // Not working 
  },

  comparator: 'title',

  //controler to sort by input field - in test's case this is rating
  sortByField: function(field) {
    // your code here
    this.comparator = field;
    // this.set({comparator: field}); 
    this.sort()   
    console.log(this) //this does appear to sort.  But the render is not working
  }

});


//-----------------------------------------------
var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'

  },

  handleClick: function(e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});


//-----------------------------------------------
var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    // your code here
    //invoke render after model change
    this.model.on("change:like", this.render, this);

  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function() {
    // your code here
    // console.log(this)
    this.model.toggleLike()

  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});


//-----------------------------------------------
var MoviesView = Backbone.View.extend({

  initialize: function() {
    // your code here
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
