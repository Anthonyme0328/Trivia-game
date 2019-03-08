
//All click functions for all buttons
window.onload = function() {
    // restart button on click
    $("#restart_Button").on("click", Timer.reset);
    // start button on click
    $("#start_Button").on("click", Timer.start);
    // buttons that player can choose from on click
    $(".player_Choice").on("click", Timer.correctCount);
    // finshed button on click
    $("#finished_Button").on("click", Timer.stop);
   
};

//all of my global variable
var intervalId;
var timer_Going = false
var correctAnswers = 0;

// My timer in form of an object
var Timer = {

    // setting the inital time as 60 seconds
    time: 60,

    // function that is in control of updating score for correct answers when game is finshed
    correctCount: function() {
        
        //if statement that compares if your answer is the correct or incorrect selection
        if (timer_Going) {
            var selection = $(this).val().trim();
            if (selection === "correct" && correctAnswers < 7) {
                correctAnswers++
            }

            //stops the game when all seven answers are selected
            else if (correctAnswers > 7) {
                Timer.stop();
            }
        }

        //cannot pick a guess until the start button is pressed ** no cheating
        else if (!timer_Going) {
            event.preventDefault();
        }
    },

    //function that runs if the "reset" button is clicked
    reset: function() {

        //resets everything to original values
        Timer.stop();
        Timer.time = 60;
        correctAnswers = 0;
        $("#time_Left").text("1:00");
        $("input[type='radio']").prop('checked', false);
    },

    //time begining function
    start: function() {
        if (!timer_Going) {
            intervalId = setInterval(Timer.count, 1000);
            timer_Going = true;
        }
    },

    //stops game once game finished
    stop: function() {
        clearInterval(intervalId);
        timer_Going = false;

        //changes time to your score out of seven
        $("#time_Left").html("Score:" + correctAnswers + "/7");
    },

    //in control of the timer
    count: function() {

        // keeps counting until there is 0 on the clock then stops
        if (Timer.time > 0) {
            Timer.time--;
            var time_Change = Timer.timeConverter(Timer.time);

            //shows time left
            $("#time_Left").text(time_Change);
        }

        //causes the stop at zero
        else {
            Timer.stop();
        }
    },

    //changes the time over to actual seconds in a minute
    timeConverter: function(tc) {
        var minutes = Math.floor(tc / 60);
        var seconds = tc - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
        }
}; 