const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=';
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/channel/';

// getting data from the API
function getDataFromApi(searchTerm, callback) {
  const query = {
    q: searchTerm,
    part: 'snippet',
    key: 'AIzaSyCkTGJ70KnO7SnMU5D5MguVWXN21HgCTQY',
    maxResults: 6
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
  return console.log(searchTerm);
}

//append this html and API data to the document

function renderResult(result) {
	let videoId = result.id.videoId;
  return `<div class="row result-box">
  			<div class="col-4">
  				<a href="${YOUTUBE_URL}${videoId}" data-lightbox="image-1" data-lity><img src='${result.snippet.thumbnails.medium.url}' alt=''></a>
  			</div>
  			<div class="col-8">
  				<div class="title"><h2>${result.snippet.title}</h2></div>
  				<div class="description-box">${result.snippet.description}</div>
  				<div class="watch">
  				<a class="watch-button" href="${YOUTUBE_URL}${videoId}" data-lity>Watch Video</a><a class="watch-button" href="${YOUTUBE_CHANNEL_URL}${result.snippet.channelId}" >More Videos By This Channel</a>
  				</div>
  			</div>
  		</div>
  		  `;
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

//when the submit button is clicked, send the result to API

function watchSubmitButton() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    $('.more-button').removeClass('hidden');
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
    moreButton();
  });
}


$(watchSubmitButton);