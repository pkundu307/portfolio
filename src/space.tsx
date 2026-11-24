import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ============================================================
   TYPES
   ============================================================ */
interface PlanetItem {
  title: string;
  body: string;
}
interface PlanetData {
  id: string;
  code: string;
  label: string;
  color: number;
  hasRing: boolean;
  position: [number, number, number];
  radius: number;
  envName: string;
  sky: { top: string; bottom: string };
  ground: string;
  fog: string;
  alien: number;
  items: PlanetItem[];
}
interface PlanetInstance {
  data: PlanetData;
  group: THREE.Group;
  labelEl: HTMLDivElement;
}
interface MarkerInstance {
  el: HTMLDivElement;
  worldOffset: THREE.Vector3;
}
type FlightMode = 'flight' | 'transition' | 'driving';
type TransitionPhase = 'landing-out' | 'landing-in' | 'launch-out' | 'launch-in' | null;
interface HudRefs {
  label?: HTMLElement | null;
  speed?: HTMLElement | null;
  heading?: HTMLElement | null;
  altitude?: HTMLElement | null;
  nearest?: HTMLElement | null;
}

/* ============================================================
   CONTENT DATA — EDIT THIS SECTION WITH YOUR REAL INFO
   Each planet has a space "color" (used for the planet + sky/ground
   theme on the ground) and a list of "items" that appear as roadside
   markers, alternating left/right, as you drive.
   ============================================================ */
const PLANETS_DATA: PlanetData[] = [
  {
    id: 'about', code: 'ORIGIN-01', label: 'About Me', color: 0x4fd6ff,
    hasRing: false, position: [0, 0, -160], radius: 16,
    envName: 'Ion Fields',
    sky: { top: '#0a2e4d', bottom: '#4fd6ff' }, ground: '#26405c', fog: '#1b3a55', alien: 0x6fe8ff,
    items: [
      { title: 'Who I Am', body: 'Full-stack developer who turns complex problems into clean, scalable systems.' },
      { title: '5+ Years', body: 'Professional experience across the stack.' },
      { title: '40+ Projects', body: 'Shipped and delivered to production.' },
      { title: '20+ Technologies', body: 'Comfortable across the modern web stack.' },
    ],
  },
  {
    id: 'experience', code: 'FORGE-02', label: 'Experience', color: 0xff7a3d,
    hasRing: true, position: [130, 22, -340], radius: 19,
    envName: 'Forge Wastes',
    sky: { top: '#3d0f0a', bottom: '#ff7a3d' }, ground: '#4a2416', fog: '#5c2a12', alien: 0xffb066,
    items: [
      { title: 'Software Engineer — Company One', body: '02/2025–Present · Building APIs, connecting data stores, owns CI/CD.' },
      { title: 'Full Stack Developer — Company Two', body: '03/2024–02/2025 · UI/UX + backend for a cross-platform desktop app.' },
      { title: 'Junior Developer — Company Three', body: '06/2023–03/2024 · Internal tools and client dashboards.' },
    ],
  },
  {
    id: 'skills', code: 'NEXUS-03', label: 'Skills', color: 0xb46bff,
    hasRing: false, position: [-150, -14, -520], radius: 17,
    envName: 'Nexus Void',
    sky: { top: '#0a0616', bottom: '#b46bff' }, ground: '#241a3a', fog: '#2a1a40', alien: 0xd39bff,
    items: [
      { title: 'Frontend', body: 'React, Next.js, TypeScript, Tailwind CSS' },
      { title: 'Backend', body: 'Node.js, Express, FastAPI, Python' },
      { title: 'Database', body: 'PostgreSQL, MongoDB, Redis' },
      { title: 'Tools', body: 'Docker, Git, CI/CD, AWS' },
    ],
  },
  {
    id: 'projects', code: 'ARCHIVE-04', label: 'Projects', color: 0x4dff9e,
    hasRing: true, position: [70, 40, -700], radius: 19,
    envName: 'Verdant Archive',
    sky: { top: '#052613', bottom: '#4dff9e' }, ground: '#1c3a26', fog: '#173322', alien: 0x9dffc6,
    items: [
      { title: 'Project One', body: 'What it does and the problem it solves. React, Node.js.' },
      { title: 'Project Two', body: 'What it does and the problem it solves. Python, FastAPI.' },
      { title: 'Project Three', body: 'What it does and the problem it solves. TypeScript, PostgreSQL.' },
    ],
  },
  {
    id: 'contact', code: 'BEACON-05', label: 'Contact', color: 0xffd23f,
    hasRing: false, position: [-90, 6, -860], radius: 16,
    envName: 'Beacon Dunes',
    sky: { top: '#3a1f00', bottom: '#ffd23f' }, ground: '#4a3a1a', fog: '#5c4419', alien: 0xffe38a,
    items: [
      { title: 'Email', body: 'you@example.com' },
      { title: 'Phone', body: '+1 555 000 0000' },
      { title: 'Location', body: 'Earth (Remote)' },
      { title: 'LinkedIn', body: 'linkedin.com/in/yourname' },
      { title: 'GitHub', body: 'github.com/yourname' },
    ],
  },
];
/* ============================================================ */

const ROAD_HALF_WIDTH = 10;
const MARKER_SPACING = 55;
const ROAD_START_BUFFER = 70;
const ROAD_END_BUFFER = 60;
const DOCK_RADIUS = 42;
const YAXIS = new THREE.Vector3(0, 1, 0);

