## Tic Tac Toe Game

 This is a self-contained, efficient, and visually appealing Tic Tac Toe implementation, with a unique isomorphic approach and mathematical optimization for determining the winner. The Game is [Available here!](https://nasheethahmeda.github.io/Tic-Tac-Toe-Game)

### Design:
- **HTML:** Defines the game board, status bar, and Title/Restart button.
- **CSS:** Styles the game board, cells, and status bar for a clean and responsive UI.
- **JavaScript:** Implements the game logic, player turns, and win conditions.

### Isomorphic Logic:
- Instead of predefined winning combinations, the game checks for isomorphic sets where three numbers sum to 15.
- Utilizes a set to efficiently find complementary numbers, simplifying the logic.
- Achieves O(n) time complexity for finding winning combinations. (i.e 9 iterations at max, same as Hard coded checks)
- It can be Scaled for Larger Grid sizes like mega tic tac toe.

### Other Features:
1. **Dynamic UI:** Fully designed without *external assets*, providing an interactive and visually appealing game interface for both Desktop and Mobile Screens.
2. **Mathematical Optimization:** Transforms the win-checking problem into a two-sum challenge, optimizing the search process.
3. **Game State Handling:** Dynamically updates game state based on moves, allowing adaptability to variations.
4. **User Interaction:** Simple click-to-play functionality, with a restart button for convenience.
