function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  },
	  //TODO: Add mark and encoding
	  "mark": "circle",
	  "encoding": {
		"x": { 
			"bin": true,
			"type": "quantitative",
			"field": "Day of the week",
		},

		"y": {
			"bin": true,
			"type": "quantitative",
			"field": "Day of the week",
		}
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	
	//types: run, walk, hike, workout, bike, swim, yoga, 'activity', mysports freestyle,
    // skate, row, chair ride, dance, sports, pilates, snowboard, gym, meditation, boxing, 
	var activityDict = {"run": 0,
						"walk": 0,
						"hike": 0,
						"workout": 0,
						"bike": 0,
						"swim": 0,
						"yoga": 0,
						"freestyle": 0,
						"skate": 0,
						"row": 0,
						"chair ride": 0,
						"dance": 0,
						"pilates": 0,
						"snowsport": 0,
						"meditation": 0,
						"boxing": 0,
						"sports": 0,
						"activity": 0
						
	};

	
	for(let i = 0; i < tweet_array.length; i++ ){
		let activity = tweet_array[i].activityType;
		let category = tweet_array[i].source; 
		var distance;
		
		activityDict[activity]++;
		if(category == "completed_event"){
			distance = tweet_array[i].distance;

		}

	}
	var firstMost, secondMost, thirdMost = 0;
	const sortable = Object.fromEntries(
		Object.entries(activityDict).sort(([,a],[,b]) => b-a)
	);
	firstMost = Object.entries(sortable)[0][0];
	secondMost = Object.entries(sortable)[1][0];
	thirdMost = Object.entries(sortable)[2][0];
	$('span#numberActivities').html(Object.entries(activityDict).length);
	$('span#firstMost').html(firstMost);
	$('span#secondMost').html(secondMost);
	$('span#thirdMost').html(thirdMost);
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});