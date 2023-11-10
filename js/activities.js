function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	var weekArray = [{"day":"Sunday", "walk_dis": [], "run_dis": [], "bike_dis": []},
					{"day":"Monday", "walk_dis": [], "run_dis": [], "bike_dis": []},
					{"day":"Tuesday", "walk_dis": [], "run_dis": [], "bike_dis": []},
					{"day":"Wednesday", "walk_dis": [], "run_dis": [], "bike_dis": []},
					{"day":"Thursday", "walk_dis": [], "run_dis": [], "bike_dis": []},
					{"day":"Friday", "walk_dis": [], "run_dis": [], "bike_dis": []},
					{"day":"Saturday", "walk_dis": [], "run_dis": [], "bike_dis": []}];

	//array of dict like objects that store the activity name and how many times its been tweeted about
	var activityDict = [{"activity": "run", "amount": 0},
						{"activity": "walk", "amount": 0},
						{"activity": "hike", "amount": 0},
						{"activity": "workout", "amount": 0},
						{"activity": "bike", "amount": 0},
						{"activity": "swim", "amount": 0},
						{"activity": "yoga", "amount": 0},
						{"activity": "freestyle", "amount": 0},
						{"activity": "skate", "amount": 0},
						{"activity": "row", "amount": 0},
						{"activity": "chair ride", "amount": 0},
						{"activity": "dance", "amount": 0},
						{"activity": "pilates", "amount": 0},
						{"activity": "snowsport", "amount" : 0},
						{"activity": "meditation", "amount": 0},
						{"activity": "boxing", "amount": 0},
						{"activity":"sports", "amount": 0},
						{"activity": "activity", "amount": 0}];

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	for(let i = 0; i < tweet_array.length; i++ ){
		let activity = tweet_array[i].activityType;
		let category = tweet_array[i].source; 
		
		for( let u = 0; u < activityDict.length; u++){
			if (activityDict[u]["activity"]==activity){
				activityDict[u]["amount"] ++;
			}
		}
		if(category == "completed_event"){
			let day = tweet_array[i].time.getDay();
			let dist = tweet_array[i].distance;
			if(activity == "run"){
				weekArray[day]["run_dis"].push(dist);
			}
			
			if (activity == "walk"){
				weekArray[day]["walk_dis"].push(dist);
			}
			
			if (activity== "bike"){
				weekArray[day]["bike_dis"].push(dist);

			}

		}

	}
	console.log(weekArray);
	activityDict = activityDict.sort((a, b) => b["amount"]- a["amount"]);
	
	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": activityDict
	  },
	  
	  //TODO: Add mark and encoding
	  "mark": "bar",
	  "encoding": {
		"x": { 
			"field": "activity",
			"type": "nominal",
		},

		"y": {
			"field": "amount",
			"type": "quantitative",
		}
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});
	let firstMost = activityDict[0]["activity"];
	let secondMost = activityDict[1]["activity"];
	let thirdMost = activityDict[2]["activity"];
	$('span#firstMost').html(firstMost);
	$('span#secondMost').html(secondMost);
	$('span#thirdMost').html(thirdMost);

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	week_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"data": {
		  "values": weekArray
		},
		//TODO: Add mark and encoding
		"mark": "point",
		"encoding": {
		  "x": { 
			  "field": "day",
			  "type": "nominal",
		  },
  
		  "y": {
			  "field": "walk_dis",
			  "type": "quantitative",
		  }
		  
		},
		"transform": [
			{"flatten": "walk_dis"} 
		],
	  };
	  vegaEmbed('#distanceVis', week_vis_spec, {actions:false});

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});