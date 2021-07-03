var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// #3. Виселица и функции
// Функция выбора случайного слова из массива words
var pickWord = function() {
    var words = [
  "кит",
  "программа",
  "человек",
  "интернет",
  "браузер",
  "компьютер",
  "смартфон",
  "магазин",
  "хлеб",
  "код",
  "клавиатура",
  "монитор",
  "библиотека",
  "страна",
  "счастье",
];
return words[Math.floor(Math.random() * words.length)];
};

//Функция замены всех букв в случайно выбранном слове на символ "_"
var setupAnswerArray = function(word) {
    answerArray = [];
    for (i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    };
return answerArray;
};

//Функция отображения текущего состояния игры с помощью alert
var showPlayerProgress = function(answerArray) {
    alert(answerArray.join(" "));
};
//Функция запроса буквы у игрока
var getGuess = function() {
    return prompt("Введите букву или нажмите Отмена для выхода из игры");
};

//Функция обновления answerArray согласно итогам введенной игроком информации: 
//Выходим из игры, если нажал отмена
//Просим ввести только одну букву, если ввел больше одного символа или не ввел вообще ничего
//Проверяем, есть ли такая буква в массиве answerArray, и если такая буква есть, то обновляем исходый массив, заменяя соответствующий символ "_" на сооствутствующую букву
var updateGameStatus = function (guess, word, answerArray) {
        var appearances = 0;
        for (j = 0; j < word.length; j++) {
            if (word[j] === guess && answerArray[j] === "_") {
                answerArray[j] = guess;
                drawCorrectGuess(guess, j);
                appearances++;
            };
        };
    return appearances;
    };


//Функция отображения ответа и информирования о результатах игры
var showPlayerResult = function(answerArray) {
    alert(answerArray.join(" "));
    if (attempts > 0) {
        alert("Отлично! Было загадано слово " + word);
    } else {
        alert("Увы, но попытки закончились, это было слово " + word);
    };
};

//функция отрисовки человечка
var drawMan = function (uncurrentGuesses) {
    ctx.strokeStyle = "#4d6fc8";
    ctx.lineWidth = 3;
    if (uncurrentGuesses === 0) {
    ctx.strokeRect(500, 20, 20, 20);
    }
    else  if (uncurrentGuesses === 1) {
    ctx.beginPath();
    ctx.moveTo(510, 40);
    ctx.lineTo(510, 80);
    ctx.stroke();
    } 
    else  if (uncurrentGuesses === 2) {
    ctx.beginPath();
    ctx.moveTo(510, 60);
    ctx.lineTo(490, 50);
    ctx.stroke();
    } 
    else  if (uncurrentGuesses === 3) {
    ctx.beginPath();
    ctx.moveTo(510, 60);
    ctx.lineTo(530, 50);
    ctx.stroke();
    }
    else  if (uncurrentGuesses === 4) {
    ctx.beginPath();
    ctx.moveTo(510, 80);
    ctx.lineTo(487, 110);
    ctx.stroke();
    }
    else  if (uncurrentGuesses === 5) {
    ctx.beginPath();
    ctx.moveTo(510, 80);
    ctx.lineTo(533, 110);
    ctx.stroke();
    };
};

//функция рисования подчеркиваний
var drawUnderline = function(x) {
    ctx.fillStyle = "black";
    ctx.fillRect(600 + 40*x, 50, 30, 3);
    ctx.fillStyle = "white";
    ctx.fillRect(630 + 70*x, 50, 10, 3);
};

//Функция рисования отгаданных букв
var drawCorrectGuess = function (guess, y) {
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(guess.toUpperCase(), 602 + 40*y, 40);
};

//Функция рисования введенных букв, которых не было в слове
var drawUnCorrectGuess = function(guess, z){
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(guess.toUpperCase(), 602 + 40*z, 110);
    ctx.fillStyle = "red";
    ctx.fillRect(600 + 40*z, 100, 30, 3);
    ctx.fillStyle = "white";
    ctx.fillRect(630 + 70*z, 100, 10, 3);
};

//Пишем игру через функции
var word = pickWord();
var answerArray = setupAnswerArray(word);
var remainingLetters = word.length;
var attempts = 10;
var uncurrentGuesses = 0;
while (remainingLetters > 0 && attempts > 0) {
    showPlayerProgress(answerArray);
    var guess = getGuess();
    if (guess === null) {
        break;
    }
    else if (guess.length !== 1) {
        alert("Пожалуйста, введите одну букву");
    } else {
        for (var x = 0; x < word.length; x+=1) {
             drawUnderline(x);
        };
        guess = guess.toLowerCase();
        attempts--;
        var currentGuesses = updateGameStatus(guess, word, answerArray);
        remainingLetters -= currentGuesses;
        if (currentGuesses === 0) {
            drawMan(uncurrentGuesses);
            drawUnCorrectGuess(guess, uncurrentGuesses);
            uncurrentGuesses+=1;
        };
    };
};
showPlayerResult(answerArray);