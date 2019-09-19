export class Employee {
  constructor(
    public company: string,
    public name: string,
    public salary: number,
    public type: string,
    public lunchtime?: string,
    public years_of_experience?: number,
    public reception_hours?: number,
    public id?: number
  ) {}
}
