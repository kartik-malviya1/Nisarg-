// Script to convert MP GeoJSON to SVG paths and generate the MPMap component
// Run with: node scripts/geojson-to-svg.js

const fs = require('fs');
const path = require('path');

// Read the GeoJSON
let rawJson = fs.readFileSync('.gemini-scratch/mp.geojson', 'utf8');

// Fix truncated JSON - find last complete feature and close the structure
const lastCompleteFeatureEnd = rawJson.lastIndexOf('} },\n{ "type": "Feature"');
const lastClosedFeature = rawJson.lastIndexOf('} }');

// Try to parse, if it fails, truncate to last valid feature
let geojson;
try {
  geojson = JSON.parse(rawJson);
} catch(e) {
  // Find the last valid feature by looking for the end pattern
  // Cut after last '} }' and close the JSON properly
  let truncated = rawJson.substring(0, lastClosedFeature + 3);
  truncated += '\n]\n}';
  try {
    geojson = JSON.parse(truncated);
    console.log(`Parsed ${geojson.features.length} features after truncation fix`);
  } catch(e2) {
    console.error('Still failed to parse:', e2.message.substring(0, 100));
    process.exit(1);
  }
}

// Bounding box of Madhya Pradesh
const LONG_MIN = 74.0;
const LONG_MAX = 82.85;
const LAT_MIN  = 21.05;
const LAT_MAX  = 26.90;

const SVG_W = 800;
const SVG_H = 520;

function project([lon, lat]) {
  const x = ((lon - LONG_MIN) / (LONG_MAX - LONG_MIN)) * SVG_W;
  const y = SVG_H - ((lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * SVG_H;
  return [x, y];
}

function ringToPath(ring) {
  const points = ring.map(project);
  return 'M ' + points.map(([x,y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L ') + ' Z';
}

function geomToPath(geom) {
  if (geom.type === 'Polygon') {
    return geom.coordinates.map(ringToPath).join(' ');
  } else if (geom.type === 'MultiPolygon') {
    return geom.coordinates.flatMap(poly => poly.map(ringToPath)).join(' ');
  }
  return '';
}

// Find approximate centroid of path for label placement
function centroid(geom) {
  let coords = [];
  if (geom.type === 'Polygon') coords = geom.coordinates[0];
  else if (geom.type === 'MultiPolygon') coords = geom.coordinates[0][0];
  if (!coords.length) return [SVG_W/2, SVG_H/2];
  const avgLon = coords.reduce((s,c) => s+c[0], 0) / coords.length;
  const avgLat = coords.reduce((s,c) => s+c[1], 0) / coords.length;
  return project([avgLon, avgLat]);
}

const districts = geojson.features.map(f => {
  const name = f.properties.NAME_2;
  const [cx, cy] = centroid(f.geometry);
  const d = geomToPath(f.geometry);
  return { name, d, cx: Math.round(cx), cy: Math.round(cy) };
});

console.log(`Generated ${districts.length} district paths:`);
districts.forEach(d => console.log(` - ${d.name} (centroid: ${d.cx}, ${d.cy})`));

// Output as TypeScript data
const tsContent = `// Auto-generated from GeoJSON - Do not edit manually
// Generated from: https://github.com/tarunshah/India-D3/blob/master/MadhyaPradesh.geojson
// SVG viewBox: 0 0 ${SVG_W} ${SVG_H}

export interface DistrictPath {
  name: string;
  d: string;
  cx: number;
  cy: number;
}

export const MP_DISTRICTS: DistrictPath[] = ${JSON.stringify(districts, null, 2)};
`;

fs.writeFileSync('components/mpDistrictPaths.ts', tsContent);
console.log('\nWrote components/mpDistrictPaths.ts');
