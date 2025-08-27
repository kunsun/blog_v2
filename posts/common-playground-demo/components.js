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

// Vue 3 组件示例
export function VueDemo() {
  return (
    <Playground
      template="vue"
      theme="dark"
      files={{
        "/src/App.vue": `<template>
  <div class="app">
    <h2>Vue 3 组件演示</h2>
    <div class="todo-container">
      <div class="input-section">
        <input 
          v-model="newTodo" 
          @keyup.enter="addTodo"
          placeholder="输入待办事项..."
          class="todo-input"
        />
        <button @click="addTodo" class="add-btn">添加</button>
      </div>
      
      <ul class="todo-list">
        <li 
          v-for="(todo, index) in todos" 
          :key="index"
          class="todo-item"
          :class="{ completed: todo.completed }"
        >
          <span @click="toggleTodo(index)">{{ todo.text }}</span>
          <button @click="removeTodo(index)" class="delete-btn">删除</button>
        </li>
      </ul>
      
      <div class="stats">
        <p>总计: {{ todos.length }} | 已完成: {{ completedCount }} | 未完成: {{ activeCount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const newTodo = ref('')
    const todos = ref([
      { text: '学习 Vue 3', completed: false },
      { text: '使用 Sandpack', completed: true }
    ])

    const completedCount = computed(() => 
      todos.value.filter(todo => todo.completed).length
    )
    
    const activeCount = computed(() => 
      todos.value.filter(todo => !todo.completed).length
    )

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({
          text: newTodo.value,
          completed: false
        })
        newTodo.value = ''
      }
    }

    const removeTodo = (index) => {
      todos.value.splice(index, 1)
    }

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed
    }

    return {
      newTodo,
      todos,
      completedCount,
      activeCount,
      addTodo,
      removeTodo,
      toggleTodo
    }
  }
}
</script>

<style scoped>
.app {
  padding: 20px;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  min-height: 400px;
}

.todo-container {
  max-width: 400px;
  margin: 0 auto;
}

.input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}

.add-btn {
  padding: 10px 20px;
  background: #00b894;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  cursor: pointer;
}

.todo-item.completed {
  opacity: 0.6;
  text-decoration: line-through;
}

.delete-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.stats {
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}
</style>`,
      }}
      editorHeight={400}
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
