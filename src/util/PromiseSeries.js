module.exports.allSettled = allSettled;
module.exports.chunks = chunks;
module.exports.series = series;

function allSettled(iterable) {
  return new Promise((resolve) => {
      function addElementToResult(i, elem) {
          result[i] = elem;
          elementCount++;
          if (elementCount === result.length) {
              resolve(result);
          }
      }

      let index = 0;
      for (const promise of iterable) {
          // Capture the current value of `index`
          const currentIndex = index;
          promise.then(
              (value) => addElementToResult(
                  currentIndex, {
                  status: 'fulfilled',
                  value
              }),
              (reason) => addElementToResult(
                  currentIndex, {
                  status: 'rejected',
                  reason
              }));
          index++;
      }
      if (index === 0) {
          resolve([]);
          return;
      }
      let elementCount = 0;
      const result = new Array(index);
  });
}
function all(items, fn) {
  const promises = items.map(item => fn(item));
  const a=  allSettled(promises);
  return a;
}
function series(items, fn) {
  let result = [];
  return items.reduce((acc, item) => {
      acc = acc.then(() => {
          return fn(item).then(res => result.push(res));
      });
      return acc;
  }, Promise.resolve())
      .then(() => result);
}

function splitToChunks(items, chunkSize = 50) {
  const result = [];
  for (let i = 0; i < items.length; i += chunkSize) {
      result.push(items.slice(i, i + chunkSize));
  }
  return result;
}

function chunks(items, fn, chunkSize = 50) {
  let result = [];
  const chunks = splitToChunks(items, chunkSize);
  return series(chunks, chunk => {
      return all(chunk, fn)
          .then(res => result = result.concat(res))
  })
  .then(() => result);
}