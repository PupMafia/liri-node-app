require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var params = {
    screen_name: 'joshsan111'
};
var command = process.argv[2];
var input = process.argv[3];

//Twitter
if (command === "my-tweets") {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            }
        }
    });
}

//Spotify
if (command === "spotify-this-song" && input != undefined) {
    spotify.search({
        type: 'track',
        query: input,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].album);
    })
} else if (command === "spotify-this-song") {
    spotify.search({
        type: 'track',
        query: 'the sign',
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].album);
    })
}

//OMDB
if (command === "movie-this" && input != undefined) {
    request('http://www.omdbapi.com/?t=' + input + '&apikey=33fbbbc', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
} else if (command === "movie-this") {
    request('http://www.omdbapi.com/?i=tt0485947&apikey=33fbbbc', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
}