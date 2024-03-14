import React, { useState } from 'react';
import Canvas from './Canvas';

const Game: React.FC = () => {
    const [balls, setBalls] = useState([
        { id: 1, x: 100, y: 100, radius: 20, color: 'red', vx: 0, vy: 0 },
        { id: 2, x: 200, y: 200, radius: 30, color: 'blue', vx: 0, vy: 0 },
        // Добавьте больше шаров при необходимости
    ]);

    // return <Canvas balls={balls} />;
    return <Canvas balls={balls} setBalls={setBalls} />;
};

export default Game;
