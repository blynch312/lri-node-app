require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

console.log(process.argv[2]);
command = process.argv[2];

title = "";

for (i = 3; i < process.argv.length; i++) {
    title = title + " " + process.argv[i];
    console.log(title);
}

function getTweets() {
    var client = new Twitter(keys.twitter);
    var params = {
        screen_name: "Face Book"

    };
    client.get("statuses/user_timeline", params, function (error, tweets, response) {
        // if (!error) {

        // }
        for (i = 0; i < tweets.length; i++) {
            console.log(tweets[i].created_at)
            console.log(tweets[i].text)
        }
        // console.log(tweets)

    })
}

function spotify(song) {
    var spotify = new Spotify(keys.spotify)
    // console.log("spotify");
    if (!song) {
        song = 'Happy'
    }
    track = song
    spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
        console.log("Artist: " + data.tracks.items[0].artists[0].name)
        console.log("Track: " + data.tracks.items[0].name)
        console.log("Album: " + data.tracks.items[0].album.name)
        console.log("Preview: " + data.tracks.items[0].preview_url)

    })
}
if (command === "my-tweets") {
    // Take logic out and put into a function
    getTweets()
}

if (command === "spotify-this-song") {
    spotify(title)
}


if (command === "do-what-it-says") {
    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            // console.log(body)
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie's release year is: " + JSON.parse(body).Year);
            console.log("The movie's Genre is: " + JSON.parse(body).Genre);
            console.log("The movie's Plot is: " + JSON.parse(body).Plot);
            console.log("The movie's Actors is: " + JSON.parse(body).Actors);
            console.log("The movie's Country is: " + JSON.parse(body).Country);
            console.log("The movie's Language is: " + JSON.parse(body).Language);
            // console.log(JSON.parse(body));

        } else {
            console.log("If you haven't watched 'Mr. Nobody,' then you should!")
        }
    });

}
