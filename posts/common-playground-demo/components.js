"use client";

import { Playground } from "@/components/Playground";
import { Sandpack } from "@codesandbox/sandpack-react";

export function ReactDemo() {
  return <Sandpack template="react" />;
}

// React Hook 示例
export function ReactHookDemo() {
  return (
    <Playground
      template="react"
      theme="dark"
      files={{
        "/App.js": `
import './index.css';
export default function App() {
console.log('haha');
  return <h1>Good day!</h1>;
}
`,
        "/index.css": `
h1 {
  color: tomato;
}
`,
      }}
      editorHeight={350}
    />
  );
}

// 带外部依赖的示例
export function WithDependenciesDemo() {
  return (
    <Playground
      template="react"
      theme="dark"
      dependencies={{
        "react-icons": "latest",
        "date-fns": "latest",
      }}
      files={{
        "/App.js": `import { useState } from 'react';
import { FaClock, FaCalendar, FaUser, FaHeart } from 'react-icons/fa';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';

export default function App() {
  const [currentDate] = useState(new Date());
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);

  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div style={{
      padding: '30px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif',
      minHeight: '350px'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        📦 外部依赖演示
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {/* 时间卡片 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <FaClock size={30} style={{ marginBottom: '10px' }} />
          <h4>当前时间</h4>
          <p>{format(currentDate, 'yyyy-MM-dd HH:mm:ss')}</p>
        </div>

        {/* 日历卡片 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <FaCalendar size={30} style={{ marginBottom: '10px' }} />
          <h4>本周范围</h4>
          <p>{format(weekStart, 'MM/dd')} - {format(weekEnd, 'MM/dd')}</p>
        </div>

        {/* 用户卡片 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <FaUser size={30} style={{ marginBottom: '10px' }} />
          <h4>用户信息</h4>
          <p>开发者</p>
        </div>

        {/* 点赞卡片 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <button
            onClick={handleLike}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '10px'
            }}
          >
            <FaHeart 
              size={30} 
              color={isLiked ? '#ff6b6b' : '#ffffff'}
              style={{ marginBottom: '10px' }}
            />
          </button>
          <h4>点赞</h4>
          <p>{likes} 个赞</p>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '30px',
        padding: '15px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px'
      }}>
        <p><strong>使用的外部库:</strong></p>
        <p>🎨 react-icons - 图标库</p>
        <p>📅 date-fns - 日期处理库</p>
      </div>
    </div>
  );
}`,
      }}
      editorHeight={450}
      showFileExplorer={false}
    />
  );
}
