var tweet_array;

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	tweet_array = tweet_array.filter((tweet) => tweet.written);

	addEventHandlerForSearch();
	return;	
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	$(function() {
		$("#textFilter").on("keyup",(function() {
		let inText =($(this).val());
		$('#searchText').html(inText);
		

		
		$('#tweetTable').html("");
		filter_array = tweet_array.filter((tweet) => tweet.writtenText.toLowerCase().includes(inText.toLowerCase()))

		if(inText.length == 0){
			$('#searchCount').html("0");
		}
		else{
			$('#searchCount').html(filter_array.length);
		}
			if(inText.length > 0){
			let count = 1;
			for(i in filter_array){
				let table_row = filter_array[i].getHTMLTableRow(count);
				$('#tweetTable').append(table_row);
				count++;
			}
		}
		return inText;
		

		}));
	  })
	
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});