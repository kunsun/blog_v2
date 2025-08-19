"use client";

import { useState } from "react";
import { create } from "zustand";

// 1) 基础计数器
const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export function SimpleCounter() {
  const { count, increment, decrement, reset } = useCounterStore();
  return (
    <div className="border border-gray-300 rounded-lg p-6 my-4 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        计数器: {count}
      </h3>
      <div className="flex gap-2">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          -1
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          重置
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          +1
        </button>
      </div>
    </div>
  );
}

// 2) 购物车
const useCartStore = create((set, get) => ({
  items: [], // { id, name, price, quantity }
  addItem: (item) => {
    const exists = get().items.find((i) => i.id === item.id);
    if (exists) {
      set({
        items: get().items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...get().items, { ...item, quantity: 1 }] });
    }
  },
  removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
  increase: (id) =>
    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    }),
  decrease: (id) =>
    set({
      items: get()
        .items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0),
    }),
  clear: () => set({ items: [] }),
}));

export function ShoppingCart() {
  const { items, addItem, removeItem, increase, decrease, clear } =
    useCartStore();

  const catalog = [
    { id: "apple", name: "苹果", price: 3.5 },
    { id: "banana", name: "香蕉", price: 2.2 },
    { id: "orange", name: "橙子", price: 4.1 },
  ];

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="border border-gray-300 rounded-lg p-6 my-4 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        购物车
      </h3>

      <div className="mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          商品列表
        </div>
        <div className="flex gap-2 flex-wrap">
          {catalog.map((p) => (
            <button
              key={p.id}
              onClick={() => addItem(p)}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              加入 {p.name}（¥{p.price}）
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        {items.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">购物车为空</div>
        ) : (
          <div className="space-y-3">
            {items.map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between gap-2 bg-gray-50 dark:bg-gray-700/40 p-3 rounded"
              >
                <div className="text-gray-800 dark:text-gray-200">
                  {i.name} × {i.quantity}
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    单价 ¥{i.price}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrease(i.id)}
                    className="px-2 py-1 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={() => increase(i.id)}
                    className="px-2 py-1 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(i.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-2">
              <div className="text-gray-800 dark:text-gray-200 font-semibold">
                合计：¥{total.toFixed(2)}
              </div>
              <button
                onClick={clear}
                className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                清空购物车
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 3) 主题管理（示例内管理，不依赖 next-themes）
const useThemeStore = create((set) => ({
  theme: "light",
  setTheme: (t) => set({ theme: t }),
  toggle: () => set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
}));

export function ThemeManager() {
  const { theme, toggle, setTheme } = useThemeStore();

  return (
    <div className="border border-gray-300 rounded-lg p-6 my-4 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        主题管理器
      </h3>
      <div className="mb-4 text-gray-700 dark:text-gray-300">
        当前主题：{theme}
      </div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={toggle}
          className="px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
        >
          切换主题
        </button>
        <button
          onClick={() => setTheme("light")}
          className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
        >
          浅色
        </button>
        <button
          onClick={() => setTheme("dark")}
          className="px-3 py-2 bg-gray-900 text-white rounded"
        >
          深色
        </button>
      </div>
      <div
        className={
          "rounded p-4 border " +
          (theme === "light"
            ? "bg-white border-gray-300 text-gray-800"
            : "bg-gray-900 border-gray-700 text-gray-100")
        }
      >
        示例区域：根据主题变换样式
      </div>
    </div>
  );
}

// 4) 聊天室
const useChatStore = create((set) => ({
  messages: [], // { id, user, text, time }
  send: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  clear: () => set({ messages: [] }),
}));

export function ChatRoom() {
  const { messages, send, clear } = useChatStore();
  const [name, setName] = useState("Alice");
  const [text, setText] = useState("");

  const onSend = () => {
    const content = text.trim();
    if (!content) return;
    send({
      id: Date.now(),
      user: name || "匿名",
      text: content,
      time: new Date().toLocaleTimeString(),
    });
    setText("");
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 my-4 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        实时聊天室
      </h3>
      <div className="flex gap-2 mb-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="昵称"
          className="px-3 py-2 border rounded w-40 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入消息..."
          className="px-3 py-2 border rounded flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={onSend}
          className="px-3 py-2 bg-blue-500 text-white rounded"
        >
          发送
        </button>
        <button
          onClick={clear}
          className="px-3 py-2 bg-gray-500 text-white rounded"
        >
          清屏
        </button>
      </div>
      <div className="space-y-2 max-h-60 overflow-auto">
        {messages.map((m) => (
          <div key={m.id} className="flex items-start gap-2">
            <span className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
              {m.user}
            </span>
            <span className="text-gray-800 dark:text-gray-200">{m.text}</span>
            <span className="ml-auto text-xs text-gray-500">{m.time}</span>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-gray-500 dark:text-gray-400">
            暂无消息，来说点什么吧～
          </div>
        )}
      </div>
    </div>
  );
}

// 5) 待办事项
const useTodoStore = create((set) => ({
  todos: [], // { id, text, done }
  add: (text) =>
    set((s) => ({
      todos: [...s.todos, { id: Date.now(), text, done: false }],
    })),
  toggle: (id) =>
    set((s) => ({
      todos: s.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    })),
  remove: (id) => set((s) => ({ todos: s.todos.filter((t) => t.id !== id) })),
  clearDone: () => set((s) => ({ todos: s.todos.filter((t) => !t.done) })),
}));

export function TodoManager() {
  const { todos, add, toggle, remove, clearDone } = useTodoStore();
  const [text, setText] = useState("");

  const onAdd = () => {
    const t = text.trim();
    if (!t) return;
    add(t);
    setText("");
  };

  const stats = {
    total: todos.length,
    done: todos.filter((t) => t.done).length,
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 my-4 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        待办事项
      </h3>
      <div className="flex gap-2 mb-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新增待办..."
          className="px-3 py-2 border rounded flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={onAdd}
          className="px-3 py-2 bg-blue-500 text-white rounded"
        >
          添加
        </button>
        <button
          onClick={clearDone}
          className="px-3 py-2 bg-gray-500 text-white rounded"
        >
          清除已完成
        </button>
      </div>
      <div className="space-y-2">
        {todos.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-2 p-2 rounded border dark:border-gray-700"
          >
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggle(t.id)}
            />
            <span
              className={
                t.done
                  ? "line-through text-gray-500"
                  : "text-gray-800 dark:text-gray-200"
              }
            >
              {t.text}
            </span>
            <button
              onClick={() => remove(t.id)}
              className="ml-auto px-2 py-1 bg-red-500 text-white rounded"
            >
              删除
            </button>
          </div>
        ))}
        {todos.length === 0 && (
          <div className="text-gray-500 dark:text-gray-400">
            暂无待办，添加一个吧～
          </div>
        )}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-3">
        共 {stats.total} 项，已完成 {stats.done} 项
      </div>
    </div>
  );
}

// 6) 用户认证（模拟）
const useAuthStore = create((set) => ({
  user: null, // { name }
  login: (name) => set({ user: { name } }),
  logout: () => set({ user: null }),
}));

export function AuthManager() {
  const { user, login, logout } = useAuthStore();
  const [name, setName] = useState("");

  return (
    <div className="border border-gray-300 rounded-lg p-6 my-4 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        用户认证状态
      </h3>
      {user ? (
        <div className="flex items-center gap-3">
          <span className="text-gray-800 dark:text-gray-200">
            已登录：{user.name}
          </span>
          <button
            onClick={logout}
            className="px-3 py-2 bg-red-500 text-white rounded"
          >
            登出
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="用户名"
            className="px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={() => name.trim() && login(name.trim())}
            className="px-3 py-2 bg-green-600 text-white rounded"
          >
            登录
          </button>
        </div>
      )}
    </div>
  );
}
