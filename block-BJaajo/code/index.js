function runWhileLoopForNSeconds(sec) {
    let start = Date.now(),
      now = start;
    while (now - start < sec * 1000) {
      now = Date.now();
    }
  }
  console.log('First');
  setTimeout(function exec() {
    console.log('Second');
  }, 0);
  runWhileLoopForNSeconds(3);
  console.log('Third');