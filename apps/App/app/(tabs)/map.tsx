import React, { useEffect, useRef, useState } from "react";
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
import { LeafletView, LatLng } from "react-native-leaflet-view";

const DEFAULT_LOCATION = {
  latitude: -23.5489,
  longitude: -46.6388,
};

export default function MapWithSearch() {
  const [webViewContent, setWebViewContent] = useState<string | null>(null);
  const [center, setCenter] = useState<LatLng>(DEFAULT_LOCATION);
  const [query, setQuery] = useState("");
  const leafletRef = useRef<any>(null);

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
        const newPos = {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        };
        setCenter(newPos);
      } else {
        Alert.alert("Location not found", "Try another city or address.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to search for location.");
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
        zoom={12}
      />
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
});
