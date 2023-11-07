function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	//document.getElementById('numberTweets').innerText = tweet_array.length;	
	var totalTweets = tweet_array.length;
	$('span#numberTweets').html(totalTweets);

	//code to find the first and last date. applying math.min or math.max to all dates in tweet_array
	var firstDate = new Date(Math.min.apply(null, tweet_array.map(function(e) {
		return new Date(e.time.toLocaleDateString());
	  })));
	
	var lastDate = new Date(Math.max.apply(null, tweet_array.map(function(e) {
		return new Date(e.time.toLocaleDateString());
	  })));
	
	$('span#firstDate').html(firstDate.toDateString());
	$('span#lastDate').html(lastDate.toDateString());

	var categoryDict = {"live_event": 0,
						 "achievement": 0,
						 "completed_event": 0,
						 "miscellaneous": 0
	};



	var writtenCompletedEvents = 0;

	//loop through all tweets and parse relevant information
	for(let i = 0; i < tweet_array.length; i++ ){
		let category = tweet_array[i].source; 
		categoryDict[category] ++;

		if(category=="completed_event" && tweet_array[i].written){
			writtenCompletedEvents ++;
		}
	}

	function pctOfTweets(category){
		return((categoryDict[category]/totalTweets * 100).toFixed(2));
	}

	//update span of index.html
	$('span.completedEvents').html(categoryDict["completed_event"]);
	$('span.liveEvents').html(categoryDict["live_event"]);
	$('span.achievements').html(categoryDict["achievement"]);
	$('span.miscellaneous').html(categoryDict["miscellaneous"]);


	$('span.completedEventsPct').html(pctOfTweets("completed_event") + "%");
	$('span.liveEventsPct').html(pctOfTweets("live_event") + "%");
	$('span.achievementsPct').html(pctOfTweets("achievement") + "%");
	$('span.miscellaneousPct').html(pctOfTweets("miscellaneous") + "%");

	$('span.written').html(writtenCompletedEvents);
	let completedEventsPct = (writtenCompletedEvents/categoryDict["completed_event"]*100).toFixed(2);
	$('span.writtenPct').html( completedEventsPct + "%");

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});