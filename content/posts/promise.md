---
path: "/promise"
title: "Promise"
date: "2021-02-02"
tags:
  - Promise
  - ES6
---

Promise 构造函数返回一个 promise 对象实例，这个返回的 promise 具有 then 方法。then 方法中，调用者可以定义两个参数，分别是 onfulfilled 和 onrejected，他们都是函数类型。
其中 onfulfilled 通过参数可以获取 promise 对象的 resolved 的值；onrejected 获得 promise 对象 rejected 的值。通过这个值，我们来处理异步完成后的逻辑。
通过这个值，处理异步完成后的逻辑。

## 第一步

建立结构

```javascript
function Promise(executor) {}
Promise.prototype.then = function (onfulfilled, onrejected) {}
```

## 第二步

完善基本框架

```js
function Promise(executor) {
  const self = this
  this.status = "pending"
  this.value = null
  this.reason = null

  function resolve(value) {
    self.value = value
  }

  function reject(value) {
    self.reason = reason
  }

  executor(resolve, reject)
}

Promise.prototype.then = function (
  onfulfilled = Function.prototype,
  onrejected = Function.prototype
) {
  onfulfilled(this.value)
  onrejected(this.reason)
}
```

## 第三步

加入异步逻辑：在合适的时候再执行 resolve

```js
function Promise(executor) {
  this.status = "pending"
  this.value = null
  this.reason = null
  this.onFulfilledFunc = Function.prototype
  this.onRejectedFunc = Function.prototype

  // 自己的resolve函数，由调用者触发
  const resolve = (value) => {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(() => {
      if (this.status === "pending") {
        this.value = value
        this.status = "fulfilled"
        this.onFulfilledFunc(this.value)
      }
    })
  }
  // 自己的reject函数，由调用者触发
  const reject = (reason) => {
    setTimeout(() => {
      if (this.status === "pending") {
        this.reason = reason
        this.status = "rejected"
        this.onRejectedFunc(this.reason)
      }
    })
  }
  // 调用时执行，参数是自己定义的reject与resolve
  // 立即执行
  executor(resolve, reject)
}

Promise.prototype.then = function (onfulfilled, onreject) {
  onfulfilled = typeof onfulfilled === "function" ? onfulfilled : (data) => data
  onrejected =
    typeof onrejected === "function"
      ? onrejected
      : (error) => {
          throw error
        }

  if (this.status === "fulfilled") {
    onfulfilled(this.value)
  }

  if (this.status === "rejected") {
    onrejected(this.value)
  }

  if (this.status === "pending") {
    this.onFulfilledFunc = onfulfilled
    this.onRejectedFunc = onrejected
  }
}

// 调用Promise，executor
let promise = new Promise((resolve, reject) => {
  resolve("data")
  setTimeout(() => {
    resolve("data")
  }, 2000)
})

promise.then((data) => {
  console.log(data)
})
console.log(1)
```

## 第四步：加入任务队列逻辑

使用 setTimeout 模拟

## 第五步：细节优化

1. 抛出错误
2. 将 onFulfilledFunc 存入数组

```javascript
function Promise(executor) {
  this.status = "pending"
  this.value = null
  this.reason = null
  this.onRejectedArr = []
  this.onFulfilledArr = []

  const resolve = (value) => {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(() => {
      if (this.status === "pending") {
        this.value = value
        this.status = "fulfilled"
        this.onFulfilledArr.forEach((func) => {
          func(value)
        })
      }
    })
  }

  const reject = (reason) => {
    setTimeout(() => {
      if (this.status === "pending") {
        this.reason = reason
        this.status = "rejected"
        this.onRejectedArr.forEach((func) => {
          func(reason)
        })
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function (onfulfilled, onrejected) {
  onfulfilled = typeof onfulfilled === "function" ? onfulfilled : (data) => data
  onrejected =
    typeof onrejected === "function"
      ? onrejected
      : (error) => {
          throw error
        }
  if (this.status === "fulfilled") {
    onfulfilled(this.value)
  }

  if (this.status === "rejected") {
    onrejected(this.value)
  }
  if (this.status === "pending") {
    this.onFulfilledArr.push(onfulfilled)
    this.onRejectedArr.push(onrejected)
  }
}
```

