"use client";
import { useState } from "react";
import { CustomSandpackPlayground } from "../../components/SandpackComponents";

// 基础 Sandpack 演示
export function SandpackDemo() {
  return (
    <CustomSandpackPlayground
      template="react"
      theme="dark"
      files={{
        "/App.js": `export default function App() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '50px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '3em', marginBottom: '20px' }}>
        Hello World! 👋
      </h1>
      <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>
        欢迎来到 Sandpack 代码演示！
      </p>
      <button 
        onClick={() => alert('你好！这是一个可交互的代码示例')}
        style={{
          padding: '12px 24px',
          fontSize: '1.1em',
          border: 'none',
          borderRadius: '25px',
          background: '#ff6b6b',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}
      >
        点击我！
      </button>
    </div>
  );
}`,
      }}
      editorHeight={300}
      showFileExplorer={false}
    />
  );
}

// 带依赖的组件示例
export function SandpackWithDependencies() {
  return (
    <CustomSandpackPlayground
      template="react"
      theme="dark"
      files={{
        "/App.js": `import { format } from 'date-fns';
import { useState } from 'react';

export default function App() {
  const [date, setDate] = useState(new Date());
  
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '40px',
      background: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      minHeight: '100vh',
      color: '#333'
    }}>
      <h2>📅 日期格式化示例</h2>
      <p>使用 date-fns 库格式化日期</p>
      
      <div style={{ margin: '20px 0' }}>
        <p><strong>当前时间：</strong></p>
        <p style={{ fontSize: '1.5em', color: '#e74c3c' }}>
          {format(date, 'yyyy年MM月dd日 HH:mm:ss')}
        </p>
      </div>
      
      <button 
        onClick={() => setDate(new Date())}
        style={{
          padding: '10px 20px',
          fontSize: '1em',
          border: 'none',
          borderRadius: '20px',
          background: '#3498db',
          color: 'white',
          cursor: 'pointer',
          margin: '5px'
        }}
      >
        刷新时间
      </button>
      
      <div style={{ marginTop: '30px' }}>
        <h3>不同格式：</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>📋 ISO: {format(date, 'yyyy-MM-dd')}</li>
          <li>📅 中文: {format(date, 'yyyy年MM月dd日')}</li>
          <li>⏰ 时间: {format(date, 'HH:mm:ss')}</li>
          <li>🌍 英文: {format(date, 'MMMM do, yyyy')}</li>
        </ul>
      </div>
    </div>
  );
}`,
        "package.json": `{
  "dependencies": {
    "date-fns": "^2.29.3",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}`,
      }}
      editorHeight={350}
      showFileExplorer={true}
    />
  );
}

// 多文件项目示例
export function SandpackMultiFile() {
  return (
    <CustomSandpackPlayground
      template="react"
      theme="dark"
      files={{
        "/App.js": `import UserCard from './components/UserCard';
import './styles.css';

const users = [
  { id: 1, name: '张三', role: '前端工程师', avatar: '👨‍💻' },
  { id: 2, name: '李四', role: '后端工程师', avatar: '👩‍💻' },
  { id: 3, name: '王五', role: 'UI设计师', avatar: '🎨' }
];

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>🏢 团队成员</h1>
        <p>多文件组件示例</p>
      </header>
      
      <main className="user-grid">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </main>
    </div>
  );
}`,
        "/components/UserCard.js": `export default function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="avatar">{user.avatar}</div>
      <h3 className="name">{user.name}</h3>
      <p className="role">{user.role}</p>
      <button 
        className="contact-btn"
        onClick={() => alert(\`联系 \${user.name}\`)}
      >
        联系
      </button>
    </div>
  );
}`,
        "/styles.css": `.app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.user-card {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.3);
}

.avatar {
  font-size: 4em;
  margin-bottom: 15px;
}

.name {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #ffd93d;
}

.role {
  color: #ecf0f1;
  margin-bottom: 20px;
  font-style: italic;
}

.contact-btn {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
}`,
      }}
      editorHeight={400}
      showFileExplorer={true}
    />
  );
}

// 完整的自定义演示（带控制面板）
export function CustomSandpackPlaygroundDemo() {
  return (
    <CustomSandpackPlayground
      template="react"
      theme="dark"
      files={{
        "/App.js": `import { useState } from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Hello World!');
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>{text}</h1>
        <div className="counter-section">
          <p>当前计数: <span className="count">{count}</span></p>
          <div className="button-group">
            <button 
              className="btn btn-minus"
              onClick={() => setCount(count - 1)}
            >
              -
            </button>
            <button 
              className="btn btn-plus"
              onClick={() => setCount(count + 1)}
            >
              +
            </button>
            <button 
              className="btn btn-reset"
              onClick={() => setCount(0)}
            >
              重置
            </button>
          </div>
        </div>
        
        <div className="input-section">
          <label htmlFor="text-input">修改标题:</label>
          <input
            id="text-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入新标题..."
          />
        </div>
        
        <div className="feature-demo">
          <h3>🎨 样式演示</h3>
          <div className="color-boxes">
            {['red', 'blue', 'green', 'purple', 'orange'].map(color => (
              <div 
                key={color}
                className={\`color-box \${color}\`}
                onClick={() => setText(\`Hello \${color.toUpperCase()}!\`)}
              >
                {color}
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}`,
        "/styles.css": `.app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
}

.app-header {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

h1 {
  font-size: 3em;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  to {
    text-shadow: 2px 2px 20px rgba(255, 255, 255, 0.5);
  }
}

.counter-section {
  margin: 30px 0;
}

.count {
  font-size: 2em;
  font-weight: bold;
  color: #ffd93d;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.btn-plus {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
}

.btn-minus {
  background: linear-gradient(45deg, #74b9ff, #0984e3);
  color: white;
}

.btn-reset {
  background: linear-gradient(45deg, #a29bfe, #6c5ce7);
  color: white;
}

.input-section {
  margin: 30px 0;
}

.input-section label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #ffd93d;
}

.input-section input {
  padding: 12px 16px;
  border: none;
  border-radius: 25px;
  font-size: 1em;
  width: 250px;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
}

.input-section input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 217, 61, 0.5);
}

.feature-demo {
  margin-top: 40px;
}

.feature-demo h3 {
  margin-bottom: 20px;
  color: #ffd93d;
}

.color-boxes {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.color-box {
  width: 80px;
  height: 80px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  text-transform: capitalize;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.color-box:hover {
  transform: scale(1.1) rotate(5deg);
}

.red { background: linear-gradient(45deg, #ff6b6b, #ff5252); }
.blue { background: linear-gradient(45deg, #74b9ff, #2196f3); }
.green { background: linear-gradient(45deg, #00b894, #4caf50); }
.purple { background: linear-gradient(45deg, #a29bfe, #9c27b0); }
.orange { background: linear-gradient(45deg, #fd79a8, #ff9800); }`,
      }}
      editorHeight={400}
      showFileExplorer={false}
    />
  );
}
