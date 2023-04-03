// [This file is only for showing a sample of how tests work]

const sumFunction = (a, b) => {
  return a + b;
};

// Tests take a description and a function
// Pass the expected result to the toBe()
// Pass the real result to the expect()
// test(name, callback) takes the name of the test and the callback

// This test passes
test("test sumFunction, expected to pass", () => {
  const a = 5;
  const b = 6;
  const result = sumFunction(a, b);
  expect(result).toBe(11);
});

// This test fails:
// test("test sumFunction, expected to fail", () => {
//   const a = 5;
//   const b = 6;
//   const result = sumFunction(a, b);
//   expect(result).toBe(12);
// });

// run tests: npm test in main directory
