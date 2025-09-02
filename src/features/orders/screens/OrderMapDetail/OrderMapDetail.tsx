import { NotificationModal } from "@/features/notifications/screens/NotificationModal";
import { CustomIconComponent } from "@/shared/assets/icons/settings/CustomIconComponent";
import { BurgerMenuComponent, CustomHeaderComponent, SafeAreaScreenComponent } from "@/shared/components";
import { Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import { useEffect, useState } from "react";
import { Dimensions, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { selectTypes } from "../../constants/index";

// Ваш Google Maps API ключ из app.json
const GOOGLE_MAPS_APIKEY = 'AIzaSyAJFy-nMsR_hHhhiMNXYq_-mLjpWlYWbBc';

interface OrderMapDetailProps {
    orderId: string;
}

interface LocationCoords {
    latitude: number;
    longitude: number;
}

const OrderMapDetail = ({ orderId }: OrderMapDetailProps) => {
    const mockData = {
        from: "Моё местоположение",
        to: "улица Ахунбаев, 28",
        onCar: "11 мин",
        onFoot: "11 мин",
        onBicycle: "11 мин",
        onVehicle: "37 мин",
    };

    const [showNotifications, setShowNotifications] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<LocationCoords | null>(null);
    const [destinationLocation] = useState<LocationCoords>({
        // Координаты для улица Ахунбаев, 28 (примерные координаты для Бишкека)
        latitude: 42.8746,
        longitude: 74.5698,
    });
    const [routeCoordinates, setRouteCoordinates] = useState<LocationCoords[]>([]);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setCurrentLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        } catch (error) {
            console.error('Error getting location:', error);
        }
    };

    const getMapRegion = () => {
        if (!currentLocation) {
            return {
                latitude: destinationLocation.latitude,
                longitude: destinationLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };
        }

        // Вычисляем центр между текущим местоположением и пунктом назначения
        const centerLatitude = (currentLocation.latitude + destinationLocation.latitude) / 2;
        const centerLongitude = (currentLocation.longitude + destinationLocation.longitude) / 2;

        // Вычисляем дельты для отображения обеих точек
        const latitudeDelta = Math.abs(currentLocation.latitude - destinationLocation.latitude) * 1.5;
        const longitudeDelta = Math.abs(currentLocation.longitude - destinationLocation.longitude) * 1.5;

        return {
            latitude: centerLatitude,
            longitude: centerLongitude,
            latitudeDelta: Math.max(latitudeDelta, 0.01),
            longitudeDelta: Math.max(longitudeDelta, 0.01),
        };
    };

    const onDirectionsReady = (result: any) => {
        console.log(`Distance: ${result.distance} km`);
        console.log(`Duration: ${result.duration} min.`);

        // Сохраняем координаты маршрута
        setRouteCoordinates(result.coordinates);
    };

    const onDirectionsError = (errorMessage: string) => {
        console.log('GOT AN ERROR: ', errorMessage);
    };

    const openInGoogleMaps = () => {
        if (!currentLocation || !destinationLocation) {
            console.log('Location data not available');
            return;
        }

        const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
        const destination = `${destinationLocation.latitude},${destinationLocation.longitude}`;

        let url = '';

        if (Platform.OS === 'ios') {
            // Пробуем сначала открыть Google Maps, если не получится - откроется Apple Maps
            url = `comgooglemaps://?saddr=${origin}&daddr=${destination}&directionsmode=driving`;

            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    // Fallback к Apple Maps
                    const appleMapsUrl = `http://maps.apple.com/?saddr=${origin}&daddr=${destination}&dirflg=d`;
                    Linking.openURL(appleMapsUrl);
                }
            });
        } else {
            // Android - открываем Google Maps напрямую
            url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
            Linking.openURL(url);
        }
    };

    return (
        <SafeAreaScreenComponent backgroundColor="white">
            {/* Header */}
            <CustomHeaderComponent
                onNotificationPress={() => setShowNotifications(true)}
                onMenuPress={() => setShowMenu(!showMenu)}
            />

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                {/* Route Information Block */}
                <View style={styles.routeContainer}>
                    {/* Route Info */}
                    <View style={styles.routeInfo}>
                        <Text style={styles.routeFromText}>Откуда: {mockData.from}</Text>
                        <Text style={styles.routeToText}>Куда: {mockData.to}</Text>
                    </View>

                    {/* Transport Options */}
                    <View style={styles.transportContainer}>
                        {selectTypes.map((item) => (
                            <View key={item.type} style={styles.transportItem}>
                                <CustomIconComponent
                                    name={item.type}
                                    size={28}
                                    color="#333"
                                />
                                <Text style={styles.timeText}>
                                    {mockData[item.type as keyof typeof mockData]}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Map Container */}
                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={getMapRegion()}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        showsTraffic={true}
                        loadingEnabled={true}
                    >
                        {/* Маркер текущего местоположения */}
                        {currentLocation && (
                            <Marker
                                coordinate={currentLocation}
                                title="Моё местоположение"
                                description="Точка отправления"
                                pinColor="blue"
                            />
                        )}

                        {/* Маркер пункта назначения */}
                        <Marker
                            coordinate={destinationLocation}
                            title="Пункт назначения"
                            description={mockData.to}
                            pinColor="red"
                        />

                        {/* Направления маршрута */}
                        {currentLocation && (
                            <MapViewDirections
                                origin={currentLocation}
                                destination={destinationLocation}
                                apikey={GOOGLE_MAPS_APIKEY}
                                strokeWidth={4}
                                strokeColor="#4285F4"
                                optimizeWaypoints={true}
                                onStart={(params) => {
                                    console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                                }}
                                onReady={onDirectionsReady}
                                onError={onDirectionsError}
                                mode="DRIVING" // DRIVING, BICYCLING, TRANSIT, WALKING
                                language="ru"
                                resetOnChange={false}
                                timePrecision="now"
                                precision="high"
                            />
                        )}

                        {/* Резервный Polyline если MapViewDirections не работает */}
                        {routeCoordinates.length > 0 && (
                            <Polyline
                                coordinates={routeCoordinates}
                                strokeColor="#4285F4"
                                strokeWidth={4}
                                strokeColors={[
                                    '#6366f1',
                                ]}
                            />
                        )}
                    </MapView>
                </View>

                {/* Route Distance and Duration */}
                <View style={[styles.routeInfo, { flexDirection: 'column', alignItems: "flex-start", paddingLeft: 16, borderBottomWidth: 0, paddingBottom: 0 }]}>
                    <Text style={styles.routeToText}>2,3 км</Text>
                    <Text style={styles.routeFromText}>13 мин</Text>
                </View>

                {/* Buttons Container */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[styles.button, { borderColor: '#6366f1', backgroundColor: 'transparent', borderWidth: 1 }]}
                        onPress={openInGoogleMaps}
                    >
                        <Ionicons name="map" size={18} color="#6366f1" />
                        <Text style={[styles.buttonText, { color: '#6366f1' }]}>
                            Посмотреть маршрут
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>
                            Начать
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Burger Menu */}
            <BurgerMenuComponent
                isVisible={showMenu}
                onClose={() => setShowMenu(false)}
            />

            {/* Notification Modal */}
            <NotificationModal
                visible={showNotifications}
                onClose={() => setShowNotifications(false)}
            />
        </SafeAreaScreenComponent>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    mapContainer: {
        marginHorizontal: 16,
        marginVertical: 10,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    map: {
        width: '100%',
        height: height * 0.35, // Увеличено с 0.4 до 0.55 (55% высоты экрана)
    },
    routeContainer: {
        borderRadius: 12,
        padding: 16,
        paddingHorizontal: 20,
    },
    routeInfo: {
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
    },
    routeFromText: {
        fontSize: 16,
        color: '#6c757d',
        marginBottom: 4,
    },
    routeToText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212529',
        textAlign: 'center',
    },
    transportContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    transportItem: {
        alignItems: 'center',
        padding: 8,
    },
    timeText: {
        fontSize: 12,
        color: '#6c757d',
        marginTop: 6,
        textAlign: 'center',
        fontWeight: '500',
    },
    buttonsContainer: {
        flexDirection: 'column',
        gap: 10,
        marginHorizontal: 16,
        marginTop: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
        backgroundColor: '#6366f1',
        padding: 15,
        borderRadius: 100,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default OrderMapDetail;