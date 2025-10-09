import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { divIcon, type LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import type { Bin } from "@/types/types";
import BinCardDetails from "./BinCardDetails";

const DEFAULT_CENTER: LatLngExpression = [41.3851, 2.1734]; // Barcelona
const DEFAULT_ZOOM = 13;

type MarkerVM = {
  id: string;
  position: LatLngExpression;
  icon: L.DivIcon;
  label?: string;
  type?: string;
};

function CenterUpdater({ center }: { center: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function Map() {
  const [center, setCenter] = useState<LatLngExpression>(DEFAULT_CENTER);
  const [query, setQuery] = useState("");
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);

  const { data: bins } = useQuery({
    queryKey: ["bins"],
    queryFn: () => api.fetchAllBins(),
  });

  const markers: MarkerVM[] = useMemo(() => {
    if (!bins) return [];
    const iconHtml = `
      <div style="
        background-color:#FFFF;
        border-radius:50%;
        width:44px;height:44px;
        display:flex;justify-content:center;align-items:center;
        border:1px solid #616161;
        box-shadow:0 2px 4px rgba(0,0,0,0.4);
        font-size:22px;
      ">
        ♻️
      </div>
    `;
    const icon = divIcon({
      html: iconHtml,
      className: "", // 去掉默认类，避免多余样式
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    });

    return bins.map((bin: Bin, idx: number) => ({
      id: bin.id ?? `bin-${idx}`,
      label: bin.label,
      type: bin.type,
      position: [Number(bin.latitude), Number(bin.longitude)],
      icon,
    }));
  }, [bins]);

  const searchingRef = useRef(false);

  async function handleSearch() {
    if (!query || searchingRef.current) return;
    searchingRef.current = true;
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&limit=1`;
      const res = await fetch(url, {
        headers: {
          // 尽量友好一些（许多部署环境也能正常通过）
          Accept: "application/json",
        },
      });
      const results = await res.json();
      if (Array.isArray(results) && results.length) {
        const { lat, lon } = results[0];
        setCenter([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Location not found, try another city or address.");
      }
    } catch {
      alert("Failed to search for location.");
    } finally {
      searchingRef.current = false;
    }
  }

  return (
    <div className="relative pt-5">
      {/* 搜索输入框 */}
      <div className="absolute z-[1000] left-1/2 -translate-x-1/2 top-8 flex gap-2 w-[min(360px,100vw)]">
        <input
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="flex-1 bg-white rounded-md px-3 py-2 shadow border border-gray-300 outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded-md shadow border border-gray-300 bg-white hover:bg-gray-50 active:scale-[.98]"
        >
          Search
        </button>
      </div>

      <MapContainer
        center={center}
        zoom={DEFAULT_ZOOM}
        style={{ height: "75vh", width: "100%" }}
      >
        <CenterUpdater center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((m) => (
          <Marker
            key={m.id}
            position={m.position}
            icon={m.icon}
            eventHandlers={{
              click: () => {
                const bin = bins?.find((b: Bin) => (b.id ?? "") === m.id);
                if (bin) setSelectedBin(bin);
              },
            }}
          >
            {/* 可保留简易 Popup，便于桌面端 hover/click 预览 */}
            <Popup>
              <div className="text-sm">
                <div className="font-medium">{m.label ?? "Bin"}</div>
                <div className="text-gray-600">Type: {m.type ?? "-"}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* 居中覆盖层显示 Bin 详情 */}
      {selectedBin && (
        <div className="absolute inset-0 z-[1100] grid place-items-center">
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setSelectedBin(null)}
          />
          <div className="relative z-[1200]">
            <BinCardDetails
              bin={selectedBin}
              onClose={() => setSelectedBin(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
