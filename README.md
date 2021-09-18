### Procedure
In a first place, we decided to configure our testing environment for the project, so we could mock the first test scenarios before starting breaking stuff.
We decided Jest, because it was a common library for all of us. Once we configured Jest in our project, we started mocking test for different functionalities of the Game:

* Initializing the game
* Mocking the categories/questions
* Rolling the dice
* Checking the answer
* Penalize players
* Answer the question correctly and wrong

Then, we left behind the primitive dependency that the project had, so we created a class for the Players and Questions as well.

* Player: So we can store the name of the player and the score. And we can penalize the player if he/she answers wrong. And implemented some util methods/functions for them.
* Question: So we can store the question content and it can be more scalable. And implemented some util methods/functions for them.
* Game: We can isolate better the functionalities of the game, and this allowed us to test it easier that the old implementation. Also, we focused on refactoring using Javascript/ES2020 as well.

