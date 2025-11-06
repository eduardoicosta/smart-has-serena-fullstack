import { GOOGLE_MAPS_API_KEY } from '@env';
import { Feather } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#48466D', white: '#FFFFFF', lightGray: '#F5F5F5',
  text: '#333333', border: '#EAEAEA',
};

const ProfessionalsMapScreen = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);

  const [region, setRegion] = useState({
    latitude: -23.550520,
    longitude: -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const fetchProfessionals = async (latitude, longitude) => {
    setLoading(true);
    setMarkers([]);

    const radius = 5000;
    const searchKeyword = encodeURIComponent("psicólogo"); 
    
    // atualizar
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=${searchKeyword}&key=${GOOGLE_MAPS_API_KEY}`;
    
    try {
      const placesResponse = await fetch(placesUrl);
      const placesJson = await placesResponse.json();

      if (placesJson.status === 'OK' && placesJson.results.length > 0) {
        const newMarkers = placesJson.results.map(place => ({
          latlng: {
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          },
          title: place.name,
          description: place.vicinity,
        }));
        setMarkers(newMarkers);
      } else {
        Alert.alert("Nenhum profissional encontrado", "Não encontramos psicólogos nesta área com os termos atuais.");
      }
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
      Alert.alert('Erro na Busca', 'Ocorreu um problema ao buscar por profissionais.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessionals(region.latitude, region.longitude);
  }, []);

  const handleSearch = async () => {
    Keyboard.dismiss();
    if (city.trim() === '') {
      Alert.alert('Atenção', 'Por favor, digite o nome de uma cidade.');
      return;
    }
    
    setLoading(true);
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
      const response = await fetch(geocodingUrl);
      const json = await response.json();

      if (json.status === 'OK' && json.results.length > 0) {
        const location = json.results[0].geometry.location;
        const newRegion = {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        };
        mapRef.current.animateToRegion(newRegion, 1000);
        await fetchProfessionals(location.lat, location.lng);
      } else {
        Alert.alert('Cidade não encontrada', 'Verifique o nome e tente novamente.');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro na Busca', 'Ocorreu um problema ao se comunicar com a API.');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={26} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mapa de Profissionais</Text>
        <View style={{ width: 26 }} />
      </View>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua cidade"
            placeholderTextColor={COLORS.text}
            value={city}
            onChangeText={setCity}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={loading}>
            {loading ? <ActivityIndicator size="small" color={COLORS.white} /> : <Feather name="search" size={20} color={COLORS.white} />}
          </TouchableOpacity>
        </View>

        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        {loading && <ActivityIndicator size="large" color={COLORS.primary} style={styles.loadingIndicator} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.lightGray, },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 12, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border, },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, },
  container: { flex: 1, },
  searchContainer: { flexDirection: 'row', padding: 10, backgroundColor: COLORS.white, },
  input: { flex: 1, height: 50, borderRadius: 8, backgroundColor: COLORS.lightGray, paddingHorizontal: 15, fontSize: 16, borderWidth: 1, borderColor: COLORS.border, },
  searchButton: { width: 50, height: 50, borderRadius: 8, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginLeft: 10, },
  map: { flex: 1, },
  loadingIndicator: { position: 'absolute', top: '50%', left: '50%'},
});


export default ProfessionalsMapScreen;