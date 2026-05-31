import { atom, map } from 'nanostores';
import { persistentAtom, persistentMap } from '@nanostores/persistent';

export type Unit = 'mm' | 'cm' | 'in' | 'px';

export interface CalibrationState {
  ppi: number;
  dpr: number;
  method: 'auto' | 'manual' | 'diagonal' | 'reference' | 'none';
  confidence: number; // 0 to 1
  isVerified: boolean;
  lastUpdated: string;
}

export interface UserPreferences {
  unit: Unit;
  theme: 'light' | 'dark';
  showGrid: boolean;
  gridType: 'dots' | 'lines' | 'subdivisions';
  showCrosshair: boolean;
  markedPoints: Array<{ x: number, y: number }>;
  // Ruler visibility for the measure page
  rulers: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
}

// Default values (approximate for unknown desktop)
const DEFAULT_PPI = 96;

export const calibrationStore = persistentMap<CalibrationState>('ruler-calibration:', {
  ppi: DEFAULT_PPI,
  dpr: 1,
  method: 'none',
  confidence: 0,
  isVerified: false,
  lastUpdated: new Date().toISOString(),
});

export const preferencesStore = persistentMap<UserPreferences>('ruler-prefs:', {
  unit: 'cm',
  theme: 'light',
  showGrid: false,
  gridType: 'dots',
  showCrosshair: false,
  markedPoints: [],
  rulers: {
    top: true,
    bottom: false,
    left: true,
    right: false,
  }
});

/**
 * Utility: Convert real-world millimeters to screen pixels
 */
export function mmToPx(mm: number, ppi: number): number {
  return (mm / 25.4) * ppi;
}

/**
 * Utility: Convert screen pixels to real-world millimeters
 */
export function pxToMm(px: number, ppi: number): number {
  return (px / ppi) * 25.4;
}

/**
 * Utility: Formatted measurement string
 */
export function formatMeasurement(value: number, unit: Unit): string {
  switch (unit) {
    case 'mm': return `${value.toFixed(1)} mm`;
    case 'cm': return `${(value / 10).toFixed(2)} cm`;
    case 'in': return `${(value / 25.4).toFixed(2)} in`;
    case 'px': return `${Math.round(value)} px`;
    default: return `${value.toFixed(1)}`;
  }
}
