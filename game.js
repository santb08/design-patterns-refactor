exports = typeof window !== "undefined" && window !== null ? window : global;

const GAME_CATEGORIES = {
  POP: 'POP',
  SCIENCE: 'SCIENCE',
  SPORT: 'SPORT',
  ROCK: 'ROCK'
};

class Question {
  constructor(type, question) {
    this.type = type;
    this.question = question;
  }

  toObject() {
    return {
      type: this.type,
      question: this.question
    };
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.inPenaltyBox = false;
    this.place = 0;
    this.coins = 0;
  }

  get isWinner() {
    return this.coins === 6;
  }

  addCoins(coins) {
    console.log(`${this.name} now has ${this.coins} Gold Coins.`);
    this.coins += coins;
  }

  penalize(bool = true) {
    this.inPenaltyBox = bool;
  }

  /**
   * @returns {boolean} true if the player can afford the question
   */
  roll() {
    const roll = Math.floor(Math.random() * 6) + 1;
    console.log(`${this.name} rolled a ${roll}`);

    if (!this.inPenaltyBox) {
      this.moveForward(roll);

      console.log(`${this.name}'s new location is ${this.place}`);
      return true
    }

    if (roll % 2) {
      console.log(`${this.name} is still in the penalty box`);
      return false;
    }

    console.log(`${this.name} is getting out of the penalty box`);
    this.penalize(false);
    this.moveForward(roll);
    return true;
  }

  moveForward(spaces) {
    this.place = (this.place + spaces) % 12;
  }

  setPurse(coins) {
    this.coins = coins;
  }
}

class GameRefactor {
  constructor(questionsPerCategory = 50) {
    this.players = new Array();
    this.playerIterator = 0;
    this.initQuestions(questionsPerCategory);
  }

  get isPlayable() {
    return this.players.length >= 2;
  }

  get currentCategory() {
    const categoryIndex = this.currentPlayer.place % Object.keys(GAME_CATEGORIES).length;
    return Object.values(GAME_CATEGORIES)[categoryIndex];
  }

  get currentPlayer() {
    return this.players[this.playerIterator];
  }

  get winner() {
    return this.players.find(player => player.isWinner);
  }

  addPlayer(playerName) {
    const newPlayer = new Player(playerName);
    this.players.push(newPlayer);

    console.log(playerName + " was added");
    console.log("They are player number " + this.players.lenth);

    return true;
  }

  askQuestion() {
    console.log(`The category is ${this.currentCategory}`);
    const question = this.questions[this.currentCategory].pop();
    console.log(question.question);
  }

  initQuestions(questionsPerCategory) {
    this.questions = Object.assign(
      {},
      GAME_CATEGORIES,
      ...Object.keys(GAME_CATEGORIES).map((QUESTION_TYPE) => ({
        [QUESTION_TYPE]: Array.from({
          length: questionsPerCategory
        }).map((_, index) => new Question(QUESTION_TYPE, `Question ${index}`))
      })))
  }

  nextPlayer() {
    this.playerIterator = (this.playerIterator + 1) % this.players.length;
  }

  play() {
    if (!this.isPlayable) {
      throw new Error('Not enough players');
    }

    if (this.winner) {
      throw new Error('Game is already over');
    }

    const playerCanPlay = this.currentPlayer.roll();

    if (!playerCanPlay) {
      return;
    }

    this.askQuestion();
  }

  wasCorrectlyAnswered() {
    if (!this.currentPlayer.inPenaltyBox) {
      this.currentPlayer.addCoins(1);
    }

    console.log('Answer was correct!!!!');
    this.nextPlayer();
  }

  wrongAnswer() {
    console.log(`Question was incorrectly answered\n${this.currentPlayerName} was sent to the penalty box'`);
    console.log(this.players[this.currentPlayer] + " was sent to the penalty box");
    this.currentPlayer.penalize();
    this.nextPlayer();
  }
}

const game2 = new GameRefactor();

game2.addPlayer('Chet');
game2.addPlayer('Pat');
game2.addPlayer('Sue');

do {
  game2.play();
  if(Math.floor(Math.random() * 10) == 7) {
    game2.wrongAnswer();
  } else {
    game2.wasCorrectlyAnswered();
  }
} while (!game2.winner);

module.exports = {
  Game2: GameRefactor,
  GAME_CATEGORIES
};
