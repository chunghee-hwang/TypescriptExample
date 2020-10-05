# 리액트와 타입스크립트
## [JSX가 아닌 TSX로 프로젝트 만들기](https://create-react-app.dev/docs/adding-typescript/)

```bash
npm install -g create-react-app

npx create-react-app my-app --template typescript

npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

## JS 리액트에서 TS 리액트로 이주하기
### 사용할 예제 프로젝트
https://github.com/saystone/tic-tac-toe

### 이주하기

#### 함수형 컴포넌트 이주하기

##### 이주 전(JSX)
```jsx
function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  )
}
```

##### 이주 후(TSX)
```tsx
import React from 'react';
/*
인터페이스를 이용하여 props의 타입을 명시
*/
interface SquareProps{
    value: 'O' | 'X'; //리터럴 타입
    onClick(): void;
}
export default function Square(props: SquareProps): JSX.Element
{
    return (
        <button className="square" onClick={()=>props.onClick()}>
            {props.value}
        </button>
    );
}
```

#### 클래스형 컴포넌트 이주하기
##### 이주 전(JSX)
```jsx
class Board extends React.Component {
  renderSquare(i) {
    const squares = this.props.squares;
    return <Square value={squares[i]} onClick={() => this.props.onClick(i)} />;
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}
```

##### 이주 후(TSX)
* 모든 변수의 타입을 명시한다.
* props나 state는 인터페이스로 명시한다.
```tsx
import React from 'react';
import Square from './Square';

interface BoardProps{
    squares: Array<'O'|'X'>;
    onClick(i: number): void;
}

interface BoardState{
    /* empty */
}

//제네릭으로 props의 타입, state의 타입을 인터페이스로 명시
class Board extends React.Component<BoardProps, BoardState> {
    private _renderSquare(i: number): JSX.Element 
    {
      const squares = this.props.squares;
      return <Square value={squares[i]} onClick={() => this.props.onClick(i)} />;
    }
    render(): JSX.Element
    {
      return (
        <div>
        </div>
      );
    }
  }

export default Board;
```