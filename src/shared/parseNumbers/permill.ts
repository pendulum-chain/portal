/**
 * Class representing a per-mille (‰) value.
 * In this system, 1,000,000 represents 100%, so a value of 500,000 would represent 50%, and so on.
 * The value must be between 0 and 1,000,000.
 *
 * @property value - The per-mille value. Must be between 0 and 1,000,000.
 */
export class PerMill {
  private value: number;

  constructor(value: number) {
    if (value < 0 || value > 1_000_000) {
      throw new Error('PerMill value must be between 0 and 1,000,000');
    }
    this.value = value;
  }

  /**
   * Converts the PerMill value to a decimal representation.
   * This is useful for converting per-mille values (where 1,000,000 represents 100%) to a decimal percentage.
   * @returns The decimal equivalent of the PerMill value.
   */
  public toDecimal(): number {
    return this.value / 1_000_000;
  }

  /**
   * Applies a markup or adjustment represented as a PerMill value to a given number.
   * The adjustment is added to the original number as a percentage.
   * This method can be used to apply a wide variety of adjustments, including fees, taxes, discounts, and more.
   * @param n The original number.
   * @returns The number after applying the markup or adjustment.
   */
  public applyAdjustmentToNumber(n: number): number {
    const adjustmentAsDecimal = this.toDecimal();
    return n * (1 + adjustmentAsDecimal);
  }
}
