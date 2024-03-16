// import React, { useRef, useEffect, useState } from 'react';


// interface Ball {
//     id: number;
//     x: number;
//     y: number;
//     radius: number;
//     color: string;
//     vx: number;
//     vy: number;
// }

// interface CanvasProps {
//     balls: Ball[];
//     setBalls: React.Dispatch<React.SetStateAction<Ball[]>>;
//     canvasWidth: number;
//     canvasHeight: number;
//     friction: number; // Добавляем коэффициент трения
// }

// const Canvas: React.FC<CanvasProps> = ({ balls, setBalls, canvasWidth, canvasHeight, friction }) => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const [draggingBallId, setDraggingBallId] = useState<number | null>(null);


//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const context = canvas?.getContext('2d');

//         if (context && canvas && balls) {
//             // Clear canvas
//             context.clearRect(0, 0, canvas.width, canvas.height);

//             // Draw balls
//             balls.forEach(ball => {
//                 context.beginPath();
//                 context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
//                 context.fillStyle = ball.color;
//                 context.fill();
//                 context.closePath();
//             });
//         }
//     }, [balls]);



// // Делаем остановку если скорость низкая
//     useEffect(() => {
//         let animationId: number;

//         const update = () => {
//             setBalls(prevBalls =>
//                 prevBalls.map(ball => {
//                     // Обновляем позицию шара
//                     let newX = ball.x + ball.vx;
//                     let newY = ball.y + ball.vy;

//                     // Проверяем столкновение со стенками
//                     if (newX - ball.radius < 0 || newX + ball.radius > canvasWidth) {
//                         // Если столкновение с левой или правой стенкой, меняем направление по X
//                         ball.vx = -ball.vx * friction; // Уменьшаем скорость на коэффициент трения
//                         newX = ball.x + ball.vx;
//                     }
//                     if (newY - ball.radius < 0 || newY + ball.radius > canvasHeight) {
//                         // Если столкновение с верхней или нижней стенкой, меняем направление по Y
//                         ball.vy = -ball.vy * friction; // Уменьшаем скорость на коэффициент трения
//                         newY = ball.y + ball.vy;
//                     }

//                     // Проверяем, если скорость меньше порогового значения, устанавливаем скорость в 0
//                     if (Math.abs(ball.vx) < 0.35) {
//                         ball.vx = 0;
//                     }
//                     if (Math.abs(ball.vy) < 0.35) {
//                         ball.vy = 0;
//                     }

//                     // Обновляем позицию шара
//                     return { ...ball, x: newX, y: newY };
//                 })
//             );

//             handleBallCollisions(); // Обработка столкновений шаров

//             animationId = requestAnimationFrame(update);
//         };

//         animationId = requestAnimationFrame(update);

//         return () => cancelAnimationFrame(animationId);
//     }, [balls, setBalls, canvasWidth, canvasHeight, friction]);


//     useEffect(() => {
//         let animationId: number;

//         const update = () => {
//             setBalls(prevBalls =>
//                 prevBalls.map(ball => {
//                     // Обновляем позицию шара
//                     let newX = ball.x + ball.vx;
//                     let newY = ball.y + ball.vy;

//                     // Проверяем столкновение со стенками
//                     if (newX - ball.radius < 0 || newX + ball.radius + 5 > canvasWidth) {
//                         // Если столкновение с левой или правой стенкой, меняем направление по X
//                         ball.vx = -ball.vx * friction; // Уменьшаем скорость на коэффициент трения
//                         newX = ball.x + ball.vx;
//                     }
//                     if (newY - ball.radius < 0 || newY + ball.radius + 5 > canvasHeight) {
//                         // Если столкновение с верхней или нижней стенкой, меняем направление по Y
//                         ball.vy = -ball.vy * friction; // Уменьшаем скорость на коэффициент трения
//                         newY = ball.y + ball.vy;
//                     }

//                     // Обновляем позицию шара
//                     return { ...ball, x: newX, y: newY };
//                 })
//             );

//             animationId = requestAnimationFrame(update);
//         };

//         animationId = requestAnimationFrame(update);

//         return () => cancelAnimationFrame(animationId);
//     }, [balls, setBalls, canvasWidth, canvasHeight]);


//     // const handleBallCollisions = () => {
//     //     balls.forEach((ball1, index1) => {
//     //         balls.forEach((ball2, index2) => {
//     //             if (index1 !== index2) {
//     //                 const dx = ball2.x - ball1.x;
//     //                 const dy = ball2.y - ball1.y;
//     //                 const distance = Math.sqrt(dx * dx + dy * dy);

