export type Country = {
  code: string;
  name: string;
  koreanName: string;
  /** kgCO2eq per kWh — Scope 2 purchased electricity grid emission intensity */
  gridEmissionFactor: number;
};