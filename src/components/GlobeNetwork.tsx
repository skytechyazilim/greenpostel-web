"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import * as THREE from "three";

type City = {
  name: string;
  countryKey: string;
  lat: number;
  lon: number;
  hub?: boolean;
};

// City names are proper nouns and stay constant; country labels are localized
// through the `countries` message namespace via `countryKey`.
const CITIES: City[] = [
  // Türkiye
  { name: "İstanbul", countryKey: "tr", lat: 41.0082, lon: 28.9784 },
  { name: "Ankara", countryKey: "tr", lat: 39.9334, lon: 32.8597 },
  { name: "İzmir", countryKey: "tr", lat: 38.4237, lon: 27.1428 },
  // Europe
  { name: "London", countryKey: "gb", lat: 51.5074, lon: -0.1278 },
  { name: "Paris", countryKey: "fr", lat: 48.8566, lon: 2.3522 },
  { name: "Berlin", countryKey: "de", lat: 52.52, lon: 13.405, hub: true },
  { name: "Madrid", countryKey: "es", lat: 40.4168, lon: -3.7038 },
  { name: "Rome", countryKey: "it", lat: 41.9028, lon: 12.4964 },
  { name: "Amsterdam", countryKey: "nl", lat: 52.3676, lon: 4.9041 },
  { name: "Moscow", countryKey: "ru", lat: 55.7558, lon: 37.6173 },
  // Middle East & Africa
  { name: "Dubai", countryKey: "ae", lat: 25.2048, lon: 55.2708 },
  { name: "Riyadh", countryKey: "sa", lat: 24.7136, lon: 46.6753 },
  { name: "Cairo", countryKey: "eg", lat: 30.0444, lon: 31.2357 },
  { name: "Lagos", countryKey: "ng", lat: 6.5244, lon: 3.3792 },
  { name: "Johannesburg", countryKey: "za", lat: -26.2041, lon: 28.0473 },
  { name: "Nairobi", countryKey: "ke", lat: -1.2921, lon: 36.8219 },
  // Asia
  { name: "Tokyo", countryKey: "jp", lat: 35.6762, lon: 139.6503 },
  { name: "Beijing", countryKey: "cn", lat: 39.9042, lon: 116.4074 },
  { name: "Shanghai", countryKey: "cn", lat: 31.2304, lon: 121.4737 },
  { name: "Seoul", countryKey: "kr", lat: 37.5665, lon: 126.978 },
  { name: "Singapore", countryKey: "sg", lat: 1.3521, lon: 103.8198 },
  { name: "Mumbai", countryKey: "in", lat: 19.076, lon: 72.8777 },
  { name: "Delhi", countryKey: "in", lat: 28.6139, lon: 77.209 },
  { name: "Bangkok", countryKey: "th", lat: 13.7563, lon: 100.5018 },
  { name: "Hong Kong", countryKey: "hk", lat: 22.3193, lon: 114.1694 },
  // Americas
  { name: "New York", countryKey: "us", lat: 40.7128, lon: -74.006 },
  { name: "Los Angeles", countryKey: "us", lat: 34.0522, lon: -118.2437 },
  { name: "Toronto", countryKey: "ca", lat: 43.6532, lon: -79.3832 },
  { name: "Mexico City", countryKey: "mx", lat: 19.4326, lon: -99.1332 },
  { name: "São Paulo", countryKey: "br", lat: -23.5505, lon: -46.6333 },
  { name: "Buenos Aires", countryKey: "ar", lat: -34.6037, lon: -58.3816 },
  // Oceania
  { name: "Sydney", countryKey: "au", lat: -33.8688, lon: 151.2093 }
];

const R = 1.6;
const GREEN = 0x32d583; // leaf-400

