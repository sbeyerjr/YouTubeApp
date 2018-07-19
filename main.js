const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=';
// function getDataFromApi(searchTerm, callback){
// 	const query = {
// 		q: `${searchTerm} in:name`,
// 		part: 'snippet',
// 		key: 'AIzaSyCkTGJ70KnO7SnMU5D5MguVWXN21HgCTQY',
// 	}
// 	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
// }

// function renderResult(result) {
//   return `
//     <div>
//       <h2>
//       <a class="js-result-name" href="${result.url}" target="_blank">${result.title}</a> by <span class="js-user-name">${result.channelTitle}</span></h2>
//       <p class="vid-description">${result.description}</p>
      
//     </div>
//   `;
// }

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

function renderResult(result) {
	let videoId = result.id.videoId;
  return `<div class="col-4">
  					<p>${result.snippet.title}</p>
  					<a href='${YOUTUBE_URL}${videoId}' target='_blank'>
  						<img src='${result.snippet.thumbnails.medium.url}' alt=''>
  					</a>
  				</div>`;
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmitButton() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmitButton);