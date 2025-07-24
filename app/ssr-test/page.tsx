import { headers } from "next/headers";

export default async function SSRTestPage() {
  // 获取服务器时间
  const serverTime = new Date().toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // 获取请求头信息
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "未知";
  const host = headersList.get("host") || "未知";
  const referer = headersList.get("referer") || "无";

  // 模拟服务端数据获取
  const serverData = {
    nodeVersion: process.version,
    platform: process.platform,
    timestamp: Date.now(),
  };

  return (
    <main className="font-mono pb-20 max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 mt-8">SSR 测试页面</h1>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-green-600">
          ✅ 服务端渲染信息
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700">服务器时间:</h3>
            <p className="text-gray-600 bg-white p-2 rounded border">
              {serverTime}
            </p>
            <small className="text-gray-500">
              这个时间是在服务端生成的，每次刷新都会更新
            </small>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">服务端环境信息:</h3>
            <div className="bg-white p-3 rounded border">
              <p>
                <strong>Node.js 版本:</strong> {serverData.nodeVersion}
              </p>
              <p>
                <strong>平台:</strong> {serverData.platform}
              </p>
              <p>
                <strong>时间戳:</strong> {serverData.timestamp}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">请求头信息:</h3>
            <div className="bg-white p-3 rounded border">
              <p>
                <strong>Host:</strong> {host}
              </p>
              <p>
                <strong>User-Agent:</strong> {userAgent.substring(0, 100)}...
              </p>
              <p>
                <strong>Referer:</strong> {referer}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          🔄 客户端渲染对比
        </h2>
        <div id="client-info">
          <p>客户端时间将在页面加载后显示...</p>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-yellow-600">
          📝 SSR 说明
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>服务端渲染 (SSR) 在服务器上生成完整的HTML</li>
          <li>上方的服务器时间在HTML中已经包含，查看页面源代码可以看到</li>
          <li>服务端可以访问请求头、环境变量等客户端无法获取的信息</li>
          <li>每次刷新页面，服务器时间都会更新</li>
          <li>这有利于SEO和首屏加载性能</li>
        </ul>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            // 客户端JavaScript在页面加载后执行
            document.addEventListener('DOMContentLoaded', function() {
              const clientTime = new Date().toLocaleString('zh-CN', {
                timeZone: 'Asia/Shanghai',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              });
              
              document.getElementById('client-info').innerHTML = \`
                <div class="bg-white p-3 rounded border">
                  <p><strong>客户端时间:</strong> \${clientTime}</p>
                  <p><strong>窗口大小:</strong> \${window.innerWidth} x \${window.innerHeight}</p>
                  <p><strong>用户代理:</strong> \${navigator.userAgent.substring(0, 50)}...</p>
                </div>
                <small class="text-gray-500 block mt-2">这些信息是在客户端JavaScript中获取的</small>
              \`;
            });
          `,
        }}
      />
    </main>
  );
}
