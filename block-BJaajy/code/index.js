function promiseAll(array) {
  //
  console.log(array);

}

// Test:
let times = [1, 2, 3, 4];
let timesPromise = times.map(
  (second) =>
    new Promise((res) => {
      setTimeout(() => res(Math.random()), second * 1000);
    })
);
// console.log("a",timesPromise);
// promiseAll(timesPromise).then(console.log);
