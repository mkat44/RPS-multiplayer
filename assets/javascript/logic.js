$(document).ready(function() {
    var config = {
    apiKey: "AIzaSyDWzO3IC7dX8G2CSr42yO5_7eGqXhqYuuM",
    authDomain: "rps-multiplayer-594ce.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-594ce.firebaseio.com",
    projectId: "rps-multiplayer-594ce",
    storageBucket: "rps-multiplayer-594ce.appspot.com",
    messagingSenderId: "177254641701"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#playerArea").hide();
    $(".prompt").text("Please sign in!");
    $(".game").hide();
    $(".submit").on("click", function(event) {
        event.preventDefault();
        var user = $("#user-name").val().trim();
        var email = $("#email-input").val().trim();
        var joinDate = moment().format();
        database.ref("/players").push({
            user: user,
            email: email,
            joinDate: joinDate
        });

        $("#credentialsArea").hide();
        $("#playerArea").show();
        $(".game").show();
        $(".prompt").text("Please select one.");

        database.ref("/players").on("child_added", function(snapshot) {
        $(".username-area").html(snapshot.val().user);
        $(".email-area").html(snapshot.val().email);
        $(".join-date").html(snapshot.val().joinDate);
        $("#users-area").append(snapshot.val().user + " @ " + snapshot.val().joinDate);
        });

    });

    $(".message").on("click", function(event) {
        event.preventDefault();
        var message = $("#chat-input").val().trim();
        var timestamp = moment().format();
        database.ref("/chat").push({
            message: message,
            timestamp: timestamp
        });
    });
    database.ref("/chat").on("child_added", function(snapshot) {
        $("#chat-area").append(snapshot.val().timestamp + ": " + snapshot.val().message);
    });

    $(".game-btn").on("click", function(event) {
        event.preventDefault();
        var choice = $(this).val();
        console.log(choice);
        var c2 = database.ref("game");
        c2.on("child_added", function(snapshot) {
            if (snapshot.key == "choice2") {
                database.ref("game").once("value", function(snapshot) {
                    var choice1 = snapshot.child("choice1").val();
                    var choice2 = snapshot.child("choice2").val();
                    if (choice1 === choice2) {
                        // tie
                        // rpsharmony.gif
                    }
                    else if (choice1 === "rock" && choice2 === "scissors") {
                        // choice1 wins
                        // rockwins.gif
                    }
                    else if (choice1 === "rock" && choice2 === "paper") {
                        // choice2 wins
                        // rockloses.gif
                    }
                    else if (choice1 === "paper" && choice2 === "rock") {
                        //choice1 wins
                        //paperwins.gif
                    }
                    else if (choice1 === "paper" && choice2 == "scissors") {
                        //choice2 wins
                        //paperloses.gif
                    }
                    else if (choice1 === "scissors" && choice2 === "paper") {
                        //choice1 wins
                        //scissorswins.gif
                    }
                    else if (choice1 === "scissors" && choice2 === "rock") {
                        //choice2 wins
                        //scissorsloses.gif
                    }
                })
            }
        })
    })
})

// Hi, TAs! Sadly I ran out of time to finish this game. Firebase has a lot of little intricacies that made this surprisingly difficult. I'm looking forward to learning other databases
// but after this I'm not so sure... Hopefully it's just that firebase is a bit of a pain in some regards. Here's what I didn't get completed:
// - Adding variables for win/lose/tie
// - Adding gifs for win/lose/tie to the DOM
// - Fixing whatever weirdness is going on with the current user and why it doesn't always show the last person added.
// - I also wish I had time to fix up the whole players section so that it checked if someone was added before it readded them, but c'est la vie!
// - Also this is probably a few minutes late now!