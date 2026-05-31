/**
 * Simple analytics / telemetry wrapper.
 * Logs events to console for now, easily replaceable with Plausible, GA4, or Vercel Analytics.
 */

export function trackEvent(name: string, properties?: Record<string, any>) {
  console.log(`[Analytics] ${name}`, properties);
  
  // Example integration:
  // if (window.umami) window.umami.track(name, properties);
}

export function trackCalibration(method: string, ppi: number) {
  trackEvent('calibration_completed', { method, ppi });
}
