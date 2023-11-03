class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        
        //live event
        if(this.text.toLowerCase().startsWith("watch my"))
        {
            return "live_event";
        }
        //achievement
        else if(this.text.toLowerCase().startsWith("achieved") ||
            this.text.toLowerCase().includes("set a goal"))
        {
            return "achievement";
        }
        //completed event
        else if (this.text.toLowerCase().startsWith("just completed") || 
            this.text.toLowerCase().startsWith("just posted") ||
            this.text.toLowerCase().startsWith("completed"))
        {
           // if(!this.text.includes("walk") && !this.text.includes("run") && !this.text.includes("bike") && !this.text.includes("workout") && !this.text.includes("hike")  ){
             //   console.log(this.text);
            //}
            return "completed_event"
        }
        //miscellaneous
        else {
            return "miscellaneous";
        }
        
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        if(this.text.includes("-")){
            return true;
        }

        return false;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        let startIndex = this.text.indexOf("-") +1;
        let endIndex = this.text.indexOf("https");
        return this.text.substring(startIndex,endIndex);
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        if(this.text.search(/swim/gi) > 0)
        {
            return "swim";
        }
        else if(this.text.search(/ run/gi) > 0)
        {
            return "run";
        }
        else if(this.text.search(/walk/gi) > 0)
        {
            return "walk";
        }
        else if(this.text.search(/hike/gi) > 0)
        {
            return "hike";
        }
        else if(this.text.search(/bike/gi) > 0)
        {
            return "bike";
        }
        else if(this.text.search(/yoga/gi) > 0)
        {
            return "yoga";
        }
        else if(this.text.search(/freestyle/gi) > 0)
        {
            return "freestyle";
        }       
        else if(this.text.search(/skate/gi) > 0)
        {
            return "skate";
        }
        else if(this.text.search(/row/gi) > 0)
        {
            return "row";
        }
        else if(this.text.search(/workout/gi) > 0 || (this.text.search(/gym/gi) > 0))
        {
            return "workout";
        }

        else if(this.text.search(/chair/gi) > 0 && this.text.search(/ride/gi) > 0)
        {
            return "chair ride";
        }
        else if(this.text.search(/dance/gi) > 0)
        {
            return "dance";
        }
        else if(this.text.search(/sport/gi) > 0)
        {
            return "sports";
        }
        else if(this.text.search(/pilate/gi) > 0)
        {
            return "pilates";
        }
        else if(this.text.search(/snowboard/gi) > 0 || (this.text.search(/ski/gi) > 0))
        {
            return "snowsport";
        }
        else if(this.text.search(/boxing/gi) > 0)
        {
            return "boxing";
        }
        else if(this.text.search(/meditation/gi) > 0)
        {
            return "meditation";
        }
        return "activity";
        
        //types: run, walk, hike, workout, bike, swim, yoga, 'activity', mysports freestyle,
        // skate, row, chair ride, dance, sports, pilates, snowboard, gym, meditation, boxing, 
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}