function latLon(lat: number, lon: number, r: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const x = c.getContext("2d")!;
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(50,213,131,1)");
  g.addColorStop(0.4, "rgba(50,213,131,.45)");
  g.addColorStop(1, "rgba(50,213,131,0)");
  x.fillStyle = g;
  x.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

type MarkerData = {
  city: City;
  ring: THREE.Mesh;
  glow: THREE.Sprite;
  core: THREE.Mesh;
  hit: THREE.Mesh;
  seed: number;
};

export function GlobeNetwork() {
  const t = useTranslations("globe");
  const tc = useTranslations("countries");
  const mountRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // Marker group currently selected — read every frame to reposition the card.
  const activeMarkerRef = useRef<THREE.Object3D | null>(null);
  const [active, setActive] = useState<City | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const host = mountRef.current;
    const card = cardRef.current;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = host.clientWidth;
    let height = host.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    // pulled back so the full globe + atmosphere stay inside the frame
    camera.position.set(0, 0.25, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "none";

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0x9affd0, 1.1);
    key.position.set(3, 2, 4);
    scene.add(key);

    const globe = new THREE.Group();
    globe.rotation.x = 0.34;
    scene.add(globe);

    // Earth — served from /public, no external CDN.
    const earthMat = new THREE.MeshPhongMaterial({
      color: 0x123a28,
      specular: 0x0c3b27,
      shininess: 14,
      transparent: true,
      opacity: 1
    });
    const earthTex = new THREE.TextureLoader().load(
      "/textures/earth-dark.jpg",
      (tex) => {
        earthMat.map = tex;
        earthMat.color.set(0x52b487);
        earthMat.needsUpdate = true;
      }
    );
    const earthGeo = new THREE.SphereGeometry(R, 64, 64);
    globe.add(new THREE.Mesh(earthGeo, earthMat));

    // Faint graticule.
    const graticuleGeo = new THREE.WireframeGeometry(
      new THREE.SphereGeometry(R * 1.003, 36, 18)
    );
    const graticuleMat = new THREE.LineBasicMaterial({
      color: 0x2ec27e,
      transparent: true,
      opacity: 0.07
    });
    globe.add(new THREE.LineSegments(graticuleGeo, graticuleMat));

    // Atmosphere.
    const atmoGeo = new THREE.SphereGeometry(R * 1.18, 64, 64);
    const atmoMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      uniforms: { c: { value: new THREE.Color(GREEN) } },
      vertexShader: `varying vec3 vN; void main(){ vN=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader: `varying vec3 vN; uniform vec3 c; void main(){ float i=pow(0.62-dot(vN,vec3(0,0,1.0)),3.0); gl_FragColor=vec4(c,1.0)*i;}`
    });
    globe.add(new THREE.Mesh(atmoGeo, atmoMat));

    const glowTex = makeGlowTexture();

    // Markers.
    const markers: THREE.Group[] = [];
    const disposables: Array<{ dispose: () => void }> = [
      earthGeo,
      earthMat,
      earthTex,
      graticuleGeo,
      graticuleMat,
      atmoGeo,
      atmoMat,
      glowTex
    ];

    CITIES.forEach((ci) => {
      const pos = latLon(ci.lat, ci.lon, R * 1.01);
      const g = new THREE.Group();
      g.position.copy(pos);
      g.lookAt(pos.clone().multiplyScalar(2));

      const coreGeo = new THREE.SphereGeometry(0.028, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({ color: GREEN });
      const core = new THREE.Mesh(coreGeo, coreMat);
      g.add(core);

      const glowMat = new THREE.SpriteMaterial({
        map: glowTex,
        color: GREEN,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const glow = new THREE.Sprite(glowMat);
      glow.scale.set(0.22, 0.22, 0.22);
      g.add(glow);

      const ringGeo = new THREE.RingGeometry(0.04, 0.05, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: GREEN,
        transparent: true,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      g.add(ring);

      const hitGeo = new THREE.SphereGeometry(0.09, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hit = new THREE.Mesh(hitGeo, hitMat);
      g.add(hit);

      const data: MarkerData = {
        city: ci,
        ring,
        glow,
        core,
        hit,
        seed: ci.lat + ci.lon // deterministic, avoids Math.random hydration drift
      };
      g.userData = data;
      markers.push(g);
      globe.add(g);
      disposables.push(
        coreGeo,
        coreMat,
        glowMat,
        ringGeo,
        ringMat,
        hitGeo,
        hitMat
      );
    });

    // Delivery arcs — İstanbul global hub to every city.
    const hub = CITIES.find((c) => c.hub) || CITIES[0];
    CITIES.filter((c) => c !== hub).forEach((ci) => {
      const a = latLon(hub.lat, hub.lon, R * 1.01);
      const b = latLon(ci.lat, ci.lon, R * 1.01);
      const mid = a
        .clone()
        .add(b)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(R * 1.01 + a.distanceTo(b) * 0.42);
      const pts = new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(50);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const arcMat = new THREE.LineBasicMaterial({
        color: GREEN,
        transparent: true,
        opacity: 0.16
      });
      globe.add(new THREE.Line(arcGeo, arcMat));
      disposables.push(arcGeo, arcMat);
    });

    // ---- interaction ----
    const ray = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let lastY = 0;
    let velX = reduceMotion ? 0 : 0.0016;
    const autoVel = reduceMotion ? 0 : 0.0016;

    const tmp = new THREE.Vector3();

    function placeCard() {
      const marker = activeMarkerRef.current;
      if (!marker || !card) return;
      const v = marker.getWorldPosition(tmp).clone().project(camera);
      card.style.left = `${(v.x * 0.5 + 0.5) * width}px`;
      card.style.top = `${(-v.y * 0.5 + 0.5) * height}px`;
      const wp = marker.getWorldPosition(new THREE.Vector3());
      const toCam = camera.position.clone().sub(wp).normalize();
      const nrm = wp.clone().normalize();
      card.style.opacity = nrm.dot(toCam) < -0.15 ? "0" : "1";
    }

    function pointFromEvent(e: PointerEvent) {
      const rect = host.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    function selectAt(e: PointerEvent) {
      pointFromEvent(e);
      ray.setFromCamera(mouse, camera);
      const hits = ray.intersectObjects(
        markers.map((m) => (m.userData as MarkerData).hit)
      );
      if (hits.length) {
        const found = markers.find(
          (m) => (m.userData as MarkerData).hit === hits[0].object
        );
        if (found) {
          activeMarkerRef.current = found;
          setActive((found.userData as MarkerData).city);
          placeCard();
        }
      } else {
        activeMarkerRef.current = null;
        setActive(null);
      }
    }

    function onPointerDown(e: PointerEvent) {
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      host.classList.add("cursor-grabbing");
      host.setPointerCapture?.(e.pointerId);
    }
    function onPointerMove(e: PointerEvent) {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      moved += Math.abs(dx) + Math.abs(dy);
      globe.rotation.y += dx * 0.005;
      globe.rotation.x = Math.max(
        -1.1,
        Math.min(1.1, globe.rotation.x + dy * 0.005)
      );
      velX = dx * 0.005 * 0.2;
      lastX = e.clientX;
      lastY = e.clientY;
      if (activeMarkerRef.current) placeCard();
    }
    function onPointerUp(e: PointerEvent) {
      host.classList.remove("cursor-grabbing");
      if (dragging && moved < 6) selectAt(e);
      dragging = false;
    }

    host.addEventListener("pointerdown", onPointerDown);
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerup", onPointerUp);
    host.addEventListener("pointercancel", onPointerUp);

    // ---- animation ----
    let raf = 0;
    let clock = 0;
    function animate() {
      raf = requestAnimationFrame(animate);
      clock += 0.016;
      if (!dragging) {
        globe.rotation.y += velX;
        velX += (autoVel - velX) * 0.02;
      }
      markers.forEach((m) => {
        const u = m.userData as MarkerData;
        const ph = clock + u.seed;
        const s = 1 + Math.sin(ph * 2) * 0.12;
        u.core.scale.setScalar(s);
        (u.glow.material as THREE.SpriteMaterial).opacity =
          0.6 + Math.sin(ph * 2) * 0.3;
        const k = (ph % 2) / 2;
        u.ring.scale.setScalar(1 + k * 2.6);
        (u.ring.material as THREE.MeshBasicMaterial).opacity = 0.7 * (1 - k);
      });
      if (activeMarkerRef.current) placeCard();
      renderer.render(scene, camera);
    }
    animate();

    // ---- resize ----
    const ro = new ResizeObserver(() => {
      width = host.clientWidth;
      height = host.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    ro.observe(host);

    // ---- cleanup ----
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointerdown", onPointerDown);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerup", onPointerUp);
      host.removeEventListener("pointercancel", onPointerUp);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
      activeMarkerRef.current = null;
    };
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[820px]">
      {/* radial green stage behind the canvas */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem]"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(6,22,14,0.9) 0%, rgba(1,8,6,0) 70%)"
        }}
      />
      <div
        ref={mountRef}
        className="absolute inset-0 cursor-grab touch-none select-none"
        aria-label={t("title")}
        role="img"
      />

      {/* City card overlay — content from React state, position set imperatively */}
      <div
        ref={cardRef}
        className="pointer-events-none absolute left-0 top-0 z-20 w-[232px] -translate-x-1/2 -translate-y-[118%]"
        style={{ opacity: 0, transition: "opacity .28s ease" }}
        hidden={!active}
      >
        <div className="relative rounded-[18px] border border-leaf-400/30 bg-gradient-to-br from-[#0d261a]/95 to-[#06140d]/95 p-[18px] shadow-[0_18px_50px_rgba(0,0,0,.55)] backdrop-blur-md">
          <div className="mb-3 flex items-center gap-3">
            <div className="grid h-10 w-10 flex-none place-items-center overflow-hidden rounded-[11px] border border-leaf-400/20 bg-white/[0.06]">
              <Image
                src="/logo.png"
                alt="GreenPostel"
                width={40}
                height={40}
                className="h-full w-full object-contain p-[5px]"
              />
            </div>
            <div className="leading-tight">
              <div className="text-[17px] font-extrabold tracking-tight text-white">
                GreenPostel
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-leaf-300">
                {t("tag")}
              </div>
            </div>
          </div>
          <div className="mb-3 h-px bg-gradient-to-r from-transparent via-leaf-400/30 to-transparent" />
          <div className="mb-0.5 text-[15px] font-bold text-[#e8f4ec]">
            {active?.name}
          </div>
          <div className="mb-3 text-[12.5px] text-[#7fa692]">
            {active ? tc(active.countryKey) : ""}
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-leaf-400/25 bg-leaf-400/10 px-3 py-1.5 text-[11px] font-semibold text-leaf-300">
            <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-leaf-400 shadow-[0_0_8px_#32d583]" />
            {active?.hub ? t("hubBadge") : t("badge")}
          </span>
          {/* pointer */}
          <span className="absolute bottom-[-9px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-leaf-400/30 bg-[#06140d]/95" />
        </div>
      </div>
    </div>
  );
}
