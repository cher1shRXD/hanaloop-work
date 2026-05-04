import { parseEncodedFactor, calcEmissions, ROAD_FREIGHT_FACTOR } from "./calc-emissions";
import { EmissionInput } from "../types/emission-input";


describe("parseEncodedFactor", () => {
  test("source와 factor를 올바르게 파싱한다", () => {
    expect(parseEncodedFactor("디젤::2.688")).toEqual({ source: "디젤", factor: 2.688 });
    expect(parseEncodedFactor("LPG::1.519")).toEqual({ source: "LPG", factor: 1.519 });
    expect(parseEncodedFactor("철강::2.10")).toEqual({ source: "철강", factor: 2.1 });
  });

  test("factor 부분이 빈 문자열이면 0을 반환한다 (Number('') === 0)", () => {
    // "디젤::".split("::") → ["디젤", ""] → Number("") === 0
    const result = parseEncodedFactor("디젤::");
    expect(result.source).toBe("디젤");
    expect(result.factor).toBe(0);
  });

  test("구분자가 없으면 factor는 NaN이다 (Number(undefined) === NaN)", () => {
    // "".split("::") → [""] → factorStr = undefined → Number(undefined) === NaN
    const result = parseEncodedFactor("");
    expect(result.source).toBe("");
    expect(Number.isNaN(result.factor)).toBe(true);
  });
});


const zeroInput: EmissionInput = {
  companyId: "c1",
  yearMonth: "2024-01",
  fuel: { source: "디젤", factor: 2.688, usage: 0 },
  electricity: { usage: 0 },
  material: { source: "철강", factor: 2.1, weight: 0 },
  transport: { weight: 0, distance: 0 },
};

