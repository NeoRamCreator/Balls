
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

  const [menu, setMenu] = useState(false);
  const [changeBall, setChangeBall] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null); // Ссылка на элемент холста

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



  //  Отталкивание от стенок
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
            ball.vx = -ball.vx; // Изменяем направление скорости на противоположное
            // newX = ball.x + ball.vx; // Обновляем новую позицию по X
            ball = hide(ball, 'x')
          }

          if (newY - ball.radius <= 1 || newY + ball.radius >= canvasHeight - 1) {
            // Если столкновение с верхней или нижней стенкой, меняем направление по Y
            ball.vy = -ball.vy; // Изменяем направление скорости на противоположное
            // newY = ball.y + ball.vy; // Обновляем новую позицию по Y
            ball = hide(ball, 'y')

          }


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
        prevBalls.map(ball => {
          return {
            ...ball,
            x: ball.x + ball.vx,
            y: ball.y + ball.vy,
            vx: ball.vx * 0.95, // замедление
            vy: ball.vy * 0.95
          };
        })
      );

      // Запуск следующего кадра анимации
      animationId = requestAnimationFrame(update);
    };

    // Запуск анимации
    animationId = requestAnimationFrame(update);

    // Остановка анимации при размонтировании компонента
    return () => cancelAnimationFrame(animationId);
  }, [balls]);



  const handleBallCollisions = () => {

    balls.forEach((ball1, index1) => {
      balls.forEach((ball2, index2) => {
        if (index1 !== index2) {

          const dx = (ball2.x + ball2.vx) - (ball1.x + ball1.vx);
          const dy = (ball2.y + ball2.vy) - (ball1.y + ball1.vy);

          const distance = Math.sqrt(dx * dx + dy * dy);

          // Проверяем столкновение шаров
          if (distance <= ball1.radius + ball2.radius) {

            const result = (ball1.radius + ball2.radius) - distance;

            // Вычисляем угол столкновения
            const angle = Math.atan2(dy, dx);

            const dxMove = (result / 2) * Math.cos(angle); // Изменение координат по оси X
            const dyMove = (result / 2) * Math.sin(angle); // Изменение координат по оси Y

            // Обновление координат шаров
            ball1.x -= dxMove;
            ball1.y -= dyMove;
            ball2.x += dxMove;
            ball2.y += dyMove;

            // Вычисляем новые скорости для обоих шаров
            const v1 = Math.sqrt(ball1.vx * ball1.vx + ball1.vy * ball1.vy);
            const v2 = Math.sqrt(ball2.vx * ball2.vx + ball2.vy * ball2.vy);

            const theta1 = Math.atan2(ball1.vx, ball1.vy);
            const theta2 = Math.atan2(ball2.vx, ball2.vy);

            // Рассчитываем новые скорости для обоих шаров
            const newVx1 =
              v2 * Math.cos(theta2 - angle) * Math.cos(angle)
              +
              v1 * Math.sin(theta1 - angle) * Math.cos(angle + Math.PI / 2);

            const newVy1 =
              v2 * Math.cos(theta2 - angle) * Math.sin(angle)
              +
              v1 * Math.sin(theta1 - angle) * Math.sin(angle + Math.PI / 2);

            const newVx2 =
              v1 * Math.cos(theta1 - angle) * Math.cos(angle)
              +
              v2 * Math.sin(theta2 - angle) * Math.cos(angle + Math.PI / 2);

            const newVy2 =
              v1 * Math.cos(theta1 - angle) * Math.sin(angle)
              +
              v2 * Math.sin(theta2 - angle) * Math.sin(angle + Math.PI / 2);


            setBalls(prevBalls => prevBalls.map((ball, index) => {
              if (index === index2) {
                return {
                  ...ball,
                  vx: newVx2 * 0.8,
                  vy: newVy2 * 0.8,

                  x: ball.x + newVx2,
                  y: ball.y + newVy2
                };
              }
              if (index === index1) {
                return {
                  ...ball,
                  vx: newVx1 * 0.8,
                  vy: newVy1 * 0.8,

                  x: ball.x + newVx1,
                  y: ball.y + newVy1
                };
              }
              return ball;
            }));


          }
        }
      });
    });
  };

  useEffect(() => {
    let animationId: number;
    const update = () => {
      handleBallCollisions(); // Обработка столкновений шаров
      animationId = requestAnimationFrame(update);
    };

    animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, [balls, setBalls]);



  const getXY = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    balls.forEach((ball, index) => {
      const dx = ball.x - mouseX;
      const dy = ball.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= ball.radius) {
        setChangeBall(index);
        setMenu(true);
      }
    });
  }



  const changeColor = (newColor: string) => {
    // Проверяем, есть ли выбранный шар
    if (changeBall !== null) {
      setBalls(prevBalls => {
        // Создаем новый массив шаров, меняя цвет выбранного шара
        return prevBalls.map((ball, index) => {
          if (index === changeBall) {
            return { ...ball, color: newColor };
          }
          return ball;
        });
      });
    }
    setMenu(false); // Скрываем меню
  };

  const colors = [
    { color: '#8B0000' },
    { color: '#FFD700' },
    { color: '#00FF00' },
    { color: '#000080' },
    { color: '#FF00FF' },
    { color: '#000000' },
  ]

  // Возвращаем JSX-разметку компонента Canvas
  return (
    <><p style={{
      margin: '10px 0 0 20px',
    }}>
      левый клик - толкнет шар, Правый клик - откроет выбер цветов
    </p>
      <canvas style={{
        margin: '20px',
        border: 'solid 2px'
      }}
        ref={canvasRef}
        width={800}
        height={600}
        onClick={handleMouseDown}
        onContextMenu={(e) => {
          e.preventDefault();
          getXY(e);
        }}

      />
      {menu && (
        <div style={{ display: 'flex', }}>
          {colors.map((color, index) => (
            <div
              onClick={(e) => changeColor(color.color)}
              key={index}
              style={{ background: color.color, width: 30, height: 30, margin: '5px' }}
            ></div>
          ))}
        </div>
      )}

    </>
  );
};

export default Canvas;