//     //                 // Проверяем столкновение шаров
//     //                 if (distance < ball1.radius + ball2.radius) {
//     //                     // Вычисляем угол столкновения
//     //                     const angle = Math.atan2(dy, dx);

//     //                     // Вычисляем новые скорости для обоих шаров
//     //                     const v1 = Math.sqrt(ball1.vx * ball1.vx + ball1.vy * ball1.vy);
//     //                     const v2 = Math.sqrt(ball2.vx * ball2.vx + ball2.vy * ball2.vy);
//     //                     const theta1 = Math.atan2(ball1.vy, ball1.vx);
//     //                     const theta2 = Math.atan2(ball2.vy, ball2.vx);

//     //                     // Рассчитываем новые скорости для обоих шаров
//     //                     const newVx1 = v2 * Math.cos(theta2 - angle) * Math.cos(angle) + v1 * Math.sin(theta1 - angle) * Math.cos(angle + Math.PI / 2);
//     //                     const newVy1 = v2 * Math.cos(theta2 - angle) * Math.sin(angle) + v1 * Math.sin(theta1 - angle) * Math.sin(angle + Math.PI / 2);
//     //                     const newVx2 = v1 * Math.cos(theta1 - angle) * Math.cos(angle) + v2 * Math.sin(theta2 - angle) * Math.cos(angle + Math.PI / 2);
//     //                     const newVy2 = v1 * Math.cos(theta1 - angle) * Math.sin(angle) + v2 * Math.sin(theta2 - angle) * Math.sin(angle + Math.PI / 2);

//     //                     // Устанавливаем новые скорости для шаров
//     //                     setBalls(prevBalls => prevBalls.map((ball, index) => {
//     //                         if (index === index1) {
//     //                             return { ...ball, vx: newVx1, vy: newVy1 };
//     //                         }
//     //                         if (index === index2) {
//     //                             return { ...ball, vx: -newVx2, vy: -newVy2 };
//     //                         }
//     //                         return ball;
//     //                     }));
//     //                 }
//     //             }
//     //         });
//     //     });
//     // };



//     const handleBallCollisions = () => {
//         balls.forEach((ball1, index1) => {
//             balls.forEach((ball2, index2) => {
//                 if (index1 !== index2) {
//                     const dx = ball2.x - ball1.x;
//                     const dy = ball2.y - ball1.y;
//                     const distance = Math.sqrt(dx * dx + dy * dy);

//                     // Проверяем столкновение шаров
//                     if (distance < ball1.radius + ball2.radius) {
//                         // Обменяем скорости обоих шаров на противоположные
//                         setBalls(prevBalls => prevBalls.map((ball, index) => {
//                             if (index === index1) {
//                                 return { ...ball, vx: -ball.vx, vy: -ball.vy };
//                             }
//                             if (index === index2) {
//                                 return { ...ball, vx: -ball.vx, vy: -ball.vy };
//                             }
//                             return ball;
//                         }));

//                         // Выполните дополнительные действия здесь, если необходимо
//                         console.log(`Шар ${ball1.id} наезжает на шар ${ball2.id}`);
//                     }
//                 }
//             });
//         });
//     };







//     // const handleBallCollisions = () => {
//     //     balls.forEach((ball1, index1) => {
//     //         balls.forEach((ball2, index2) => {
//     //             if (index1 !== index2) {
//     //                 const dx = ball2.x - ball1.x;
//     //                 const dy = ball2.y - ball1.y;
//     //                 const distance = Math.sqrt(dx * dx + dy * dy);

//     //                 // Проверяем столкновение шаров
//     //                 if (distance < ball1.radius + ball2.radius) {
//     //                     // Вычисляем угол столкновения
//     //                     const angle = Math.atan2(dy, dx);

//     //                     // Вычисляем новые скорости для обоих шаров
//     //                     const v1 = Math.sqrt(ball1.vx * ball1.vx + ball1.vy * ball1.vy);
//     //                     const v2 = Math.sqrt(ball2.vx * ball2.vx + ball2.vy * ball2.vy);
//     //                     const theta1 = Math.atan2(ball1.vy, ball1.vx);
//     //                     const theta2 = Math.atan2(ball2.vy, ball2.vx);

