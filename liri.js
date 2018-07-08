console.log("working");

require("dotenv").config();

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require("./keys.js");
var request = require("request");
var fs = require('fs');
//var movieName = commaString.replace(/,/g, "-");


//variables for command line arguments
var arg1 = process.argv[2]
var arg2 = process.argv[3]


var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

//moviedatabase function
var queryUrl = "http://www.omdbapi.com/?t=" + arg2 + "&y=&plot=short&apikey=trilogy";
function movieInfo() {
    request(queryUrl, function (error, response, body) {
        movies = JSON.parse(body);
        console.log("The movie's rating is: " + movies.imdbRating + "\n" +
            "\nThe movies title is: " + movies.Title + "\n" +
            "\nThe moving came out in: " + movies.Year + "\n" +
            "\nThis movie was produced in: " + movies.Country + "\n" +
            "\nThe language spoken in this movie is: " + movies.Language + "\n" +
            "\nThe Rotten tomatoes rating of this movie is: " + movies.RottenTomatoes + "\n" +
            "\nThe plot of this movie: " + movies.Plot + "\n" +
            "\nThe actors in this movie are:" + movies.Actors + "\n");
    })
};
//twitter function 
function twitterInfo() {
    var params = { screen_name: arg2 }; //my username - 'Kyle53452112'
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            };
        }
    });
};

//spotify function
function spotifyInfo() {
    spotify.search({ type: 'track', query: arg2, count: 2 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        //console.log(data); 
        for (var j = 0; j < data.tracks.items.length; j++) {
            var song =
                "\nSong Title: " + data.tracks.items[j].name + "\n" +
                "\nLink to song: " + data.tracks.items[j].preview_url + "\n" +
                "\nArtist: " + data.tracks.items[j].album.artists[0].name + "\n" +
                "\nAlbum: " + data.tracks.items[j].album.name + "\n" +
                "---------------------------------------------------------------------" + "\n";
            console.log(song);
        }
    });
};

//do what it says 
function dowhatitsays(){
    fs.readFile("random.txt", "utf8", function(error, data) {
       if (error) {
         return console.log(error);
     };
      
          console.log(data);
    })};
//switch for command line input
switch (arg1) {
    case 'my-tweets':
        twitterInfo();
        break;
    case 'spotify-this-song':
        spotifyInfo();
        break;
    case 'movie-this':
        movieInfo();
        default:
  console.log("Mr. Nobody");
        break;
    case 'do-what-it-says':
         dowhatitsays();
       break;
};
