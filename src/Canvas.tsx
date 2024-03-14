import React, { useRef, useEffect, useState } from 'react';


interface Ball {
    id: number;
    x: number;
    y: number;
    radius: number;
    color: string;
    vx: number;
    vy: number;
}

interface CanvasProps {
    balls: Ball[];
    setBalls: React.Dispatch<React.SetStateAction<Ball[]>>;
}

const Canvas: React.FC<CanvasProps> = ({ balls, setBalls }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [draggingBallId, setDraggingBallId] = useState<number | null>(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (context && canvas && balls) {
            // Clear canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw balls
            balls.forEach(ball => {
                context.beginPath();
                context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                context.fillStyle = ball.color;
                context.fill();
                context.closePath();
            });
        }
    }, [balls]);



    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (draggingBallId !== null) {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            setBalls(prevBalls => prevBalls.map(ball => {
                if (ball.id === draggingBallId) {
                    return { ...ball, x: mouseX, y: mouseY };
                }
                return ball;
            }));
        }
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        console.log('handleMouseDown');
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        console.log('mouseX, mouseY:', mouseX, mouseY);


        balls.forEach(ball => {
            const dx = ball.x - mouseX;
            const dy = ball.y - mouseY;
            console.log('dx, dy:', dx, dy);

            const distance = Math.sqrt(dx * dx + dy * dy);
            console.log('distance:', distance);

            // Проверяем, попал ли клик на край шара
            if (distance <= ball.radius) {
                console.log('distance <= ball.radius')
                // Определяем угол между точкой касания и центром шара
                const angle = Math.atan2(dy, dx);

                // Желаемая скорость отталкивания
                const pushSpeed = 10;

                // Вычисляем новый вектор скорости
                const newVx = pushSpeed * Math.cos(angle);
                const newVy = pushSpeed * Math.sin(angle);

                // Обновляем вектор скорости шара
                setBalls(prevBalls =>
                    prevBalls.map(prevBall =>
                        prevBall.id === ball.id ? { ...prevBall, vx: newVx, vy: newVy } : prevBall
                    )
                );
            }
        });
    };


    const handleMouseUp = () => {
        setDraggingBallId(null);
    };

    
    useEffect(() => {
        let animationId: number;

        const update = () => {
            setBalls(prevBalls =>
                prevBalls.map(ball => ({
                    ...ball,
                    x: ball.x + ball.vx,
                    y: ball.y + ball.vy
                }))
            );

            animationId = requestAnimationFrame(update);
        };

        animationId = requestAnimationFrame(update);

        return () => cancelAnimationFrame(animationId);
    }, [balls, setBalls]);




    return (
        <canvas style={{
            margin: '20px',
            border: 'solid 2px'
        }}
            ref={canvasRef}
            width={800}
            height={600}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        />
    );
};

export default Canvas;
