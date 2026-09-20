import { describe, expect, it } from 'vitest';
import { calculateWorkshopShelfHoles } from '../../src/engine/workshop-shelf-holes';

describe('calculateWorkshopShelfHoles', () => {
  it('Tek Delik ölçülerini eşit net boşlukla hesaplar', () => {
    const result = calculateWorkshopShelfHoles({
      heightMm: 1762,
      shelfCount: 4,
      shelfThicknessMm: 19,
      pattern: 'single',
    });

    expect(result.clearGapMm).toBe(337.2);
    expect(result.groups).toEqual([
      { shelfNumber: 1, centreMm: 337.2 },
      { shelfNumber: 2, centreMm: 693.4 },
      { shelfNumber: 3, centreMm: 1049.6 },
      { shelfNumber: 4, centreMm: 1405.8 },
    ]);
  });

  it('Üçlü Delik için 50 mm aşağı ve 70 mm yukarı ekler', () => {
    const result = calculateWorkshopShelfHoles({
      heightMm: 1762,
      shelfCount: 4,
      shelfThicknessMm: 19,
      pattern: 'triple',
    });

    expect(result.groups[0]).toEqual({
      shelfNumber: 1,
      lowerMm: 287.2,
      centreMm: 337.2,
      upperMm: 407.2,
    });
  });

  it.each([
    { heightMm: 0, shelfCount: 1, shelfThicknessMm: 19, pattern: 'single' },
    { heightMm: 1000, shelfCount: 0, shelfThicknessMm: 19, pattern: 'single' },
    { heightMm: 50, shelfCount: 3, shelfThicknessMm: 19, pattern: 'triple' },
  ] as const)('hatalı ölçüyü reddeder', (input) => {
    expect(() => calculateWorkshopShelfHoles(input)).toThrow(RangeError);
  });
});
