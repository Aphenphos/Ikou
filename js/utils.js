export function getRandomNumber(min, max) {
  const floatRandom = Math.random();

  const difference = max - min;

  const random = Math.round(difference * floatRandom);

  const randomWithinRange = random + min;

  return randomWithinRange;
}

export function getAverage(arr) {
  let sum = 0;
  const arrleng = arr.length;
  for (let i = 0; i < arrleng; i++) {
    sum = sum + arr[i];
  }
  return sum / arrleng;
}
