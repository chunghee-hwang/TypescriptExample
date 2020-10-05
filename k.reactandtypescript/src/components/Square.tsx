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