//     //                     // Рассчитываем новые скорости для обоих шаров
//     //                     const newVx1 = v2 * Math.cos(theta2 - angle) * Math.cos(angle) + v1 * Math.sin(theta1 - angle) * Math.cos(angle + Math.PI / 2);
//     //                     const newVy1 = v2 * Math.cos(theta2 - angle) * Math.sin(angle) + v1 * Math.sin(theta1 - angle) * Math.sin(angle + Math.PI / 2);
//     //                     const newVx2 = v1 * Math.cos(theta1 - angle) * Math.cos(angle) + v2 * Math.sin(theta2 - angle) * Math.cos(angle + Math.PI / 2);
//     //                     const newVy2 = v1 * Math.cos(theta1 - angle) * Math.sin(angle) + v2 * Math.sin(theta2 - angle) * Math.sin(angle + Math.PI / 2);

//     //                     // Устанавливаем новые скорости для шаров
//     //                     setBalls(prevBalls => prevBalls.map((ball, index) => {
//     //                         if (index === index2) {
//     //                             return { ...ball, vx: -newVx2, vy: -newVy2 };
//     //                         }
//     //                         if (index === index1) {
//     //                             return { ...ball, vx: newVx1, vy: newVy1 };
//     //                         }
//     //                         return ball;
//     //                     }));
//     //                 }
//     //             }
//     //         });
//     //     });
//     // };


//     // const handleBallCollisions = () => {
//     //     balls.forEach((ball1, index1) => {
//     //         balls.forEach((ball2, index2) => {
//     //             if (index1 !== index2) {
//     //                 const dx = ball2.x - ball1.x;
//     //                 const dy = ball2.y - ball1.y;
//     //                 const distance = Math.sqrt(dx * dx + dy * dy);

//     //                 // Проверяем столкновение шаров
//     //                 if (distance < ball1.radius + ball2.radius) {
//     //                     // Обменяем скорости обоих шаров на противоположные
//     //                     setBalls(prevBalls => prevBalls.map((ball, index) => {
//     //                         if (index === index1) {
//     //                             return { ...ball, vx: -ball.vx, vy: -ball.vy };
//     //                         }
//     //                         if (index === index2) {
//     //                             return { ...ball, vx: -ball.vx, vy: -ball.vy };
//     //                         }
//     //                         return ball;
//     //                     }));
//     //                 }
//     //             }
//     //         });
//     //     });
//     // };






//     useEffect(() => {
//         let animationId: number;

//         const update = () => {
//             setBalls(prevBalls =>
//                 prevBalls.map(ball => {
//                     // Обновляем позицию шара
//                     let newX = ball.x + ball.vx;
//                     let newY = ball.y + ball.vy;

//                     // Проверяем столкновение со стенками
//                     if (newX - ball.radius < 0 || newX + ball.radius > canvasWidth) {
//                         // Если столкновение с левой или правой стенкой, меняем направление по X
//                         ball.vx = -ball.vx * friction; // Уменьшаем скорость на коэффициент трения
//                         newX = ball.x + ball.vx;
//                     }
//                     if (newY - ball.radius < 0 || newY + ball.radius > canvasHeight) {
//                         // Если столкновение с верхней или нижней стенкой, меняем направление по Y
//                         ball.vy = -ball.vy * friction; // Уменьшаем скорость на коэффициент трения
//                         newY = ball.y + ball.vy;
//                     }

//                     // Обновляем позицию шара
//                     return { ...ball, x: newX, y: newY };
//                 })
//             );

//             handleBallCollisions(); // Обработка столкновений шаров

//             animationId = requestAnimationFrame(update);
//         };

//         animationId = requestAnimationFrame(update);

//         return () => cancelAnimationFrame(animationId);
//     }, [balls, setBalls, canvasWidth, canvasHeight, friction]);


//     const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
//         if (draggingBallId !== null) {
//             const canvas = canvasRef.current;
//             if (!canvas) return;

//             const rect = canvas.getBoundingClientRect();
//             const mouseX = event.clientX - rect.left;
//             const mouseY = event.clientY - rect.top;

//             setBalls(prevBalls => prevBalls.map(ball => {
//                 if (ball.id === draggingBallId) {
//                     return { ...ball, x: mouseX, y: mouseY };
//                 }
//                 return ball;
//             }));
//         }
//     };

