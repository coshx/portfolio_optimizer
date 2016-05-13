/**
 * Defines data model for POST requests to optimizer.
 */
export class Optimization {
  constructor(
    public symbols: string[],
    public startDate: string,
    public endDate: string,
    public initialInvestment: number
  ) { }
}
