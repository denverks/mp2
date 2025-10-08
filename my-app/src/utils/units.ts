export function dmToMeters(dm: number): number {
  return dm / 10;
}

export function hgToKilograms(hg: number): number {
  return hg / 10;
}

export function formatMeters(dm: number): string {
  return `${dmToMeters(dm).toFixed(1)} m`;
}

export function formatKilograms(hg: number): string {
  return `${hgToKilograms(hg).toFixed(1)} kg`;
}

