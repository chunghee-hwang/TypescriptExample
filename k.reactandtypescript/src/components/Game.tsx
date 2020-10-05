import React from 'react';
import Board from './Board';
interface GameProps{
    /* empty */
}
interface GameState{
    history: Array<{squares: Array<'O'|'X'>}>;
    stepNumber: number;
    xIsNext: boolean;
}
class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null)
        }],
        stepNumber: 0,
        xIsNext: true,
      }
    }
    render(): JSX.Element
    {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = this._calculateWinner(current.squares);
  
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Move #' + move :
          'Game start';
        return (
          <li key={move}>
            <button onClick={() => this._jumpTo(move)}>{desc}</button>
          </li>
        );
      });
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this._handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
    private _handleClick(i:number):void {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);;
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (this._calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
    private _jumpTo(step:number):void {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) ? false : true,
      });
    }

    private _calculateWinner(squares: Array<'O'|'X'>): 'O'|'X'|null
    {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }
  }

  export default Game