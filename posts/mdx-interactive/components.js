"use client";

import { useState, useEffect, useRef } from "react";

// 1. 计数器组件
export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="border border-gray-300 rounded-lg p-6 my-4 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        计数器: {count}
      </h3>
      <div className="flex gap-2">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          -1
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          重置
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          +1
        </button>
      </div>
    </div>
  );
}

// 2. 切换开关
export function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg p-6 my-4 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        开关状态: {isOn ? "开启" : "关闭"}
      </h3>
      <button
        onClick={() => setIsOn(!isOn)}
        className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
          isOn ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
            isOn ? "translate-x-8" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

// 3. 实时图表
export function LiveChart() {
  const [data, setData] = useState([30, 45, 60, 40, 70]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => [...prev.slice(1), Math.floor(Math.random() * 100)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const maxValue = Math.max(...data);

  return (
    <div className="border border-gray-300 rounded-lg p-6 my-4 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        实时数据图表
      </h3>
      <div className="flex items-end gap-2 h-32">
        {data.map((value, index) => (
          <div
            key={index}
            className="bg-blue-500 rounded-t transition-all duration-500 flex-1 min-w-0"
            style={{ height: `${(value / maxValue) * 100}%` }}
            title={`值: ${value}`}
          />
        ))}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        数据每2秒更新一次
      </div>
    </div>
  );
}

// 4. 进度条
export function ProgressBar() {
  const [progress, setProgress] = useState(0);

  return (
    <div className="border border-gray-300 rounded-lg p-6 my-4 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        进度: {progress}%
      </h3>
      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 mb-4">
        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setProgress(Math.max(0, progress - 10))}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          -10%
        </button>
        <button
          onClick={() => setProgress(50)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          50%
        </button>
        <button
          onClick={() => setProgress(Math.min(100, progress + 10))}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          +10%
        </button>
      </div>
    </div>
  );
}

// 5. 实时搜索
export function LiveSearch() {
  const [query, setQuery] = useState("");
  const items = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
  ];

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="border border-gray-300 rounded-lg p-6 my-4 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        搜索水果
      </h3>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="输入搜索内容..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <div className="space-y-2">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
          >
            {item}
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="text-gray-500 dark:text-gray-400 italic">
            没有找到匹配的结果
          </div>
        )}
      </div>
    </div>
  );
}

// 6. 星级评分
export function StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="border border-gray-300 rounded-lg p-6 my-4 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        评分: {rating}/5 星
      </h3>
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="text-3xl transition-colors"
          >
            <span
              className={
                star <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }
            >
              ★
            </span>
          </button>
        ))}
      </div>
      {rating > 0 && (
        <p className="text-gray-600 dark:text-gray-400">
          感谢您的 {rating} 星评分！
        </p>
      )}
    </div>
  );
}

// 7. 粒子动画
export function ParticleAnimation() {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const createParticle = () => ({
      id: Math.random(),
      x: Math.random() * 300,
      y: Math.random() * 200,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
    });

    setParticles(Array.from({ length: 20 }, createParticle));

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.speedX + 300) % 300,
          y: (particle.y + particle.speedY + 200) % 200,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-gray-300 rounded-lg p-6 my-4 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        粒子动画
      </h3>
      <div
        ref={containerRef}
        className="relative w-full h-48 bg-black rounded-lg overflow-hidden"
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-blue-400 rounded-full opacity-80"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              transition: "all 0.05s linear",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// 8. 颜色选择器
export function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const colors = [
    "#EF4444",
    "#F97316",
    "#F59E0B",
    "#EAB308",
    "#84CC16",
    "#22C55E",
    "#10B981",
    "#14B8A6",
    "#06B6D4",
    "#0EA5E9",
    "#3B82F6",
    "#6366F1",
    "#8B5CF6",
    "#A855F7",
    "#D946EF",
    "#EC4899",
  ];

  return (
    <div className="border border-gray-300 rounded-lg p-6 my-4 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        颜色选择器
      </h3>
      <div
        className="w-full h-20 rounded-lg mb-4 border-2 border-gray-300 dark:border-gray-600"
        style={{ backgroundColor: selectedColor }}
      />
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        选中颜色: {selectedColor}
      </p>
      <div className="grid grid-cols-8 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-lg border-2 transition-all ${
              selectedColor === color
                ? "border-gray-800 dark:border-white scale-110"
                : "border-gray-300 dark:border-gray-600"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}

// 9. 猜数字游戏
export function GuessNumber() {
  const [targetNumber, setTargetNumber] = useState(
    () => Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const handleGuess = () => {
    const guessNum = parseInt(guess);
    setAttempts((prev) => prev + 1);

    if (guessNum === targetNumber) {
      setMessage(`🎉 恭喜！你猜对了！用了 ${attempts + 1} 次尝试。`);
      setGameWon(true);
    } else if (guessNum < targetNumber) {
      setMessage("📈 太小了，再试试更大的数字！");
    } else {
      setMessage("📉 太大了，再试试更小的数字！");
    }
  };

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("");
    setAttempts(0);
    setGameWon(false);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 my-4 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        猜数字游戏 (1-100)
      </h3>
      <div className="space-y-4">
        <div>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="输入你的猜测..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            disabled={gameWon}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleGuess}
            disabled={!guess || gameWon}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            猜测
          </button>
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            重新开始
          </button>
        </div>
        {message && (
          <p className="text-gray-700 dark:text-gray-300">{message}</p>
        )}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          尝试次数: {attempts}
        </p>
      </div>
    </div>
  );
}

// 10. 记忆卡片游戏
export function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const symbols = ["🎭", "🎨", "🎪", "🎸", "🎯", "🎲", "🎳", "🎮"];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol }));
    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id))
      return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped;
      const firstCard = cards.find((card) => card.id === first);
      const secondCard = cards.find((card) => card.id === second);

      if (firstCard.symbol === secondCard.symbol) {
        setMatched((prev) => [...prev, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const isGameWon = matched.length === cards.length;

  return (
    <div className="border border-gray-300 rounded-lg p-6 my-4 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        记忆卡片游戏
      </h3>
      <div className="mb-4 flex justify-between items-center">
        <span className="text-gray-600 dark:text-gray-400">
          移动次数: {moves}
        </span>
        <button
          onClick={initializeGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          重新开始
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square text-2xl rounded-lg border-2 transition-all ${
              flipped.includes(card.id) || matched.includes(card.id)
                ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-600"
                : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {flipped.includes(card.id) || matched.includes(card.id)
              ? card.symbol
              : "?"}
          </button>
        ))}
      </div>
      {isGameWon && (
        <p className="text-green-600 dark:text-green-400 font-semibold">
          🎉 恭喜完成！总共用了 {moves} 步！
        </p>
      )}
    </div>
  );
}