## 第六步：链式调用

一个 Promise 实例的 then 方法体 onfulfilled 函数和 onrejected 函数中，是支持再次返回一个 Promise 实例的，也支持返回非 Promise 的普通值。
修改 Promise.prototype.then:

```js
Promise.prototype.then = function (onfulfilled, onrejected) {
  onfulfilled = typeof onfulfilled === "function" ? onfulfilled : (data) => data
  onrejected =
    typeof onrejected === "function"
      ? onrejected
      : (error) => {
          throw error
        }
  let promise2
  if (this.status === "fulfilled") {
    return (promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let result = onfulfilled(this.value)
          resolve(result)
        } catch (e) {
          reject(e)
        }
      })
    }))
  }
  if (this.status === "rejected") {
    return (promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let result = onrejected(this.reason)
          reject(result)
        } catch (e) {
          reject(e)
        }
      })
    }))
  }
  if (this.status === "pending") {
    return (promise2 = new Promise((resolve, reject) => {
      this.onFulfilledArray.push(() => {
        setTimeout(() => {
          try {
            let result = onfulfilled(this.value)
            resolve(result)
          } catch (e) {
            reject(e)
          }
        })
      })
      this.onRejectedArr.push(() => {
        setTimeout(() => {
          try {
            let result = onrejected(this.reason)
            resolve(result)
          } catch (e) {
            reject(e)
          }
        })
      })
    }))
  }
}
```

## 第七步：完善链式调用

这里的逻辑有些复杂

## 第八步：Promise 穿透实现