export default function SpacePortfolio(): JSX.Element {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelsLayerRef = useRef<HTMLDivElement>(null);
  const startScreenRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const dockPromptRef = useRef<HTMLDivElement>(null);
  const dockPromptNameRef = useRef<HTMLSpanElement>(null);
  const controlsHintRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HudRefs>({});
  const minimapCanvasRef = useRef<HTMLCanvasElement>(null);
  const touchControlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current!;
    const labelsLayer = labelsLayerRef.current!;

    // ---------- renderer / scene / camera ----------
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(62, container.clientWidth / container.clientHeight, 0.1, 4000);
    camera.position.set(0, 8, 30);

    function handleResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', handleResize);

    function radialTexture(colorInner: string, colorOuter: string, size = 128): THREE.CanvasTexture {
      const c = document.createElement('canvas'); c.width = c.height = size;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      g.addColorStop(0, colorInner); g.addColorStop(1, colorOuter);
      ctx.fillStyle = g; ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(c);
    }

    /* ============================================================
       SPACE SCENE (flight mode)
       ============================================================ */
    const spaceGroup = new THREE.Group();
    scene.add(spaceGroup);

    spaceGroup.add(new THREE.AmbientLight(0x30355a, 1.1));
    const sunLight = new THREE.PointLight(0xfff2d0, 2.4, 3000, 1.4);
    sunLight.position.set(-400, 150, -1400);
    spaceGroup.add(sunLight);

    const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialTexture('rgba(255,244,214,1)', 'rgba(255,244,214,0)'),
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    sunSprite.scale.set(500, 500, 1);
    sunSprite.position.copy(sunLight.position);
    spaceGroup.add(sunSprite);

    function makeStarfield(count, spread, size) {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * spread;
        pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
        pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ color: 0xffffff, size, sizeAttenuation: true, transparent: true, opacity: 0.85 });
      return new THREE.Points(geo, mat);
    }
    spaceGroup.add(makeStarfield(3500, 3000, 1.6));
    spaceGroup.add(makeStarfield(1500, 1600, 2.6));

    [
      { c1: 'rgba(120,60,200,0.35)', c2: 'rgba(120,60,200,0)', pos: [-300, 80, -700], scale: 900 },
      { c1: 'rgba(255,77,157,0.22)', c2: 'rgba(255,77,157,0)', pos: [350, -60, -1100], scale: 1100 },
      { c1: 'rgba(43,232,255,0.18)', c2: 'rgba(43,232,255,0)', pos: [-100, 140, -1500], scale: 1300 },
    ].forEach((n) => {
      const spr = new THREE.Sprite(new THREE.SpriteMaterial({
        map: radialTexture(n.c1, n.c2), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      }));
      spr.position.set(...n.pos);
      spr.scale.set(n.scale, n.scale, 1);
      spaceGroup.add(spr);
    });

    const asteroidGeo = new THREE.IcosahedronGeometry(1, 0);
    const asteroidMat = new THREE.MeshStandardMaterial({ color: 0x555f6e, roughness: 0.9, flatShading: true });
    const asteroids: THREE.Mesh[] = [];
    for (let i = 0; i < 26; i++) {
      const m = new THREE.Mesh(asteroidGeo, asteroidMat);
      const s = 2 + Math.random() * 5;
      m.scale.set(s, s * (0.7 + Math.random() * 0.6), s);
      m.position.set((Math.random() - 0.5) * 500, (Math.random() - 0.5) * 160, -Math.random() * 950 - 40);
      m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      m.userData.spin = (Math.random() - 0.5) * 0.6;
      spaceGroup.add(m);
      asteroids.push(m);
    }

    const planets: PlanetInstance[] = [];
    PLANETS_DATA.forEach((data) => {
      const group = new THREE.Group();
      const geo = new THREE.SphereGeometry(data.radius, 48, 48);
      const mat = new THREE.MeshStandardMaterial({
        color: data.color, roughness: 0.55, metalness: 0.25, emissive: data.color, emissiveIntensity: 0.12,
      });
      group.add(new THREE.Mesh(geo, mat));

      const glow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: radialTexture('#ffffff', 'rgba(255,255,255,0)'), color: data.color,
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.5,
      }));
      glow.scale.set(data.radius * 4.2, data.radius * 4.2, 1);
      group.add(glow);

      if (data.hasRing) {
        const ringGeo = new THREE.RingGeometry(data.radius * 1.5, data.radius * 2.1, 64);
        const ringMat = new THREE.MeshBasicMaterial({ color: data.color, side: THREE.DoubleSide, transparent: true, opacity: 0.45 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2.3;
        group.add(ring);
      }

      group.position.set(...data.position);
      spaceGroup.add(group);

      const labelEl = document.createElement('div');
      labelEl.className = 'planet-label';
      labelEl.style.color = '#' + data.color.toString(16).padStart(6, '0');
      labelEl.innerHTML = `<div class="name">${data.label}</div><div class="dist"></div>`;
      labelsLayer.appendChild(labelEl);

      planets.push({ data, group, labelEl });
    });

    // ---------- spaceship (reused for driving-mode's "vehicle" identity) ----------
    function buildShip(): THREE.Group {
      const g = new THREE.Group();
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0xd7dde6, metalness: 0.7, roughness: 0.35 });
      const accentMat = new THREE.MeshStandardMaterial({ color: 0xff9d3d, metalness: 0.5, roughness: 0.4, emissive: 0xff9d3d, emissiveIntensity: 0.3 });
      const glassMat = new THREE.MeshStandardMaterial({ color: 0x2be8ff, metalness: 0.2, roughness: 0.1, emissive: 0x2be8ff, emissiveIntensity: 0.6 });
      const engineMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8, roughness: 0.3 });

      const nose = new THREE.Mesh(new THREE.ConeGeometry(0.9, 2.4, 12), bodyMat);
      nose.rotation.x = Math.PI / 2; nose.position.set(0, 0, -2.6);
      g.add(nose);

      const hull = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 3.6, 12), bodyMat);
      hull.rotation.x = Math.PI / 2; hull.position.set(0, 0, -0.4);
      g.add(hull);

      const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), glassMat);
      cockpit.position.set(0, 0.55, -1.6);
      g.add(cockpit);

      const wingGeo = new THREE.BoxGeometry(3.4, 0.15, 1.6);
      const wingL = new THREE.Mesh(wingGeo, accentMat); wingL.position.set(-1.9, 0, 0.6); wingL.rotation.z = 0.06;
      const wingR = new THREE.Mesh(wingGeo, accentMat); wingR.position.set(1.9, 0, 0.6); wingR.rotation.z = -0.06;
      g.add(wingL, wingR);

      const finTop = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.1, 1.2), bodyMat);
      finTop.position.set(0, 0.75, 1.1);
      g.add(finTop);

      const engineGeo = new THREE.CylinderGeometry(0.42, 0.5, 1.0, 10);
      const engineL = new THREE.Mesh(engineGeo, engineMat); engineL.rotation.x = Math.PI / 2; engineL.position.set(-1.1, 0, 1.7);
      const engineR = new THREE.Mesh(engineGeo, engineMat); engineR.rotation.x = Math.PI / 2; engineR.position.set(1.1, 0, 1.7);
      g.add(engineL, engineR);

      const engineGlowMat = new THREE.MeshBasicMaterial({ color: 0x2be8ff });
      const glowL = new THREE.Mesh(new THREE.CircleGeometry(0.36, 16), engineGlowMat); glowL.position.set(-1.1, 0, 2.22);
      const glowR = new THREE.Mesh(new THREE.CircleGeometry(0.36, 16), engineGlowMat); glowR.position.set(1.1, 0, 2.22);
      g.add(glowL, glowR);

      const engineLight = new THREE.PointLight(0x2be8ff, 1.4, 20, 2);
      engineLight.position.set(0, 0, 2.4);
      g.add(engineLight);
      g.userData.engineLight = engineLight;
      return g;
    }
    const ship = buildShip();
    ship.position.set(0, 6, 40);
    spaceGroup.add(ship);

    // engine trail
    const trailPool = [];
    const trailGeo = new THREE.SphereGeometry(0.28, 6, 6);
    const trailMatBase = new THREE.MeshBasicMaterial({ color: 0x2be8ff, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false });
    let trailTimer = 0;
    function spawnTrail() {
      const m = new THREE.Mesh(trailGeo, trailMatBase.clone());
      const worldEnginePos = new THREE.Vector3(0, 0, 2.4).applyMatrix4(ship.matrixWorld);
      m.position.copy(worldEnginePos);
      m.userData.life = 0;
      spaceGroup.add(m);
      trailPool.push(m);
    }

    /* ============================================================
       GROUND SCENE (driving mode) — built fresh per landed planet
       ============================================================ */
    const groundGroup = new THREE.Group();
    groundGroup.visible = false;
    scene.add(groundGroup);

    function buildSkyDome(topHex: string, bottomHex: string): THREE.Mesh {
      const geo = new THREE.SphereGeometry(1800, 24, 16);
      const top = new THREE.Color(topHex), bottom = new THREE.Color(bottomHex);
      const pos = geo.attributes.position;
      const colors = new Float32Array(pos.count * 3);
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i) / 1800; // -1..1
        const t = THREE.MathUtils.clamp((y + 0.15) / 1.15, 0, 1);
        const c = bottom.clone().lerp(top, t);
        colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
      }
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const mat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false });
      return new THREE.Mesh(geo, mat);
    }

    function roadTexture(): THREE.CanvasTexture {
      const c = document.createElement('canvas'); c.width = 64; c.height = 256;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#14161c'; ctx.fillRect(0, 0, 64, 256);
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.fillRect(28, 0, 8, 110);
      ctx.fillRect(28, 146, 8, 110);
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      return tex;
    }
    const sharedRoadTexture = roadTexture();

    function makeLampPost(): THREE.Group {
      const g = new THREE.Group();
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x22262e, metalness: 0.6, roughness: 0.4 });
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 5, 8), poleMat);
      pole.position.y = 2.5;
      g.add(pole);
      const armGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.1, 6);
      const arm = new THREE.Mesh(armGeo, poleMat);
      arm.rotation.z = Math.PI / 2.4;
      arm.position.set(0.35, 4.7, 0);
      g.add(arm);
      const lampMat = new THREE.MeshStandardMaterial({ color: 0xfff4c2, emissive: 0xffe38a, emissiveIntensity: 1.4 });
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 10), lampMat);
      lamp.position.set(0.85, 4.95, 0);
      g.add(lamp);
      const light = new THREE.PointLight(0xffe38a, 0.9, 16, 2);
      light.position.copy(lamp.position);
      g.add(light);
      return g;
    }

    function makeTree(): THREE.Group {
      const g = new THREE.Group();
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3a2a1e, roughness: 0.9 });
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 2.2, 7), trunkMat);
      trunk.position.y = 1.1;
      g.add(trunk);
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x2f6b3d, roughness: 0.8, flatShading: true });
      for (let i = 0; i < 3; i++) {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(1.3 - i * 0.28, 1.7, 8), leafMat);
        cone.position.y = 2.3 + i * 1.05;
        g.add(cone);
      }
      const s = 0.8 + Math.random() * 0.5;
      g.scale.set(s, s, s);
      return g;
    }

    function makeAlien(tint: number): THREE.Group {
      const g = new THREE.Group();
      const skin = new THREE.MeshStandardMaterial({ color: tint, roughness: 0.5, emissive: tint, emissiveIntensity: 0.15 });
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 12), skin);
      body.scale.set(1, 1.3, 1); body.position.y = 1.1;
      g.add(body);
      const eyeMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, emissive: 0x0a0a0a });
      for (let i = -1; i <= 1; i += 2) {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), eyeMat);
        eye.position.set(i * 0.16, 1.35, 0.42);
        g.add(eye);
      }
      const legMat = skin;
      for (let i = -1; i <= 1; i += 2) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.7, 6), legMat);
        leg.position.set(i * 0.22, 0.35, 0);
        g.add(leg);
      }
      g.userData.bobOffset = Math.random() * Math.PI * 2;
      return g;
    }

    function makeMarkerSign(color: number): THREE.Group {
      const g = new THREE.Group();
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x1a1a20, metalness: 0.5, roughness: 0.5 });
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 3.4, 8), poleMat);
      pole.position.y = 1.7;
      g.add(pole);
      const panelMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.5, metalness: 0.3, roughness: 0.3, side: THREE.DoubleSide });
      const panel = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.8, 0.12), panelMat);
      panel.position.y = 3.6;
      g.add(panel);
      const glow = new THREE.PointLight(color, 0.8, 10, 2);
      glow.position.set(0, 3.6, 0);
      g.add(glow);
      return g;
    }

    function clearGroup(group: THREE.Group): void {
      while (group.children.length) {
        const child = group.children.pop();
        if (child) group.remove(child);
      }
    }

    let currentMarkers: MarkerInstance[] = [];
    let currentRoadLength = 0;
    let launchPadZ = 0;
    let launchPadMesh: THREE.Mesh | null = null;

    function buildGroundScene(planet: PlanetInstance): void {
      clearGroup(groundGroup);
      currentMarkers.forEach((m) => m.el.remove());
      currentMarkers = [];

      const env = planet.data;
      groundGroup.add(buildSkyDome(env.sky.top, env.sky.bottom));

      const hemi = new THREE.HemisphereLight(env.sky.top, env.ground, 0.9);
      groundGroup.add(hemi);
      const sun = new THREE.DirectionalLight(0xffffff, 1.1);
      sun.position.set(150, 200, 100);
      groundGroup.add(sun);

      const itemCount = env.items.length;
      const roadLength = ROAD_START_BUFFER + itemCount * MARKER_SPACING + ROAD_END_BUFFER;
      currentRoadLength = roadLength;
      launchPadZ = -(roadLength - 20);

      const groundMat = new THREE.MeshStandardMaterial({ color: env.ground, roughness: 0.95 });
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, roadLength + 200, 1, 1), groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.set(0, -0.02, -roadLength / 2 + 40);
      groundGroup.add(ground);

      const roadMat = new THREE.MeshStandardMaterial({ map: sharedRoadTexture, roughness: 0.7 });
      sharedRoadTexture.repeat.set(1, roadLength / 8);
      const road = new THREE.Mesh(new THREE.PlaneGeometry(ROAD_HALF_WIDTH * 2, roadLength), roadMat);
      road.rotation.x = -Math.PI / 2;
      road.position.set(0, 0.01, -roadLength / 2 + 40);
      groundGroup.add(road);

      // lamps + trees along the road
      for (let z = 0; z > -roadLength + 20; z -= 14) {
        [-1, 1].forEach((side) => {
          const lamp = makeLampPost();
          lamp.position.set(side * (ROAD_HALF_WIDTH + 1.5), 0, z);
          groundGroup.add(lamp);
        });
      }
      for (let z = -6; z > -roadLength + 10; z -= 18) {
        [-1, 1].forEach((side) => {
          const tree = makeTree();
          tree.position.set(side * (ROAD_HALF_WIDTH + 5 + Math.random() * 4), 0, z + (Math.random() - 0.5) * 6);
          groundGroup.add(tree);
        });
      }

      // aliens
      for (let i = 0; i < 5; i++) {
        const alien = makeAlien(env.alien);
        const side = Math.random() > 0.5 ? 1 : -1;
        alien.position.set(side * (ROAD_HALF_WIDTH + 2 + Math.random() * 3), 0, -Math.random() * (roadLength - 40) - 20);
        groundGroup.add(alien);
        groundGroup.userData.aliens = groundGroup.userData.aliens || [];
        groundGroup.userData.aliens.push(alien);
      }

      // markers
      let z = -ROAD_START_BUFFER;
      env.items.forEach((item, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        const sign = makeMarkerSign(env.color);
        sign.position.set(side * (ROAD_HALF_WIDTH - 1), 0, z);
        sign.rotation.y = side === -1 ? -0.5 : 0.5;
        groundGroup.add(sign);

        const el = document.createElement('div');
        el.className = 'marker-card';
        el.innerHTML = `<div class="marker-title">${item.title}</div><div class="marker-body">${item.body}</div>`;
        labelsLayer.appendChild(el);
        currentMarkers.push({ el, worldOffset: new THREE.Vector3(sign.position.x, 4.6, sign.position.z) });
        z -= MARKER_SPACING;
      });

      // launch pad
      const padMat = new THREE.MeshStandardMaterial({ color: env.color, emissive: env.color, emissiveIntensity: 0.6, metalness: 0.4, roughness: 0.3 });
      launchPadMesh = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 0.2, 32), padMat);
      launchPadMesh.position.set(0, 0.1, launchPadZ);
      groundGroup.add(launchPadMesh);
      const padLight = new THREE.PointLight(env.color, 1.6, 30, 2);
      padLight.position.set(0, 4, launchPadZ);
      groundGroup.add(padLight);

      scene.fog = new THREE.FogExp2(new THREE.Color(env.fog).getHex(), 0.006);
      scene.background = new THREE.Color(env.sky.bottom);
    }

    // ---------- car ----------
    function buildCar(): THREE.Group {
      const g = new THREE.Group();
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0xd7dde6, metalness: 0.6, roughness: 0.35 });
      const accentMat = new THREE.MeshStandardMaterial({ color: 0xff9d3d, metalness: 0.5, roughness: 0.4, emissive: 0xff9d3d, emissiveIntensity: 0.25 });
      const glassMat = new THREE.MeshStandardMaterial({ color: 0x2be8ff, metalness: 0.2, roughness: 0.1, emissive: 0x2be8ff, emissiveIntensity: 0.5 });
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111114, roughness: 0.7 });

      const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.7, 4.2), bodyMat);
      chassis.position.y = 0.6;
      g.add(chassis);

      const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.6, 2.0), glassMat);
      cabin.position.set(0, 1.15, -0.2);
      g.add(cabin);

      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.72, 4.22), accentMat);
      stripe.position.set(0, 0.6, 0);
      g.add(stripe);

      const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.36, 14);
      [[-1.1, -1.3], [1.1, -1.3], [-1.1, 1.3], [1.1, 1.3]].forEach(([x, z]) => {
        const wheel = new THREE.Mesh(wheelGeo, wheelMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(x, 0.42, z);
        g.add(wheel);
      });

      const headMat = new THREE.MeshBasicMaterial({ color: 0xfff4c2 });
      [-0.7, 0.7].forEach((x) => {
        const h = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), headMat);
        h.position.set(x, 0.7, -2.15);
        g.add(h);
      });
      const tailMat = new THREE.MeshBasicMaterial({ color: 0xff3b3b });
      [-0.7, 0.7].forEach((x) => {
        const t = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), tailMat);
        t.position.set(x, 0.7, 2.15);
        g.add(t);
      });
      const headlight = new THREE.SpotLight(0xfff4c2, 1.2, 40, 0.5, 0.5);
      headlight.position.set(0, 0.9, -2.2);
      headlight.target.position.set(0, 0, -20);
      g.add(headlight, headlight.target);

      return g;
    }
    const car = buildCar();
    car.visible = false;
    groundGroup.add(car);

    /* ============================================================
       STATE MACHINE
       ============================================================ */
    let mode: FlightMode = 'flight';
    let started = false;
    let transitionPhase: TransitionPhase = null;
    let transitionT = 0;
    let activePlanet: PlanetInstance | null = null;
    let savedFlightState = { position: new THREE.Vector3(0, 6, 40), yaw: 0 };

    // flight vars
    const keys: Record<string, boolean> = {};
    let yaw = 0, speed = 0, vSpeed = 0, bank = 0, visualPitch = 0;
    const MAX_SPEED = 90, BOOST_MULT = 1.9, ACCEL = 60, DECEL = 40, TURN_SPEED = 1.6, V_ACCEL = 40, MAX_V = 40;

    // car vars
    let carX = 0, carZ = 0, carSpeedZ = 0, carVX = 0;
    const CAR_MAX_SPEED = 46, CAR_ACCEL = 34, CAR_DECEL = 26, CAR_STRAFE_SPEED = 16;

    const cameraPos = new THREE.Vector3(0, 12, 60);
    const cameraLookTarget = new THREE.Vector3();

    let nearestPlanet: PlanetInstance | null = null;
    let atLaunchPad = false;

    function onKeyDown(e: KeyboardEvent): void {
      keys[e.code] = true;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
      if (e.code === 'Enter') handleEnter();
    }
    function onKeyUp(e: KeyboardEvent): void { keys[e.code] = false; }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    function isDown(...codes: string[]): boolean { return codes.some((c) => keys[c]); }

    function handleEnter(): void {
      if (mode === 'flight' && nearestPlanet) startLanding(nearestPlanet);
      else if (mode === 'driving' && atLaunchPad) startLaunch();
    }

    function startLanding(planet: PlanetInstance): void {
      mode = 'transition';
      transitionPhase = 'landing-out';
      transitionT = 0;
      savedFlightState.position.copy(ship.position);
      savedFlightState.yaw = yaw;
      activePlanet = planet;
    }
    function startLaunch(): void {
      mode = 'transition';
      transitionPhase = 'launch-out';
      transitionT = 0;
    }

    function completeLandingSwap(): void {
      if (!activePlanet) return;
      buildGroundScene(activePlanet);
      spaceGroup.visible = false;
      groundGroup.visible = true;
      car.visible = true;
      carX = 0; carZ = 0; carSpeedZ = 0; carVX = 0;
      cameraPos.set(0, 6, 8);
    }
    function completeLaunchSwap(): void {
      groundGroup.visible = false;
      spaceGroup.visible = true;
      const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(YAXIS, savedFlightState.yaw);
      ship.position.copy(savedFlightState.position).addScaledVector(forward, 55);
      yaw = savedFlightState.yaw;
      speed = 20;
      scene.fog = null;
      scene.background = new THREE.Color(0x02030a);
    }

    // ---------- touch controls ----------
    if ('ontouchstart' in window) {
      touchControlsRef.current!.classList.add('active');
    }
    const touchBtnCleanups = [];
    touchControlsRef.current!.querySelectorAll('.tc-btn').forEach((btnEl) => {
      const btn = btnEl as HTMLElement;
      const code = btn.dataset.key as string;
      const down = (e) => { e.preventDefault(); keys[code] = true; };
      const up = (e) => { e.preventDefault(); keys[code] = false; };
      btn.addEventListener('touchstart', down, { passive: false });
      btn.addEventListener('touchend', up, { passive: false });
      btn.addEventListener('touchcancel', up, { passive: false });
      touchBtnCleanups.push(() => { btn.removeEventListener('touchstart', down); btn.removeEventListener('touchend', up); btn.removeEventListener('touchcancel', up); });
    });
    const tcDock = touchControlsRef.current!.querySelector('#tc-dock') as HTMLButtonElement;
    const tcDockHandler = (e) => { e.preventDefault(); handleEnter(); };
    tcDock.addEventListener('touchstart', tcDockHandler, { passive: false });

    // ---------- minimap ----------
    const mmCanvas = minimapCanvasRef.current!;
    const mmCtx = mmCanvas.getContext('2d')!;
    function drawMinimap() {
      const w = mmCanvas.width, h = mmCanvas.height, r = w / 2;
      mmCtx.clearRect(0, 0, w, h);
      mmCtx.fillStyle = 'rgba(6,12,26,0.9)';
      mmCtx.beginPath(); mmCtx.arc(r, r, r, 0, Math.PI * 2); mmCtx.fill();
      mmCtx.strokeStyle = 'rgba(43,232,255,0.3)';
      mmCtx.beginPath(); mmCtx.arc(r, r, r - 1, 0, Math.PI * 2); mmCtx.stroke();

      if (mode === 'flight') {
        const scale = r / 500;
        const cosY = Math.cos(-yaw), sinY = Math.sin(-yaw);
        planets.forEach((p) => {
          const dx = p.group.position.x - ship.position.x;
          const dz = p.group.position.z - ship.position.z;
          let rx = dx * cosY - dz * sinY, rz = dx * sinY + dz * cosY;
          let mx = r + rx * scale, my = r + rz * scale;
          const dist = Math.hypot(rx, rz);
          if (dist * scale > r - 6) {
            const ang = Math.atan2(rz, rx);
            mx = r + Math.cos(ang) * (r - 6); my = r + Math.sin(ang) * (r - 6);
          }
          mmCtx.fillStyle = '#' + p.data.color.toString(16).padStart(6, '0');
          mmCtx.beginPath(); mmCtx.arc(mx, my, 4, 0, Math.PI * 2); mmCtx.fill();
        });
        mmCtx.save(); mmCtx.translate(r, r); mmCtx.fillStyle = '#ffb020';
        mmCtx.beginPath(); mmCtx.moveTo(0, -6); mmCtx.lineTo(4, 5); mmCtx.lineTo(-4, 5); mmCtx.closePath(); mmCtx.fill();
        mmCtx.restore();
      } else if (mode === 'driving') {
        // progress bar style: how far down the road
        const progress = THREE.MathUtils.clamp(-carZ / currentRoadLength, 0, 1);
        mmCtx.fillStyle = 'rgba(43,232,255,0.25)';
        mmCtx.fillRect(20, r - 3, w - 40, 6);
        mmCtx.fillStyle = '#ffb020';
        mmCtx.fillRect(20, r - 3, (w - 40) * progress, 6);
        mmCtx.fillStyle = '#dfe9f5'; mmCtx.font = '9px monospace'; mmCtx.textAlign = 'center';
        mmCtx.fillText('ROAD PROGRESS', r, r - 14);
      }
    }

    // ---------- main loop ----------
    const clock = new THREE.Clock();
    let rafId;
    function animate() {
      rafId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      planets.forEach((p, i) => {
        p.group.rotation.y += dt * (0.06 + i * 0.01);
        p.group.position.y += Math.sin(t * 0.3 + i) * 0.004;
      });
      asteroids.forEach((a) => { a.rotation.x += a.userData.spin * dt; a.rotation.y += a.userData.spin * dt * 0.7; });
      if (groundGroup.userData.aliens) {
        groundGroup.userData.aliens.forEach((a) => {
          a.position.y = Math.sin(t * 2 + a.userData.bobOffset) * 0.12 + 0.05;
          a.rotation.y += dt * 0.4;
        });
      }
      if (launchPadMesh) launchPadMesh.rotation.y += dt * 0.3;

      if (!started) { renderer.render(scene, camera); return; }

      if (mode === 'flight') {
        const turnInput = (isDown('KeyA', 'ArrowLeft') ? 1 : 0) - (isDown('KeyD', 'ArrowRight') ? 1 : 0);
        yaw += turnInput * TURN_SPEED * dt;

        const thrustInput = isDown('KeyW', 'ArrowUp') ? 1 : (isDown('KeyS', 'ArrowDown') ? -1 : 0);
        const boosting = isDown('ShiftLeft', 'ShiftRight');
        const maxSp = MAX_SPEED * (boosting ? BOOST_MULT : 1);
        if (thrustInput > 0) speed = Math.min(speed + ACCEL * dt, maxSp);
        else if (thrustInput < 0) speed = Math.max(speed - ACCEL * dt, -MAX_SPEED * 0.4);
        else speed += (0 - speed) * Math.min(DECEL * dt / Math.max(Math.abs(speed), 1), 1);

        const vInput = (isDown('KeyQ') ? 1 : 0) - (isDown('KeyE') ? 1 : 0);
        if (vInput !== 0) vSpeed = THREE.MathUtils.clamp(vSpeed + vInput * V_ACCEL * dt, -MAX_V, MAX_V);
        else vSpeed *= (1 - Math.min(1, 4 * dt));

        const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(YAXIS, yaw);
        ship.position.addScaledVector(forward, speed * dt);
        ship.position.y = THREE.MathUtils.clamp(ship.position.y + vSpeed * dt, -80, 220);

        bank += ((-turnInput * 0.55) - bank) * Math.min(1, 6 * dt);
        visualPitch += ((vSpeed / MAX_V) * 0.3 - visualPitch) * Math.min(1, 6 * dt);
        ship.rotation.set(visualPitch, yaw, bank);

        trailTimer += dt;
        if (Math.abs(speed) > 5 && trailTimer > 0.03) { trailTimer = 0; spawnTrail(); }

        let minDist = Infinity, closest = null;
        planets.forEach((p) => {
          const d = ship.position.distanceTo(p.group.position);
          if (d < minDist) { minDist = d; closest = p; }
        });
        nearestPlanet = (closest && minDist < DOCK_RADIUS) ? closest : null;
        dockPromptRef.current!.classList.toggle('show', !!nearestPlanet);
        if (nearestPlanet) dockPromptNameRef.current!.textContent = 'LAND AT ' + nearestPlanet.data.label.toUpperCase();
        hudRef.current.nearest!.textContent = closest ? `${closest.data.label} ${Math.max(0, Math.round(minDist))}m` : '—';
        hudRef.current.speed!.textContent = String(Math.round(Math.abs(speed))).padStart(3, '0');
        hudRef.current.heading!.textContent = String(Math.round(((yaw * 180 / Math.PI) % 360 + 360) % 360)).padStart(3, '0') + '°';
        hudRef.current.altitude!.textContent = String(Math.round(ship.position.y)).padStart(3, '0');
        hudRef.current.label!.textContent = 'FLIGHT DATA';

        const camOffset = forward.clone().multiplyScalar(-16).add(new THREE.Vector3(0, 6.5, 0));
        cameraPos.lerp(ship.position.clone().add(camOffset), Math.min(1, 4 * dt));
        cameraLookTarget.lerp(ship.position.clone().add(forward.clone().multiplyScalar(20)), Math.min(1, 5 * dt));
        camera.position.copy(cameraPos);
        camera.lookAt(cameraLookTarget);

        planets.forEach((p) => {
          const wp = p.group.position.clone(); wp.y += p.data.radius + 4;
          const proj = wp.clone().project(camera);
          const dist = camera.position.distanceTo(p.group.position);
          if (proj.z > 1 || dist > 1000) { p.labelEl.style.opacity = 0; return; }
          const x = (proj.x * 0.5 + 0.5) * container.clientWidth;
          const y = (-proj.y * 0.5 + 0.5) * container.clientHeight;
          p.labelEl.style.left = x + 'px'; p.labelEl.style.top = y + 'px';
          const fade = THREE.MathUtils.clamp(1 - (dist - 60) / 700, 0.12, 1);
          p.labelEl.style.opacity = fade;
          p.labelEl.querySelector('.dist').textContent = Math.round(dist) + 'm';
        });
        labelsLayer.querySelectorAll('.marker-card').forEach((el) => { el.style.opacity = 0; });
        // (no-op)
      } else if (mode === 'driving') {
        const strafeInput = (isDown('KeyD', 'ArrowRight') ? 1 : 0) - (isDown('KeyA', 'ArrowLeft') ? 1 : 0);
        carVX += (strafeInput * CAR_STRAFE_SPEED - carVX) * Math.min(1, 8 * dt);
        carX = THREE.MathUtils.clamp(carX + carVX * dt, -(ROAD_HALF_WIDTH - 1.5), ROAD_HALF_WIDTH - 1.5);

        const thrustInput = isDown('KeyW', 'ArrowUp') ? 1 : (isDown('KeyS', 'ArrowDown') ? -1 : 0);
        if (thrustInput > 0) carSpeedZ = Math.min(carSpeedZ + CAR_ACCEL * dt, CAR_MAX_SPEED);
        else if (thrustInput < 0) carSpeedZ = Math.max(carSpeedZ - CAR_ACCEL * dt, -CAR_MAX_SPEED * 0.5);
        else carSpeedZ += (0 - carSpeedZ) * Math.min(CAR_DECEL * dt / Math.max(Math.abs(carSpeedZ), 1), 1);

        carZ -= carSpeedZ * dt;
        carZ = THREE.MathUtils.clamp(carZ, -(currentRoadLength - 6), 4);

        car.position.set(carX, 0, carZ);
        car.rotation.y = -carVX * 0.03;
        car.rotation.z = -carVX * 0.015;

        atLaunchPad = Math.abs(carZ - launchPadZ) < 8;
        dockPromptRef.current!.classList.toggle('show', atLaunchPad);
        if (atLaunchPad) dockPromptNameRef.current!.textContent = 'LAUNCH BACK TO SPACE';

        hudRef.current.label!.textContent = (activePlanet ? activePlanet.data.envName : '') + ' — GROUND OPS';
        hudRef.current.speed!.textContent = String(Math.round(Math.abs(carSpeedZ))).padStart(3, '0');
        hudRef.current.heading!.textContent = '—';
        hudRef.current.altitude!.textContent = String(Math.max(0, Math.round(-carZ))) + 'm';
        hudRef.current.nearest!.textContent = atLaunchPad ? 'LAUNCH PAD' : `${Math.max(0, Math.round(launchPadZ - carZ) * -1 + Math.round(-launchPadZ))}m to pad`;

        const desiredCam = new THREE.Vector3(carX * 0.6, 3.4, carZ + 8);
        cameraPos.lerp(desiredCam, Math.min(1, 5 * dt));
        cameraLookTarget.lerp(new THREE.Vector3(carX, 1, carZ - 10), Math.min(1, 6 * dt));
        camera.position.copy(cameraPos);
        camera.lookAt(cameraLookTarget);

        currentMarkers.forEach((m) => {
          const worldPos = m.worldOffset;
          const dist = Math.hypot(worldPos.x - carX, worldPos.z - carZ);
          const proj = worldPos.clone().project(camera);
          if (proj.z > 1 || dist > 46) { m.el.style.opacity = 0; return; }
          const x = (proj.x * 0.5 + 0.5) * container.clientWidth;
          const y = (-proj.y * 0.5 + 0.5) * container.clientHeight;
          m.el.style.left = x + 'px'; m.el.style.top = y + 'px';
          const fade = THREE.MathUtils.clamp(1 - (dist - 8) / 34, 0, 1);
          m.el.style.opacity = fade;
        });
        planets.forEach((p) => { p.labelEl.style.opacity = 0; });
      } else if (mode === 'transition') {
        transitionT += dt / 0.55;
        const fadeEl = fadeRef.current;
        if (transitionPhase === 'landing-out') {
          fadeEl.style.opacity = Math.min(1, transitionT);
          if (transitionT >= 1) { completeLandingSwap(); transitionPhase = 'landing-in'; transitionT = 0; }
        } else if (transitionPhase === 'landing-in') {
          fadeEl.style.opacity = Math.max(0, 1 - transitionT);
          if (transitionT >= 1) { mode = 'driving'; transitionPhase = null; }
        } else if (transitionPhase === 'launch-out') {
          fadeEl.style.opacity = Math.min(1, transitionT);
          if (transitionT >= 1) { completeLaunchSwap(); transitionPhase = 'launch-in'; transitionT = 0; }
        } else if (transitionPhase === 'launch-in') {
          fadeEl.style.opacity = Math.max(0, 1 - transitionT);
          if (transitionT >= 1) { mode = 'flight'; transitionPhase = null; }
        }
        dockPromptRef.current!.classList.remove('show');
      }

      for (let i = trailPool.length - 1; i >= 0; i--) {
        const m = trailPool[i];
        m.userData.life += dt;
        const lifeRatio = m.userData.life / 0.9;
        if (lifeRatio >= 1) { spaceGroup.remove(m); trailPool.splice(i, 1); continue; }
        m.material.opacity = 0.7 * (1 - lifeRatio);
        const s = 1 - lifeRatio * 0.7;
        m.scale.set(s, s, s);
      }

      drawMinimap();
      sunSprite.position.copy(sunLight.position);
      renderer.render(scene, camera);
    }
    animate();

    startScreenRef.current!.querySelector('#launch-btn')!.addEventListener('click', () => {
      startScreenRef.current!.classList.add('hidden');
      started = true;
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      touchBtnCleanups.forEach((fn) => fn());
      tcDock.removeEventListener('touchstart', tcDockHandler);
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      labelsLayer.innerHTML = '';
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#020309' }}>
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.65) 100%)' }} />
      <div ref={fadeRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 45, background: '#000', opacity: 0 }} />

      <div ref={startScreenRef} id="start-screen">
        <div className="eyebrow">// Mission Briefing</div>
        <h1 className="title">DEEP&nbsp;SPACE&nbsp;PORTFOLIO</h1>
        <div className="subtitle">ALEX&nbsp;CARTER — Full-Stack Developer &amp; Systems Engineer</div>
        <button id="launch-btn">Begin Flight</button>
        <div id="start-controls">
          <span><b>W/S</b> thrust / drive</span>
          <span><b>A/D</b> turn / strafe</span>
          <span><b>Q/E</b> altitude</span>
          <span><b>Shift</b> boost</span>
          <span><b>Enter</b> land / launch</span>
        </div>
      </div>

      <div className="hud panel-frame" id="hud-top-left">
        <div className="label" ref={(el) => (hudRef.current.label = el)}>FLIGHT DATA</div>
        <div className="row"><span>SPEED</span><b ref={(el) => (hudRef.current.speed = el)}>000</b></div>
        <div className="row"><span>HEADING</span><b ref={(el) => (hudRef.current.heading = el)}>000°</b></div>
        <div className="row"><span>ALTITUDE</span><b ref={(el) => (hudRef.current.altitude = el)}>000</b></div>
        <div className="row"><span>NEAREST</span><b ref={(el) => (hudRef.current.nearest = el)}>—</b></div>
      </div>

      <div className="hud panel-frame" id="hud-top-right">
        <canvas ref={minimapCanvasRef} id="minimap-canvas" width="150" height="150" />
      </div>

      <div ref={dockPromptRef} id="dock-prompt">
        PRESS <b>ENTER</b> TO <span ref={dockPromptNameRef} id="dock-prompt-name" />
      </div>

      <div ref={controlsHintRef} className="hud panel-frame" id="controls-hint">
        <b>W/S</b> thrust/drive &nbsp; <b>A/D</b> turn/strafe &nbsp; <b>Q/E</b> altitude<br />
        <b>Shift</b> boost &nbsp; <b>Enter</b> land / launch
      </div>

      <div ref={labelsLayerRef} id="labels-layer" />

      <div ref={touchControlsRef} id="touch-controls">
        <div className="tc-group">
          <div /><button className="tc-btn" data-key="KeyQ">⤒</button><div />
          <button className="tc-btn" data-key="KeyA">◀</button>
          <button className="tc-btn" data-key="KeyW">▲</button>
          <button className="tc-btn" data-key="KeyD">▶</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
          <button id="tc-dock">ENTER</button>
          <div className="tc-group">
            <div /><button className="tc-btn" data-key="KeyE">⤓</button><div />
            <div /><button className="tc-btn" data-key="KeyS">▼</button><div />
          </div>
        </div>
      </div>

      <style>{`
        #start-screen{
          position:fixed; inset:0; z-index:50; display:flex; flex-direction:column;
          align-items:center; justify-content:center; text-align:center;
          background: radial-gradient(ellipse at 50% 40%, rgba(20,30,60,0.55), rgba(2,3,9,0.96) 70%);
          transition: opacity 0.8s ease, visibility 0.8s;
          font-family: system-ui, sans-serif; color:#dfe9f5;
        }
        #start-screen.hidden{ opacity:0; visibility:hidden; pointer-events:none; }
        .eyebrow{ font-family: ui-monospace, monospace; letter-spacing:0.4em; font-size:11px; color:#2be8ff; text-transform:uppercase; margin-bottom:18px; opacity:0.85; }
        .title{ font-size:clamp(30px,7vw,66px); font-weight:800; letter-spacing:0.02em; margin:0;
          background:linear-gradient(180deg,#fff,#2be8ff 140%); -webkit-background-clip:text; background-clip:text; color:transparent;
          text-shadow:0 0 40px rgba(43,232,255,0.25); }
        .subtitle{ margin-top:10px; font-size:clamp(13px,2vw,17px); color:#7f93ab; font-family: ui-monospace, monospace; letter-spacing:0.05em; }
        #launch-btn{ margin-top:40px; padding:15px 44px; font-family: ui-monospace, monospace; font-size:14px; letter-spacing:0.15em;
          text-transform:uppercase; color:#020309; font-weight:700; background:linear-gradient(90deg,#2be8ff,#7fffe0); border:none; cursor:pointer;
          clip-path: polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px);
          box-shadow:0 0 30px rgba(43,232,255,0.4); }
        #start-controls{ margin-top:30px; display:flex; gap:20px; font-family: ui-monospace, monospace; font-size:11px; color:#7f93ab; flex-wrap:wrap; justify-content:center; max-width:560px; }
        #start-controls b{ color:#2be8ff; }

        .hud{ position:fixed; z-index:20; font-family: ui-monospace, monospace; pointer-events:none; color:#dfe9f5; }
        .panel-frame{ background:rgba(6,12,26,0.86); border:1px solid rgba(43,232,255,0.4);
          clip-path: polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px); }
        #hud-top-left{ top:18px; left:18px; padding:12px 18px; min-width:210px; }
        #hud-top-left .row{ font-size:11px; letter-spacing:0.08em; color:#7f93ab; display:flex; justify-content:space-between; gap:16px; margin:3px 0; }
        #hud-top-left .row b{ color:#2be8ff; font-size:12px; }
        #hud-top-left .label{ font-size:10px; letter-spacing:0.25em; color:#ffb020; margin-bottom:6px; }
        #hud-top-right{ top:18px; right:18px; width:150px; height:150px; padding:8px; }
        #minimap-canvas{ width:100%; height:100%; border-radius:50%; display:block; }
        #dock-prompt{ position:fixed; bottom:120px; left:50%; transform:translateX(-50%); z-index:20; padding:10px 26px;
          font-family: ui-monospace, monospace; font-size:13px; letter-spacing:0.12em; color:#ffb020; background:rgba(6,12,26,0.86);
          border:1px solid rgba(255,176,32,0.5); clip-path: polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);
          opacity:0; transition:opacity 0.25s ease; }
        #dock-prompt.show{ opacity:1; animation: pulse 1.6s ease-in-out infinite; }
        @keyframes pulse{ 0%,100%{ box-shadow:0 0 0 rgba(255,176,32,0);} 50%{ box-shadow:0 0 22px rgba(255,176,32,0.5);} }
        #controls-hint{ bottom:18px; left:18px; padding:10px 16px; font-size:10.5px; color:#7f93ab; letter-spacing:0.05em; line-height:1.7; }
        #controls-hint b{ color:#2be8ff; }

        .planet-label{ position:fixed; z-index:15; transform:translate(-50%,-120%); pointer-events:none;
          font-family: ui-monospace, monospace; font-size:11px; letter-spacing:0.15em; text-transform:uppercase; color:#dfe9f5;
          white-space:nowrap; text-align:center; transition:opacity 0.15s linear; }
        .planet-label .name{ font-size:12px; font-weight:700; text-shadow:0 0 12px currentColor; }
        .planet-label .dist{ font-size:9.5px; color:#7f93ab; margin-top:2px; }

        .marker-card{ position:fixed; z-index:15; transform:translate(-50%,-100%); pointer-events:none;
          font-family: system-ui, sans-serif; text-align:left; max-width:230px;
          background:rgba(6,12,26,0.88); border:1px solid rgba(43,232,255,0.4); padding:10px 14px;
          clip-path: polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px);
          transition:opacity 0.2s linear; opacity:0; }
        .marker-title{ font-size:13px; font-weight:700; color:#fff; margin-bottom:4px; letter-spacing:0.02em; }
        .marker-body{ font-size:11.5px; color:#a8b7c9; line-height:1.5; }

        #touch-controls{ position:fixed; z-index:30; display:none; bottom:24px; left:0; right:0; justify-content:space-between; padding:0 20px; }
        #touch-controls.active{ display:flex; }
        .tc-group{ display:grid; grid-template-columns:repeat(3,52px); grid-template-rows:repeat(2,52px); gap:6px; }
        .tc-btn{ background:rgba(6,12,26,0.75); border:1px solid rgba(43,232,255,0.4); color:#2be8ff; font-size:18px;
          display:flex; align-items:center; justify-content:center; border-radius:8px; -webkit-tap-highlight-color:transparent; }
        .tc-btn:active{ background:rgba(43,232,255,0.25); }
        #tc-dock{ align-self:flex-end; margin-bottom:6px; padding:14px 20px; background:rgba(255,176,32,0.15);
          border:1px solid #ffb020; color:#ffb020; font-family: ui-monospace, monospace; font-size:12px; letter-spacing:0.1em; border-radius:8px; }
      `}</style>
    </div>
  );
}