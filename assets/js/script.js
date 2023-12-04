//in order to display all of this information after the user clicks start quiz, everything is nested within a JQuery Function
$(document).ready(function() {
    var currentQuestion = 0;
    var correctAnswers = 0;
    var countdownTimer;
    var totalQuestions = 5;
    var quizContainer = $('#quiz-container');
    var highscoresContainer = $('#users-highscores');
    var startButton = $('#start-button');
    var highscoresButton = $('#highscores-button');
    var questionEL = $('#question');
    var optionsEL = $('#options');
    var messageEl = $('#message');
    var countdownEL = $('#countdown');
    var highscoresVisible = false;
    
    //questions array
    
    var questions = [
        {
            question: 'What color is a Belch?',
            options: ['oh god no', 'why?', 'Burple', 'IDK'],
            correctAnswer: 'Burple'
        },
        {
            question: 'What do you call a fish with no eyes?',
            options: ['Heard this before', 'you are not funny', 'get me out', 'A Fsssshhhhhh'],
            correctAnswer: 'A Fsssshhhhhh'
        },
        {
            question: 'What do you call a factory that makes OK products?',
            options: ['how much more of this?', 'A Satisfactory', 'struggling', 'inefficient'],
            correctAnswer: 'A Satisfactory'
        },
        {
            question: 'What does a dog say when you ask him 2+2?',
            options: ['Nothing, its a dog', 'His thesis on applied mathematics', 'where is the joke?', 'this is horrible'],
            correctAnswer: 'Nothing, its a dog'
        },
        {
            question: 'How can you tell if you have a Chameleon Infestation?',
            options: ['uhhh...', 'There is no way to be sure', 'not this option', 'yes this is the last one'],
            correctAnswer: 'There is no way to be sure'
        },
    ];
    
    //function start the quiz
    function startQuiz() {
        currentQuestion = 0;
        correctAnswers = 0;
        displayQuestion();
        startTimer();
        startButton.hide();
        highscoresButton.hide();
        quizContainer.show();
    }
    
    //function starts the timer when the quiz starts
    function startTimer() {
        countdownTimer = 60;
        var timerInterval = setInterval(function() {
            countdownEL.text(countdownTimer);
            countdownTimer--;
    
        if (countdownTimer < 0) {
            endQuiz();
            clearInterval(timerInterval);
            alert('Sorry Times Up!')
        }
        }, 1000);
    }
    //function displays the questions in order
    function displayQuestion() {
        var currentQ = questions[currentQuestion];
        questionEL.text(currentQ.question);
        optionsEL.empty();
        for (var i = 0; i < currentQ.options.length; i++) {
            var optionBtn = $('<button>').text(currentQ.options[i]);
            optionBtn.click(function() {
                var userSelect = $(this).text();
                if (userSelect === currentQ.correctAnswer) {
                    correctAnswers++;
                    messageEl.text('Correct!');
                    setTimeout(nextQuestion, 1000);
                } else {
                    messageEl.text('Incorrect, Try Again!');
                    countdownTimer -= 5;
                }
            });
            optionsEL.append(optionBtn);
        }
    }
    
    // This function calls the next question and ends the quiz once there are no more question
    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < totalQuestions) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }
    
    
    // function for endQuiz
    function endQuiz() {
        quizContainer.hide();
        messageEl.text(countdownTimer >= 0 ? 'Congratulations, You Won!' : 'Sorry, Game Over!');
    
        var userInitials = prompt('Enter Initials:');
          saveHighscore(userInitials, (correctAnswers / totalQuestions) * 100);
    
        highscoresButton.show();
          location.reload(); // Refresh the page
    }
    
    // saving user data to localStorage
    function saveHighscore(userInitials, userScore) {
        var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        highscores.push({ userInitials, userScore });
        localStorage.setItem('highscores', JSON.stringify(highscores));
    }
    
    //display highscores
    function displayHighscores() {
        var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        highscoresContainer.show();
    
        var highscoresList = $('#highscores-list');
        highscoresList.empty();
    
        highscores.forEach((score) => {
            highscoresList.append(`<li>${score.userInitials}: ${score.userScore}%</li>`);
        });
        newQuizBtn.show();
    }
    
    // Event listener for starting the quiz
    startButton.click(startQuiz);
    
    // Event listener to toggle highscore visibility
    highscoresButton.click(function() {
        if (!highscoresVisible) {
            displayHighscores(); newQuizBtn.show();
        } 
        if (highscoresVisible){
            displayHighscores(); newQuizBtn.hide();
        } else {
            highscoresContainer.hide();
                newQuizBtn.hide();
            }
    });
    
      // Event listener for starting a new quiz
    newQuizBtn.click(function() {
        startQuiz();
        highscoresContainer.hide();
    });
    });




