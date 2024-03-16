import React, { useState } from 'react';
import Canvas from './Canvas';

const Game: React.FC = () => {

    const initialState = [
        { id: 2, x: 300, y: 100, radius: 50, color: 'green', vx: 0, vy: 0 },
        { id: 6, x: 400, y: 200, radius: 50, color: 'coral', vx: 0, vy: 0 },
        { id: 3, x: 400, y: 400, radius: 50, color: 'blue', vx: 0, vy: 0 },
        { id: 5, x: 400, y: 500, radius: 50, color: 'red', vx: 0, vy: 0 },
    ]
    const [balls, setBalls] = useState(
        initialState
        // [
        // { id: 1, x: 100, y: 100, radius: 50, color: 'red', vx: 0, vy: 0 },
        // { id: 2, x: 300, y: 100, radius: 50, color: 'green', vx: 0, vy: 0 },
        // { id: 6, x: 400, y: 200, radius: 50, color: 'coral', vx: 0, vy: 0 },
        // { id: 3, x: 400, y: 400, radius: 50, color: 'blue', vx: 0, vy: 0 },
        // { id: 5, x: 400, y: 500, radius: 50, color: 'red', vx: 0, vy: 0 },
        // { id: 4, x: 200, y: 200, radius: 30, color: 'blue', vx: 0, vy: 0 },
        // Добавьте больше шаров при необходимости
        // ]
    );
    const canvasWidth = 800; // Ширина холста
    const canvasHeight = 600; // Высота холста
    const friction = 0.6; // Коэффициент трения

    // return <Canvas balls={balls} />;
    return (
        <>
            <Canvas
                balls={balls}
                setBalls={setBalls}
                canvasWidth={canvasWidth}
                canvasHeight={canvasHeight}
            // friction={friction}
            />
            <button
                onClick={() => setBalls(initialState)}
                style={
                    {
                        padding: '20px',
                        width: '100%',
                        fontSize: 20,
                        background: 'red'
                        // display: 'inline-block'
                    }
                }
            >обновить</button>
        </>
    )

};


export default Game;
