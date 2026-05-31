/**
 * Lightweight database of common devices and their physical PPI (Pixels Per Inch).
 * This helps improve auto-detection accuracy beyond window.devicePixelRatio.
 */

export interface DeviceProfile {
  name: string;
  brand: string;
  category: 'Phone' | 'Tablet' | 'Laptop' | 'Monitor' | 'Generic';
  ppi: number;
  dpr: number;
  width: number;
  height: number;
}

export const deviceDatabase: DeviceProfile[] = [
  // Apple - iPhones
  { name: "iPhone 15 Pro Max", brand: "Apple", category: "Phone", ppi: 460, dpr: 3, width: 430, height: 932 },
  { name: "iPhone 15 Pro", brand: "Apple", category: "Phone", ppi: 460, dpr: 3, width: 393, height: 852 },
  { name: "iPhone 15 / 15 Plus", brand: "Apple", category: "Phone", ppi: 460, dpr: 3, width: 393, height: 852 },
  { name: "iPhone 14 Pro Max", brand: "Apple", category: "Phone", ppi: 460, dpr: 3, width: 430, height: 932 },
  { name: "iPhone 14 Pro", brand: "Apple", category: "Phone", ppi: 460, dpr: 3, width: 393, height: 852 },
  { name: "iPhone 13 / 14", brand: "Apple", category: "Phone", ppi: 460, dpr: 3, width: 390, height: 844 },
  { name: "iPhone 12 / 13 Pro", brand: "Apple", category: "Phone", ppi: 460, dpr: 3, width: 390, height: 844 },
  { name: "iPhone 11 / XR", brand: "Apple", category: "Phone", ppi: 326, dpr: 2, width: 414, height: 896 },
  { name: "iPhone SE (3rd Gen)", brand: "Apple", category: "Phone", ppi: 326, dpr: 2, width: 375, height: 667 },
  
  // Apple - iPads
  { name: "iPad Pro 12.9 (M2)", brand: "Apple", category: "Tablet", ppi: 264, dpr: 2, width: 1024, height: 1366 },
  { name: "iPad Pro 11 (M2)", brand: "Apple", category: "Tablet", ppi: 264, dpr: 2, width: 834, height: 1194 },
  { name: "iPad Air (M2)", brand: "Apple", category: "Tablet", ppi: 264, dpr: 2, width: 820, height: 1180 },
  { name: "iPad Mini (6th Gen)", brand: "Apple", category: "Tablet", ppi: 326, dpr: 2, width: 744, height: 1133 },
  
  // Apple - MacBooks
  { name: "MacBook Pro 14 (M3)", brand: "Apple", category: "Laptop", ppi: 254, dpr: 2, width: 1512, height: 982 },
  { name: "MacBook Pro 16 (M3)", brand: "Apple", category: "Laptop", ppi: 254, dpr: 2, width: 1728, height: 1117 },
  { name: "MacBook Air 13 (M2)", brand: "Apple", category: "Laptop", ppi: 224, dpr: 2, width: 1280, height: 832 },
  { name: "MacBook Pro 13 (Retina)", brand: "Apple", category: "Laptop", ppi: 227, dpr: 2, width: 1280, height: 800 },

  // Samsung
  { name: "Samsung Galaxy S23 Ultra", brand: "Samsung", category: "Phone", ppi: 500, dpr: 3, width: 384, height: 854 },
  { name: "Samsung Galaxy S23", brand: "Samsung", category: "Phone", ppi: 425, dpr: 3, width: 360, height: 780 },
  { name: "Samsung Galaxy S22", brand: "Samsung", category: "Phone", ppi: 425, dpr: 3, width: 360, height: 800 },
  { name: "Samsung Galaxy Tab S9", brand: "Samsung", category: "Tablet", ppi: 274, dpr: 2, width: 800, height: 1280 },
  { name: "Samsung Galaxy Z Fold 5", brand: "Samsung", category: "Phone", ppi: 374, dpr: 3, width: 373, height: 912 },

  // Google
  { name: "Google Pixel 8 Pro", brand: "Google", category: "Phone", ppi: 489, dpr: 3, width: 384, height: 832 },
  { name: "Google Pixel 8", brand: "Google", category: "Phone", ppi: 428, dpr: 2.6, width: 412, height: 915 },
  { name: "Google Pixel 7 Pro", brand: "Google", category: "Phone", ppi: 512, dpr: 3.5, width: 412, height: 892 },
  { name: "Google Pixel Tablet", brand: "Google", category: "Tablet", ppi: 276, dpr: 2, width: 1280, height: 800 },
  
  // Microsoft
  { name: "Surface Laptop 5 13.5\"", brand: "Microsoft", category: "Laptop", ppi: 201, dpr: 2, width: 2256, height: 1504 },
  { name: "Surface Pro 9", brand: "Microsoft", category: "Tablet", ppi: 267, dpr: 2, width: 2880, height: 1920 },

  // Xiaomi / Poco
  { name: "Xiaomi 13 Ultra", brand: "Xiaomi", category: "Phone", ppi: 522, dpr: 3, width: 393, height: 873 },
  { name: "Poco F5 Pro", brand: "Xiaomi", category: "Phone", ppi: 526, dpr: 3.5, width: 393, height: 873 },

  // Monitors
  { name: "Standard 1080p 24\"", brand: "Generic", category: "Monitor", ppi: 92, dpr: 1, width: 1920, height: 1080 },
  { name: "Standard 1080p 27\"", brand: "Generic", category: "Monitor", ppi: 82, dpr: 1, width: 1920, height: 1080 },
  { name: "Standard 1440p 27\"", brand: "Generic", category: "Monitor", ppi: 109, dpr: 1, width: 2560, height: 1440 },
  { name: "Standard 4K 27\"", brand: "Generic", category: "Monitor", ppi: 163, dpr: 2, width: 3840, height: 2160 },
  { name: "Standard 4K 32\"", brand: "Generic", category: "Monitor", ppi: 140, dpr: 1.5, width: 3840, height: 2160 },

  // Generic
  { name: "Standard Mobile", brand: "Generic", category: "Generic", ppi: 400, dpr: 3, width: 360, height: 800 },
  { name: "Standard Tablet", brand: "Generic", category: "Generic", ppi: 264, dpr: 2, width: 800, height: 1280 },
  { name: "Standard Laptop", brand: "Generic", category: "Generic", ppi: 140, dpr: 1.25, width: 1366, height: 768 },
];

/**
 * Attempts to match the current device against the database.
 */
export function detectDevice(): DeviceProfile | null {
  if (typeof window === "undefined") return null;

  const width = window.screen.width;
  const height = window.screen.height;
  const dpr = window.devicePixelRatio;

  // Simple match by resolution and DPR
  return deviceDatabase.find(d => 
    ((d.width === width && d.height === height) || (d.width === height && d.height === width)) &&
    Math.abs(d.dpr - dpr) < 0.1
  ) || null;
}
