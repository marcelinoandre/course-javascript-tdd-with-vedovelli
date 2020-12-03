const sum = (number1, number2) => {
  const value1 = parseInt(number1);
  const value2 = parseInt(number2);

  if (Number.isNaN(value1) || Number.isNaN(value2))
    throw new Error('Invalid param');

  return value1 + value2;
};

module.exports = {
  sum
};
