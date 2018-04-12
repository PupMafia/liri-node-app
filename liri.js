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
var input = process.argv[2];
var song = process.argv[3];
var defaultSong = 'The Sign';

//Twitter
if (input === "my-tweets") {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            }
        }
    });
}

//Spotify
if (input === "spotify-this-song" || song != undefined) {
    spotify.search({
        type: 'track',
        query: song,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].album);
    })
} else {
    spotify.search({
        type: 'track',
        query: defaultSong,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].album);
    })
}

