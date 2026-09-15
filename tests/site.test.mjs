import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const page = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8');
const layout = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');
const content = await readFile(new URL('../content/spots.ts', import.meta.url), 'utf8');
const styles = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');
const edgeone = JSON.parse(await readFile(new URL('../edgeone.json', import.meta.url), 'utf8'));

test('renders five interactive scenic spot markers', () => {
  const names = ['微子文化苑', '铁道游击队纪念园', '荷园客码头', '微子林', '吕蒙墓码头'];
  for (const name of names) assert.match(content, new RegExp(name));
  assert.match(page, /spots\.map/);
  assert.match(page, /onClick=\{\(\) => setActiveId/);
});

test('keeps scenic content in an editable data module', () => {
  assert.match(page, /content\/spots/);
  assert.match(content, /export const spots/);
  assert.match(content, /imageAlt/);
});

test('includes a Tencent EdgeOne static deployment profile', () => {
  assert.equal(edgeone.buildCommand, 'npm run build:tencent');
  assert.equal(edgeone.outputDirectory, 'out');
  assert.equal(edgeone.nodeVersion, '22.17.1');
});

test('includes route controls and accessible map text', () => {
  assert.match(page, /推荐游览路线/);
  assert.match(page, /setRouteVisible/);
  assert.match(page, /alt="微山岛手绘游览地图"/);
});

test('supports zoom, reset, and drag interactions', () => {
  assert.match(page, /放大地图/);
  assert.match(page, /缩小地图/);
  assert.match(page, /resetMap/);
  assert.match(page, /onPointerMove=\{moveDrag\}/);
  assert.match(page, /onWheel=\{wheelZoom\}/);
});

test('shows the complete base map at its original aspect ratio', () => {
  assert.match(styles, /aspect-ratio:1140\/788/);
  assert.match(styles, /object-fit:contain/);
  assert.match(styles, /place-items:center/);
});

test('defines Chinese site metadata', () => {
  assert.match(layout, /微山岛游览图/);
  assert.match(layout, /lang="zh-CN"/);
});

test('searches scenic spots and supports keyboard selection', () => {
  assert.match(page, /placeholder="搜索景点、文化或码头"/);
  assert.match(page, /spot\.name, spot\.tag, spot\.short, spot\.intro/);
  assert.match(page, /event\.key === 'ArrowDown'/);
  assert.match(page, /event\.key === 'Enter'/);
  assert.match(page, /role="listbox"/);
  assert.match(styles, /\.spot-marker\.is-dimmed/);
});
