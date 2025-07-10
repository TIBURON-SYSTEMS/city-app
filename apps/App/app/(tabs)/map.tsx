import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
  TextInput,
  Keyboard,
} from "react-native";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import {
  LeafletView,
  WebviewLeafletMessage,
  LatLng,
} from "react-native-leaflet-view";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import { Bin } from "@/types/types";
import { BinCardDetails } from "@/components/map/binDetails";

const DEFAULT_LOCATION = {
  latitude: 41.3851,
  longitude: 2.1734,
};

type Marker = {
  id: string;
  position: { lat: number; lng: number };
  icon: string;
  size: number[];
  label?: string;
  type?: string;
};

export default function MapWithSearch() {
  const [webViewContent, setWebViewContent] = useState<string | null>(null);
  const [center, setCenter] = useState<LatLng>(DEFAULT_LOCATION);
  const [query, setQuery] = useState("");
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);

  const { data: bins } = useQuery({
    queryKey: ["bins"],
    queryFn: () => api.fetchAllBins(),
  });

  useEffect(() => {
    const loadHtml = async () => {
      try {
        const path = require("../../assets/leaflet.html");
        const asset = Asset.fromModule(path);
        await asset.downloadAsync();
        const htmlContent = await FileSystem.readAsStringAsync(asset.localUri!);
        setWebViewContent(htmlContent);
      } catch (error) {
        Alert.alert("Error loading HTML", JSON.stringify(error));
      }
    };
    loadHtml();
  }, []);

  useEffect(() => {
    if (!bins) return;

    const transformed = bins.map((bin: Bin, index: number) => ({
      id: bin.id ?? `bin-${index}`,
      label: bin.label,
      type: bin.type,
      position: {
        lat: Number(bin.latitude),
        lng: Number(bin.longitude),
      },
      icon: "♻️",
      size: [32, 32],
    }));

    setMarkers(transformed);
  }, [bins]);

  const handleSearch = async () => {
    if (!query) return;
    Keyboard.dismiss();

    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&limit=1`;
      const response = await fetch(url);
      const results = await response.json();

      if (results?.length) {
        const { lat, lon } = results[0];
        setCenter({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
      } else {
        Alert.alert("Location not found", "Try another city or address.");
      }
    } catch {
      Alert.alert("Error", "Failed to search for location.");
    }
  };

  const handleMessage = (msg: WebviewLeafletMessage) => {
    if (
      msg.event === "onMapMarkerClicked" &&
      msg.payload &&
      typeof msg.payload === "object"
    ) {
      const markerId = (msg.payload as any).mapMarkerID;
      const bin = bins?.find((b) => b.id === markerId);
      if (bin) {
        setSelectedBin(bin);
      }
    }
  };

  if (!webViewContent) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for a city..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        style={styles.input}
        returnKeyType="search"
      />
      <LeafletView
        source={{ html: webViewContent }}
        mapCenterPosition={{
          lat: center.latitude,
          lng: center.longitude,
        }}
        zoom={13}
        mapMarkers={markers}
        onMessageReceived={handleMessage}
      />

      {selectedBin && (
        <View style={styles.overlayCenter}>
          <BinCardDetails
            bin={selectedBin}
            onClose={() => setSelectedBin(null)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 4,
  },
  overlayCenter: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
});
