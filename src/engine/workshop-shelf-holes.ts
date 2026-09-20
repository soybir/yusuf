export type WorkshopHolePattern = 'single' | 'triple';

export interface WorkshopShelfHoleInput {
  readonly heightMm: number;
  readonly shelfCount: number;
  readonly shelfThicknessMm: number;
  readonly pattern: WorkshopHolePattern;
}

export interface WorkshopShelfHoleGroup {
  readonly shelfNumber: number;
  readonly centreMm: number;
  readonly lowerMm?: number;
  readonly upperMm?: number;
}

export interface WorkshopShelfHoleResult {
  readonly clearGapMm: number;
  readonly groups: readonly WorkshopShelfHoleGroup[];
}

function roundWorkshopMm(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Yusuf'un Tek Delik / Üçlü Delik sistemini hesaplar.
 *
 * Net boşluk = (yükseklik - raf sayısı × raf kalınlığı) / (raf sayısı + 1)
 * Orta delik(n) = n × net boşluk + (n - 1) × raf kalınlığı
 * Üçlü Delik: alt = orta - 50 mm, üst = orta + 70 mm
 */
export function calculateWorkshopShelfHoles(input: WorkshopShelfHoleInput): WorkshopShelfHoleResult {
  const { heightMm, shelfCount, shelfThicknessMm, pattern } = input;

  if (heightMm <= 0 || !Number.isFinite(heightMm)) {
    throw new RangeError(`heightMm must be finite and > 0, got ${heightMm}`);
  }
  if (shelfCount <= 0 || !Number.isInteger(shelfCount)) {
    throw new RangeError(`shelfCount must be a positive integer, got ${shelfCount}`);
  }
  if (shelfThicknessMm <= 0 || !Number.isFinite(shelfThicknessMm)) {
    throw new RangeError(`shelfThicknessMm must be finite and > 0, got ${shelfThicknessMm}`);
  }
  if (pattern !== 'single' && pattern !== 'triple') {
    throw new RangeError(`pattern must be single or triple, got ${String(pattern)}`);
  }

  const clearGapMm = (heightMm - shelfCount * shelfThicknessMm) / (shelfCount + 1);
  if (clearGapMm <= 0) {
    throw new RangeError('Shelves do not fit inside the available height');
  }

  const groups = Array.from({ length: shelfCount }, (_, index): WorkshopShelfHoleGroup => {
    const shelfNumber = index + 1;
    const centreMm = roundWorkshopMm(shelfNumber * clearGapMm + index * shelfThicknessMm);

    if (pattern === 'single') {
      return { shelfNumber, centreMm };
    }

    return {
      shelfNumber,
      lowerMm: roundWorkshopMm(centreMm - 50),
      centreMm,
      upperMm: roundWorkshopMm(centreMm + 70),
    };
  });

  return { clearGapMm: roundWorkshopMm(clearGapMm), groups };
}
