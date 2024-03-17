import React, { useState } from 'react';
import Canvas from './Canvas';


const Game: React.FC = () => {

    const initialState = [
        { id: 2, x: 100, y: 100, radius: 30, color: 'green', vx: 0, vy: 0 },
        { id: 12, x: 400, y: 200, radius: 30, color: 'coral', vx: 0, vy: 0 },
        { id: 3, x: 400, y: 350, radius: 30, color: 'blue', vx: 0, vy: 0 },
        { id: 5, x: 600, y: 500, radius: 30, color: '#CECECE', vx: 0, vy: 0 },
        { id: 6, x: 500, y: 200, radius: 30, color: '#77E675FF', vx: 0, vy: 0 },
        { id: 7, x: 450, y: 300, radius: 30, color: 'red', vx: 0, vy: 0 },
        { id: 8, x: 420, y: 400, radius: 30, color: '#006262FF', vx: 0, vy: 0 },
        { id: 9, x: 470, y: 500, radius: 30, color: '#9457EBFF', vx: 0, vy: 0 },
        { id: 45, x: 350, y: 500, radius: 30, color: '#7C45EBFF', vx: 0, vy: 0 },

    ]

    const [balls, setBalls] = useState(initialState);
    const canvasWidth = 800; // Ширина холста
    const canvasHeight = 600; // Высота холста

    return (
        <>
            <Canvas
                balls={balls}
                setBalls={setBalls}
                canvasWidth={canvasWidth}
                canvasHeight={canvasHeight}
            />
            
            <button
                onClick={() => setBalls(initialState)}
                style={
                    {
                        padding: '20px',
                        width: '100%',
                        fontSize: 20,
                        background: 'red'
                    }
                }
            >обновить</button>
        </>
    )
};


export default Game;
