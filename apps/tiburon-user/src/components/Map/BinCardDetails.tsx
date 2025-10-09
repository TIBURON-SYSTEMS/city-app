import type { Bin } from "@/types/types";

interface BinCardDetailsProps {
  bin: Bin;
  onClose: () => void;
}

export default function BinCardDetails({ bin, onClose }: BinCardDetailsProps) {
  const handleOpenMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${bin.latitude},${bin.longitude}`;
    // 在新标签打开，避免阻断当前页面
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 w-[280px] overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={bin.label ?? "Bin details"}
    >
      {/* Header with close button */}
      <div className="bg-primary-500 px-4 py-3 flex items-center">
        <div className="text-white font-bold text-lg truncate flex-1">
          {bin.label}
        </div>
        <button
          onClick={onClose}
          className="ml-2 w-8 h-8 rounded-full bg-white/20 grid place-items-center"
          aria-label="Close"
          title="Close"
        >
          <span className="text-white text-lg">✕</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Bin Type */}
        <div className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-primary-500 mr-3" />
          <span className="text-gray-600 text-sm">Type:</span>
          <span className="text-gray-900 font-medium ml-2 capitalize">
            {bin.type}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-gray-400 mr-3" />
          <span className="text-gray-600 text-sm">Location:</span>
          <span className="text-gray-900 font-mono text-xs ml-2 truncate">
            {Number(bin.latitude).toFixed(4)},{Number(bin.longitude).toFixed(4)}
          </span>
        </div>

        {/* Directions Button */}
        <button
          onClick={handleOpenMaps}
          className="bg-blue-500 rounded-lg py-3 px-4 flex items-center justify-center mt-4 active:scale-[.99] hover:bg-blue-600 text-white font-semibold"
        >
          <span className="mr-2">Get Directions</span>
          <span>🧭</span>
        </button>
      </div>
    </div>
  );
}
