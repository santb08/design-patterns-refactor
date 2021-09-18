const { Game2, GAME_CATEGORIES } = require('../game.js');

describe("Game functionalities", function() {
  const gameRefactor = new Game2();

  it('init the game', () => {
    expect(Object.keys(gameRefactor.questions)).toEqual(Object.keys(GAME_CATEGORIES));
    Object.values(gameRefactor.questions).forEach((categoryQuestions) => {
      expect(categoryQuestions.length).toBe(50);
    });
  });

  it('Current category test', () => {
    const categories = Object.values(GAME_CATEGORIES);

    const game = new Game2();
    game.addPlayer('Test 1');
    game.addPlayer('Test 2');

    game.players.forEach(() => {
      const expectedCategory1 = categories[game.currentPlayer.place % categories.length];
      expect(game.currentCategory).toBe(expectedCategory1);
    });
  });

  it('Adds a player to the game', () => {
    const newGame = new Game2();
    const newPlayer = 'Test';
    newGame.addPlayer(newPlayer);
    const lastPlayer = [...newGame.players].pop();
    expect(lastPlayer).toMatchObject({ name: newPlayer });
  })

  it('Test game is playable', () => {
    const newGame = new Game2();
    newGame.addPlayer('Test 1');
    expect(newGame.isPlayable).toBe(false);
    newGame.addPlayer('Test 2');
    expect(newGame.isPlayable).toBe(true);
  });

  it('Test user roll', () => {
    const newGame = new Game2();
    newGame.addPlayer('Test 1');
  })
});