如果 then 传入的 onfulfilled 与 onrejected 不为函数，则使用默认值

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("kunsun")
  }, 2000)
})
promise.then(null).then((data) => {
  console.log(data)
})
```

## 第九步：Promise 静态方法与其他方法实现

### Promise.prototype.catch

```js
Promise.prototype.catch = function (catchFunc) {
  return this.then(null, catchFunc)
}
```

### Promise.resolve

```js
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}
```

### Promise.reject

```js
Promise.reject = function (value) {
  return new Promise((resolve, reject) => {
    reject(value)
  })
}
```

### Promise.all

> Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都完成时才 resolve。如果参数中 promise 有一个失败（rejected）,此实例失败，失败原因是第一个失败 promise 的结果。

```javascript
Promise.all = function (promiseArr) {
  if (!Array.isArray(promiseArr)) {
    throw new Error("参数不是数组")
  }
  return new Promise((resolve, reject) => {
    try {
      let resolveArr = []
      const length = promiseArr.length
      for (let i = 0; i < length; i++) {
        promiseArr[i].then((data) => {
          resolveArr.push(data)
          if (resolveArr.length === length) {
            resolve(resolveArr)
          }
        }, reject)
      }
    } catch (e) {
      reject(e)
    }
  })
}
```

### Promise.race

> 当 iterable 参数里任何一个成功或失败，直接返回

```js
Promise.race = function (promiseArr) {
  if (!Array.isArray(promiseArr)) {
    throw new Error("参数不是数组")
  }
  return new Promise((resolve, reject) => {
    try {
      const length = primiseArr.length
      for (let i = 0; i < length; i++) {
        promiseArray[i].then(resolve, reject)
      }
    } catch (e) {
      reject(e)
    }
  })
}
```

## 最终代码

```javascript
function Promise(executor) {
  this.status = "pending"
  this.value = null
  this.reason = null
  this.onFulfilledArray = []
  this.onRejectedArray = []

  const resolve = (value) => {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(() => {
      if (this.status === "pending") {
        this.value = value
        this.status = "fulfilled"

        this.onFulfilledArray.forEach((func) => {
          func(value)
        })
      }
    })
  }

  const reject = (reason) => {
    setTimeout(() => {
      if (this.status === "pending") {
        this.reason = reason
        this.status = "rejected"

        this.onRejectedArray.forEach((func) => {
          func(reason)
        })
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

const resolvePromise = (promise2, result, resolve, reject) => {
  // 当 result 和 promise2 相等时，也就是说 onfulfilled 返回 promise2 时，进行 reject
  if (result === promise2) {
    return reject(new TypeError("error due to circular reference"))
  }

  // 是否已经执行过 onfulfilled 或者 onrejected
  let consumed = false
  let thenable

  if (result instanceof Promise) {
    if (result.status === "pending") {
      result.then(function (data) {
        resolvePromise(promise2, data, resolve, reject)
      }, reject)
    } else {
      result.then(resolve, reject)
    }
    return
  }

  let isComplexResult = (target) =>
    (typeof target === "function" || typeof target === "object") &&
    target !== null
  // 如果返回的是疑似 Promise 类型
  if (isComplexResult(result)) {
    try {
      thenable = result.then
      // 如果返回的是 Promise 类型，具有 then 方法
      if (typeof thenable === "function") {
        thenable.call(
          result,
          function (data) {
            if (consumed) {
              return
            }
            consumed = true

            return resolvePromise(promise2, data, resolve, reject)
          },
          function (error) {
            if (consumed) {
              return
            }
            consumed = true

            return reject(error)
          }
        )
      } else {
        return resolve(result)
      }
    } catch (e) {
      if (consumed) {
        return
      }
      consumed = true
      return reject(e)
    }
  } else {
    return resolve(result)
  }
}

Promise.prototype.then = function (onfulfilled, onrejected) {
  onfulfilled = typeof onfulfilled === "function" ? onfulfilled : (data) => data
  onrejected =
    typeof onrejected === "function"
      ? onrejected
      : (error) => {
          throw error
        }

  // promise2 将作为 then 方法的返回值
  let promise2

  if (this.status === "fulfilled") {
    return (promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // 这个新的 promise2 resolved 的值为 onfulfilled 的执行结果
          let result = onfulfilled(this.value)
          resolvePromise(promise2, result, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }))
  }
  if (this.status === "rejected") {
    return (promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // 这个新的 promise2 reject 的值为 onrejected 的执行结果
          let result = onrejected(this.reason)
          resolvePromise(promise2, result, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }))
  }
  if (this.status === "pending") {
    return (promise2 = new Promise((resolve, reject) => {
      this.onFulfilledArray.push((value) => {
        try {
          let result = onfulfilled(value)
          resolvePromise(promise2, result, resolve, reject)
        } catch (e) {
          return reject(e)
        }
      })

      this.onRejectedArray.push((reason) => {
        try {
          let result = onrejected(reason)
          resolvePromise(promise2, result, resolve, reject)
        } catch (e) {
          return reject(e)
        }
      })
    }))
  }
}

Promise.prototype.catch = function (catchFunc) {
  return this.then(null, catchFunc)
}

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}

Promise.reject = function (value) {
  return new Promise((resolve, reject) => {
    reject(value)
  })
}

Promise.race = function (promiseArray) {
  if (!Array.isArray(promiseArray)) {
    throw new TypeError("The arguments should be an array!")
  }
  return new Promise((resolve, reject) => {
    try {
      const length = promiseArray.length
      for (let i = 0; i < length; i++) {
        promiseArray[i].then(resolve, reject)
      }
    } catch (e) {
      reject(e)
    }
  })
}

Promise.all = function (promiseArray) {
  if (!Array.isArray(promiseArray)) {
    throw new TypeError("The arguments should be an array!")
  }
  return new Promise((resolve, reject) => {
    try {
      let resultArray = []

      const length = promiseArray.length

      for (let i = 0; i < length; i++) {
        promiseArray[i].then((data) => {
          resultArray.push(data)

          if (resultArray.length === length) {
            resolve(resultArray)
          }
        }, reject)
      }
    } catch (e) {
      reject(e)
    }
  })
}
```

## 总结

1. Promise 可以保持某个 pending 一段时间
2. Promise 需要处理错误
3. Promise 实例添加多个 then
4. 链式调用
5. Promise 穿透
6. 静态方法