describe("calcEmissions", () => {
  describe("0 필터링", () => {
    test("모든 사용량이 0이면 빈 배열을 반환한다", () => {
      expect(calcEmissions(zeroInput, 0)).toEqual([]);
    });

    test("배출량이 0인 항목은 결과에서 제외된다", () => {
      const input = { ...zeroInput, fuel: { source: "디젤", factor: 2.688, usage: 100 } };
      const result = calcEmissions(input, 0);
      expect(result.every((e) => e.emissions > 0)).toBe(true);
    });
  });

  describe("Scope 1 — 연료 직접 연소", () => {
    test("디젤 100L × 2.688 kgCO2eq/L ÷ 1000 = 0.269 tCO2eq", () => {
      const input = { ...zeroInput, fuel: { source: "디젤", factor: 2.688, usage: 100 } };
      const result = calcEmissions(input, 0);
      const scope1 = result.find((e) => e.scope === 1);
      expect(scope1).toMatchObject({ source: "디젤", scope: 1, emissions: 0.269 });
    });

    test("천연가스 500m³ × 2.040 kgCO2eq/m³ ÷ 1000 = 1.02 tCO2eq", () => {
      const input = {
        ...zeroInput,
        fuel: { source: "천연가스", factor: 2.04, usage: 500 },
      };
      const result = calcEmissions(input, 0);
      expect(result[0]).toMatchObject({ source: "천연가스", scope: 1, emissions: 1.02 });
    });
  });

  describe("Scope 2 — 구매 전력 (국가별 그리드 배출계수)", () => {
    test("한국(0.4747): 10000 kWh × 0.4747 ÷ 1000 = 4.747 tCO2eq", () => {
      const input = { ...zeroInput, electricity: { usage: 10000 } };
      const result = calcEmissions(input, 0.4747);
      expect(result[0]).toMatchObject({ source: "전력", scope: 2, emissions: 4.747 });
    });

    test("미국(0.369): 10000 kWh × 0.369 ÷ 1000 = 3.69 tCO2eq", () => {
      const input = { ...zeroInput, electricity: { usage: 10000 } };
      const result = calcEmissions(input, 0.369);
      expect(result[0]).toMatchObject({ source: "전력", scope: 2, emissions: 3.69 });
    });

    test("독일(0.380): 10000 kWh × 0.380 ÷ 1000 = 3.8 tCO2eq", () => {
      const input = { ...zeroInput, electricity: { usage: 10000 } };
      const result = calcEmissions(input, 0.38);
      expect(result[0]).toMatchObject({ source: "전력", scope: 2, emissions: 3.8 });
    });

    test("gridFactor 0이면 Scope 2 레코드를 생성하지 않는다", () => {
      const input = { ...zeroInput, electricity: { usage: 10000 } };
      expect(calcEmissions(input, 0)).toEqual([]);
    });
  });

  describe("Scope 3 Cat.1 — 구매 원자재", () => {
    test("철강 1000kg × 2.1 kgCO2eq/kg ÷ 1000 = 2.1 tCO2eq", () => {
      const input = {
        ...zeroInput,
        material: { source: "철강", factor: 2.1, weight: 1000 },
      };
      const result = calcEmissions(input, 0);
      expect(result[0]).toMatchObject({ source: "철강", scope: 3, emissions: 2.1 });
    });

    test("알루미늄 500kg × 8.24 kgCO2eq/kg ÷ 1000 = 4.12 tCO2eq", () => {
      const input = {
        ...zeroInput,
        material: { source: "알루미늄", factor: 8.24, weight: 500 },
      };
      const result = calcEmissions(input, 0);
      expect(result[0]).toMatchObject({ source: "알루미늄", scope: 3, emissions: 4.12 });
    });
  });

  describe(`Scope 3 Cat.4 — 물류·운송 (ROAD_FREIGHT_FACTOR=${ROAD_FREIGHT_FACTOR})`, () => {
    test("10t × 100km × 0.092 ÷ 1000 = 0.092 tCO2eq", () => {
      const input = { ...zeroInput, transport: { weight: 10, distance: 100 } };
      const result = calcEmissions(input, 0);
      expect(result[0]).toMatchObject({ source: "물류·운송", scope: 3, emissions: 0.092 });
    });

    test("5t × 200km × 0.092 ÷ 1000 = 0.092 tCO2eq", () => {
      const input = { ...zeroInput, transport: { weight: 5, distance: 200 } };
      const result = calcEmissions(input, 0);
      expect(result[0]).toMatchObject({ source: "물류·운송", scope: 3, emissions: 0.092 });
    });
  });

  describe("소수점 3자리 반올림", () => {
    test("0.4747 → 0.475로 반올림된다", () => {
      // 1000 kWh × 0.4747 / 1000 = 0.4747 → round(474.7) / 1000 = 0.475
      const input = { ...zeroInput, electricity: { usage: 1000 } };
      const result = calcEmissions(input, 0.4747);
      expect(result[0].emissions).toBe(0.475);
    });

    test("3자리 이하 소수는 그대로 유지된다", () => {
      // 100L × 2.688 / 1000 = 0.2688 → round(268.8) / 1000 = 0.269
      const input = { ...zeroInput, fuel: { source: "디젤", factor: 2.688, usage: 100 } };
      const result = calcEmissions(input, 0);
      expect(result[0].emissions).toBe(0.269);
    });
  });

  describe("yearMonth 전파", () => {
    test("입력의 yearMonth가 모든 레코드에 전달된다", () => {
      const input: EmissionInput = {
        companyId: "c1",
        yearMonth: "2024-06",
        fuel: { source: "디젤", factor: 2.688, usage: 100 },
        electricity: { usage: 5000 },
        material: { source: "철강", factor: 2.1, weight: 1000 },
        transport: { weight: 10, distance: 100 },
      };
      const result = calcEmissions(input, 0.369);
      expect(result).toHaveLength(4);
      expect(result.every((e) => e.yearMonth === "2024-06")).toBe(true);
    });
  });

  describe("전체 입력 통합", () => {
    test("4개 배출원 모두 입력 시 4개 레코드를 반환한다", () => {
      const input: EmissionInput = {
        companyId: "c1",
        yearMonth: "2024-03",
        fuel: { source: "디젤", factor: 2.688, usage: 500 },   // 500 × 2.688 / 1000 = 1.344
        electricity: { usage: 10000 },                           // 10000 × 0.369 / 1000 = 3.69
        material: { source: "철강", factor: 2.1, weight: 2000 }, // 2000 × 2.1 / 1000 = 4.2
        transport: { weight: 5, distance: 200 },                 // 5 × 200 × 0.092 / 1000 = 0.092
      };
      const result = calcEmissions(input, 0.369);

      expect(result).toHaveLength(4);
      expect(result.find((e) => e.scope === 1)?.emissions).toBe(1.344);
      expect(result.find((e) => e.scope === 2)?.emissions).toBe(3.69);
      expect(result.find((e) => e.source === "철강")?.emissions).toBe(4.2);
      expect(result.find((e) => e.source === "물류·운송")?.emissions).toBe(0.092);
    });
  });
});
