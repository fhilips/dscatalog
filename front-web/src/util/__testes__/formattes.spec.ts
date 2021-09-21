import { formatPrice } from "util/formatters";

describe('formatPrice tests', () => {
  test('should format number pt-BR when given 10.1', () => {
    const value = 10.1;

    const result = formatPrice(value);

    expect(result).toEqual("10,10");

  })
  test('should format number pt-BR when given 0', () => {
    const value = 0;

    const result = formatPrice(value);

    expect(result).toEqual("0,00");

  })
})
