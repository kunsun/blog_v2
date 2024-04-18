---
path: "/write-a-promise"
title: '手写一个Promise'
date: '2021-02-14'
tags:
  - ES6
---

```js
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(handle) {
    this._status = PENDING;
    this._value = undefined;
    
  }
}

```

