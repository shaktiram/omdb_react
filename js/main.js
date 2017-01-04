function search() {
      $('#MovieList').html('');
      var $search = $('#search');
      $.ajax({
        type: 'GET',
        url: 'http://www.omdbapi.com/?s=' + $search.val() + '',
        dataType: 'json',
        success: function(data){
          var results = data['Search'];
          $.each(results, function(i, movie){
            addMovie(movie);
          });
        },
        error: function(error){
          alert('Error');
        }
      })
}

function addMovie(movie){
  var $movieSearchDiv = $('#MovieList');
  var $section = $("<section>", { class: 'col-md-2 col-sm-12', title: movie['Title']});
  if(movie['Poster'].length < 4){
    movie['Poster'] = './images/na.jpg';
  }
  $section.append('<img class="img-responsive" src='+ movie['Poster'] + '/>');
  $section.append('<h5> Title : '+ movie['Title'] + ', Release Year: ' + movie['Year']  + '</h5>');
  var $anchor = $("<a>",{href : 'http://www.imdb.com/title/' + movie['imdbID'], target: '_blank'});
  $anchor.append($section)
  $movieSearchDiv.append($anchor);
}
