'use client';

import { useRef, useState, type PointerEvent, type WheelEvent } from 'react';
import { spots } from '../content/spots';

const clampScale = (value: number) => Math.min(2.6, Math.max(1, value));

export default function Home() {
  const [activeId, setActiveId] = useState('');
  const [routeVisible, setRouteVisible] = useState(true);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const active = spots.find((spot) => spot.id === activeId);
  const routePath = spots.map((spot, index) => `${index === 0 ? 'M' : 'L'} ${spot.x} ${spot.y}`).join(' ');

  const zoomTo = (next: number) => {
    const bounded = clampScale(next);
    setScale(bounded);
    if (bounded === 1) setOffset({ x: 0, y: 0 });
  };

  const resetMap = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) return;
    dragStart.current = { x: event.clientX, y: event.clientY, offsetX: offset.x, offsetY: offset.y };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging || scale === 1) return;
    setOffset({
      x: dragStart.current.offsetX + event.clientX - dragStart.current.x,
      y: dragStart.current.offsetY + event.clientY - dragStart.current.y,
    });
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setDragging(false);
  };

  const wheelZoom = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    zoomTo(scale + (event.deltaY < 0 ? 0.18 : -0.18));
  };

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#map" aria-label="微山岛游览图首页">
          <span className="brand-mark">微</span>
          <span><strong>微山岛游览图</strong><small>WEISHAN ISLAND GUIDE</small></span>
        </a>
        <div className="top-actions"><span className="weather">湖风轻拂 · 适宜漫游</span><button className="round-button" aria-label="查看导览说明">?</button></div>
      </header>

      <section className="map-stage" id="map" aria-label="微山岛景点地图">
        <div
          className={`map-viewport ${dragging ? 'is-dragging' : ''}`}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onWheel={wheelZoom}
        >
          <div className="map-canvas" style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})` }}>
            <img className="map-image" src="/weishan-island-map.png" alt="微山岛手绘游览地图" draggable={false} />
            <div className="map-wash" />
            {routeVisible && <svg className="route-layer" viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="推荐游览路线"><path d={routePath} /></svg>}

            {spots.map((spot, index) => (
              <button key={spot.id} className={`spot-marker ${activeId === spot.id ? 'is-active' : ''}`} style={{ left: `${spot.x}%`, top: `${spot.y}%` }} onClick={() => setActiveId(spot.id)} aria-label={`查看${spot.name}介绍`}>
                <span className="marker-dot">{String(index + 1).padStart(2, '0')}</span><span className="marker-label">{spot.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="map-heading"><span className="eyebrow">一岛 · 一湖 · 一段传奇</span><h1>循湖风，游微山</h1><p>点按景点查看介绍 · 滚轮缩放 · 拖拽移动</p></div>

        <div className="zoom-control" aria-label="地图缩放控制">
          <button onClick={() => zoomTo(scale + 0.25)} disabled={scale >= 2.6} aria-label="放大地图">＋</button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={() => zoomTo(scale - 0.25)} disabled={scale <= 1} aria-label="缩小地图">－</button>
          <button className="reset-button" onClick={resetMap} disabled={scale === 1 && offset.x === 0 && offset.y === 0}>复位</button>
        </div>

        {active && <aside className="spot-card" aria-live="polite">
          <div className="card-meta"><span>{active.tag}</span><span>{active.time}</span></div>
          <button className="card-close" onClick={() => setActiveId('')} aria-label="关闭景点介绍">×</button>
          <span className="card-number">{String(spots.indexOf(active) + 1).padStart(2, '0')}</span>
          <p className="card-kicker">当前景点</p><h2>{active.name}</h2><p className="card-subtitle">{active.short}</p><p className="card-intro">{active.intro}</p>
          {active.image && <img className="card-image" src={active.image} alt={active.imageAlt || active.name} />}
        </aside>}

        <div className="route-control"><div><span className="route-icon">游</span><p><strong>岛屿精华线</strong><small>约 4.5 小时 · {spots.length} 个景点</small></p></div><button className={routeVisible ? 'active' : ''} onClick={() => setRouteVisible((value) => !value)}>{routeVisible ? '隐藏路线' : '显示路线'}</button></div>

        <nav className="spot-index" aria-label="景点快速导航">
          {spots.map((spot, index) => <button key={spot.id} className={activeId === spot.id ? 'active' : ''} onClick={() => setActiveId(spot.id)}><span>{String(index + 1).padStart(2, '0')}</span>{spot.name}</button>)}
        </nav>
      </section>
    </main>
  );
}