//     const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
//         console.log('handleMouseDown');
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const rect = canvas.getBoundingClientRect();
//         const mouseX = event.clientX - rect.left;
//         const mouseY = event.clientY - rect.top;
//         console.log('mouseX, mouseY:', mouseX, mouseY);


//         balls.forEach(ball => {
//             const dx = ball.x - mouseX;
//             const dy = ball.y - mouseY;
//             console.log('dx, dy:', dx, dy);

//             const distance = Math.sqrt(dx * dx + dy * dy);
//             console.log('distance:', distance);

//             // Проверяем, попал ли клик на край шара
//             if (distance <= ball.radius) {
//                 console.log('distance <= ball.radius')
//                 // Определяем угол между точкой касания и центром шара
//                 const angle = Math.atan2(dy, dx);

//                 // Желаемая скорость отталкивания
//                 const pushSpeed = 5;

//                 // Вычисляем новый вектор скорости
//                 const newVx = pushSpeed * Math.cos(angle);
//                 const newVy = pushSpeed * Math.sin(angle);

//                 // Обновляем вектор скорости шара
//                 setBalls(prevBalls =>
//                     prevBalls.map(prevBall =>
//                         prevBall.id === ball.id ? { ...prevBall, vx: newVx, vy: newVy } : prevBall
//                     )
//                 );
//             }
//         });
//     };


//     const handleMouseUp = () => {
//         setDraggingBallId(null);
//     };


//     useEffect(() => {
//         let animationId: number;

//         const update = () => {
//             setBalls(prevBalls =>
//                 prevBalls.map(ball => ({
//                     ...ball,
//                     x: ball.x + ball.vx,
//                     y: ball.y + ball.vy
//                 }))
//             );

//             animationId = requestAnimationFrame(update);
//         };

//         animationId = requestAnimationFrame(update);

//         return () => cancelAnimationFrame(animationId);
//     }, [balls, setBalls]);




//     return (
//         <canvas style={{
//             margin: '20px',
//             border: 'solid 2px'
//         }}
//             ref={canvasRef}
//             width={800}
//             height={600}
//             onMouseDown={handleMouseDown}
//             onMouseMove={handleMouseMove}
//             onMouseUp={handleMouseUp}
//         />
//     );
// };

// export default Canvas;






import React, { useRef, useEffect, useState } from 'react';

// Определение интерфейса для шаров
interface Ball {
    id: number;
    x: number;
    y: number;
    radius: number;
    color: string;
    vx: number; //скорость по горизонтали
    vy: number;
}

// Определение интерфейса для свойств холста
interface CanvasProps {
    balls: Ball[]; // Массив шаров
    setBalls: React.Dispatch<React.SetStateAction<Ball[]>>; // Функция для обновления состояния шаров
    canvasWidth: number;
    canvasHeight: number;
}

