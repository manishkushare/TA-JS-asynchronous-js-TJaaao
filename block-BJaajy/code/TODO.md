- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.
```js
Promise.all([
  new Promise((resolve,reject)=> setTimeout(()=> resolve("a"),1000)),
  new Promise((resolve,reject)=> setTimeout(()=> resolve("b"),2000)),
  new Promise((resolve,reject)=> setTimeout(()=> resolve("c"),3000)),
  new Promise((resolve,reject)=> setTimeout(()=> resolve("d"),4000)),

]).then(console.log);
```
- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.
```js
let username = ["adityaP0","manishkushare","prank7","nnnkit"]
let userData = Promise.all(username.map(user => {
   return fetch(`https://api.github.com/users/${user}`)
  .then(response => response.json())
}))
.then(console.log)
```
- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow
```js
Promise.race([
  fetch(`https://random.dog/woof.json`).then(res => res.json()).then(console.log),
  fetch(`https://aws.random.cat/meow`).then(res => res.json()),
]).then(console.log)
```
- Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

let b = Promise.all([one,two,three]);
```

- What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);
```
