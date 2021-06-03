- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.
```js
let seconds = [1,2,3,4]
let a = Promise.all(seconds.map(second => new Promise((res,rej)=>{
  setTimeout(res(Math.random()),second * 1000);
})));
a.then(console.log)
```
- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.
```js
let username = ["adityaP0","manishkushare","prank7","nnnkit"]
let userData = (username.map(user => {
   return fetch(`https://api.github.com/users/${user}`)
  .then(response => response.json())
}))

let userInfo = Promise.all(userData).then(users => {
  return users.map(user => {
    return user.followers ;
  })
});

```
- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow
```js
Promise.race([
  fetch(`https://random.dog/woof.json`).then(res => res.json()),
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

let b = Promise.allSettled([one,two,three]);
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

//["Arya","Sam",{name:"John"}];

```