// Компонент Canvas
const Canvas: React.FC<CanvasProps> = ({
    balls,
    setBalls,
    canvasWidth,
    canvasHeight }) => {

    const canvasRef = useRef<HTMLCanvasElement>(null); // Ссылка на элемент холста
    const [draggingBallId, setDraggingBallId] = useState<number | null>(null); // Идентификатор перетаскиваемого шара

    // Эффект для отрисовки шаров на холсте
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (context && canvas && balls) {
            // Очистка холста
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Отрисовка шаров
            balls.forEach(ball => {
                context.beginPath();
                context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                context.fillStyle = ball.color;
                context.fill();
                context.closePath();
            });
        }
    }, [balls]);

    // // Обработчик движения мыши
    // const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    //     if (draggingBallId !== null) {
    //         const canvas = canvasRef.current;
    //         if (!canvas) return;

    //         const rect = canvas.getBoundingClientRect();
    //         const mouseX = event.clientX - rect.left;
    //         const mouseY = event.clientY - rect.top;

    //         // Обновление позиции перетаскиваемого шара
    //         // setBalls(prevBalls => prevBalls.map(ball => {
    //         //     if (ball.id === draggingBallId) {
    //         //         return { ...ball, x: mouseX, y: mouseY };
    //         //     }
    //         //     return ball;
    //         // }));
    //     }
    // };

    // Обработчик нажатия кнопки мыши



    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Проверка, попал ли клик на край шара
        balls.forEach(ball => {
            const dx = ball.x - mouseX;
            const dy = ball.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= ball.radius) {
                // Определение угла и скорости толчка в шар
                const angle = Math.atan2(dy, dx);
                const pushSpeed = 10;
                const newVx = pushSpeed * Math.cos(angle);
                const newVy = pushSpeed * Math.sin(angle);

                // Обновление вектора скорости шара
                setBalls(prevBalls =>
                    prevBalls.map(prevBall =>
                        prevBall.id === ball.id ? { ...prevBall, vx: newVx, vy: newVy } : prevBall
                    )
                );
            }
        });
    };

    // // Обработчик отпускания кнопки мыши
    // const handleMouseUp = () => {
    //     setDraggingBallId(null);
    // };


    // Отталкивание от стенок
    useEffect(() => {
        let animationId: number;

        const hide = (ball: Ball, xy: string): Ball => {
            let newX = ball.x + ball.vx;
            let newY = ball.y + ball.vy;

            if (xy === 'x') {
                newX = ball.x + ball.vx;

                if (newX + ball.radius >= canvasWidth) {
                    ball.x--
                    hide(ball, 'x')
                }

                if (newX - ball.radius <= 1) {
                    ball.x++
                    hide(ball, 'x')
                }
            }

            if (xy === 'y') {
                newY = ball.y + ball.vy;

                if (newY + ball.radius >= canvasHeight) {
                    ball.y--
                    hide(ball, 'y')
                }

                if (newY - ball.radius <= 1) {
                    ball.y++
                    hide(ball, 'y')
                }
            }

            return ball;
        }

        const update = () => {
            // Обновление позиции шаров с учетом их скоростей и отталкивания от границ
            setBalls(prevBalls =>
                prevBalls.map(ball => {
                    // Позиция шара после обновления скорости
                    let newX = ball.x + ball.vx;
                    let newY = ball.y + ball.vy;

                    // Проверка столкновения со стенками
                    if (newX - ball.radius <= 1 || newX + ball.radius >= canvasWidth - 1) {
                        // Если столкновение с левой или правой стенкой, меняем направление по X
                        ball.vx = -ball.vx * 0.5; // Изменяем направление скорости на противоположное
                        // newX = ball.x + ball.vx; // Обновляем новую позицию по X
                        ball = hide(ball, 'x')
                    }

                    if (newY - ball.radius <= 1 || newY + ball.radius >= canvasHeight - 1) {
                        // Если столкновение с верхней или нижней стенкой, меняем направление по Y
                        ball.vy = -ball.vy * 0.5; // Изменяем направление скорости на противоположное
                        // newY = ball.y + ball.vy; // Обновляем новую позицию по Y
                        ball = hide(ball, 'y')

                    }

                    // // Проверка столкновения со стенками
                    // if (ball.radius + ball.x <= 0 || ball.radius + ball.x >= canvasWidth) {
                    //     console.log('x err', ball.vx)
                    //     // console.log('x err')
                    // }

                    // if (ball.radius + ball.y <= 0 || ball.radius + ball.y >= canvasHeight) {
                    //     console.log('y err', ball.vy)
                    //     // console.log('y err', )
                    // }



                    // Обновляем позицию шара с учетом отталкивания от границ
                    return { ...ball, x: newX, y: newY };
                })
            );

            // Запуск следующего кадра анимации
            animationId = requestAnimationFrame(update);
        };

        // Запуск анимации
        animationId = requestAnimationFrame(update);

        // Остановка анимации при размонтировании компонента
        return () => cancelAnimationFrame(animationId);
    }, [balls, canvasRef]);



    // Эффект для анимации движения шаров
    useEffect(() => {
        let animationId: number;

        const update = () => {
            // Обновление позиции шаров с учетом их скоростей
            setBalls(prevBalls =>
                prevBalls.map(ball => ({
                    ...ball,
                    x: ball.x + ball.vx,
                    y: ball.y + ball.vy,
                    vx: ball.vx * 0.95, // замедление
                    vy: ball.vy * 0.95
                }))
            );

            // Запуск следующего кадра анимации
            animationId = requestAnimationFrame(update);
        };

        // Запуск анимации
        animationId = requestAnimationFrame(update);

        // Остановка анимации при размонтировании компонента
        return () => cancelAnimationFrame(animationId);
    }, [balls]);



    // Возвращаем JSX-разметку компонента Canvas
    return (
        <canvas style={{
            margin: '20px',
            border: 'solid 2px'
        }}
            ref={canvasRef}
            width={800}
            height={600}
            onMouseDown={handleMouseDown}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        />
    );
};

export default Canvas;
