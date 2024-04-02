const array2d = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const array2d2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

let bool = true;

for (let i = 0; i < array2d.length; i++) {
  for (let j = 0; j < array2d[i].length; j++) {
    if (array2d[i][j] !== array2d2[i][j]) {
      bool = false;
      break;
    }
  }
  if (!bool) break;
}

console.log(bool);