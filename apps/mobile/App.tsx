import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { THEME } from './src/constants/theme';
import { ScreenName, MobileLocationStop, MobileVehicleCategory, MobileHelperConfig, MobileBooking } from './src/types';
import { MOBILE_FLEET } from './src/constants/fleet';
import { SplashScreen } from './src/screens/SplashScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { VehicleSelectModal } from './src/screens/VehicleSelectModal';
import { HelperSelectModal } from './src/screens/HelperSelectModal';
import { CheckoutModal } from './src/screens/CheckoutModal';
import { LiveTrackingScreen } from './src/screens/LiveTrackingScreen';
import { OrderHistoryScreen } from './src/screens/OrderHistoryScreen';
import { B2BEnterpriseScreen } from './src/screens/B2BEnterpriseScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('SPLASH');

  // Booking Flow State
  const [pickup, setPickup] = useState<MobileLocationStop>({
    id: 'p-1',
    address: 'Connaught Place, Central Delhi, New Delhi',
    landmark: 'Near Inner Circle Block B',
    floor: 0,
    hasElevator: true,
    contactName: 'Rahul Sharma',
    contactPhone: '+91 98765 43210',
  });

  const [drop, setDrop] = useState<MobileLocationStop>({
    id: 'd-1',
    address: 'Sector 62, Noida, Uttar Pradesh',
    landmark: 'IT Park Tower 2',
    floor: 2,
    hasElevator: true,
    contactName: 'Amit Verma',
    contactPhone: '+91 98111 22334',
  });

  const [distanceKm, setDistanceKm] = useState<number>(18.5);
  const [selectedVehicle, setSelectedVehicle] = useState<MobileVehicleCategory>(MOBILE_FLEET[3]); // Tata Ace
  const [helperConfig, setHelperConfig] = useState<MobileHelperConfig>({
    type: 'driver_helper',
    pickupFloor: 0,
    dropFloor: 2,
    pickupElevator: true,
    dropElevator: true,
  });
  const [activeBooking, setActiveBooking] = useState<MobileBooking | null>(null);

  const handleProceedToFleet = (p: MobileLocationStop, d: MobileLocationStop, km: number) => {
    setPickup(p);
    setDrop(d);
    setDistanceKm(km);
    setCurrentScreen('SELECT_VEHICLE');
  };

  const handleSelectVehicle = (v: MobileVehicleCategory) => {
    setSelectedVehicle(v);
    setCurrentScreen('SELECT_HELPER');
  };

  const handleConfirmHelper = (h: MobileHelperConfig) => {
    setHelperConfig(h);
    setCurrentScreen('CHECKOUT');
  };

  const handleConfirmBooking = (booking: MobileBooking) => {
    setActiveBooking(booking);
    setCurrentScreen('LIVE_TRACKING');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={currentScreen === 'SPLASH' ? 'light-content' : 'dark-content'} backgroundColor={THEME.colors.primary} />
      <View style={styles.container}>
        {currentScreen === 'SPLASH' && (
          <SplashScreen onContinue={() => setCurrentScreen('LOGIN')} />
        )}

        {currentScreen === 'LOGIN' && (
          <LoginScreen
            onLoginSuccess={() => setCurrentScreen('HOME')}
            onSkip={() => setCurrentScreen('HOME')}
          />
        )}

        {currentScreen === 'HOME' && (
          <HomeScreen
            onProceedToFleet={handleProceedToFleet}
            onOpenHistory={() => setCurrentScreen('ORDER_HISTORY')}
            onOpenB2B={() => setCurrentScreen('B2B_PORTAL')}
          />
        )}

        {currentScreen === 'SELECT_VEHICLE' && (
          <VehicleSelectModal
            distanceKm={distanceKm}
            onSelectVehicle={handleSelectVehicle}
            onBack={() => setCurrentScreen('HOME')}
          />
        )}

        {currentScreen === 'SELECT_HELPER' && (
          <HelperSelectModal
            vehicle={selectedVehicle}
            onConfirmHelper={handleConfirmHelper}
            onBack={() => setCurrentScreen('SELECT_VEHICLE')}
          />
        )}

        {currentScreen === 'CHECKOUT' && (
          <CheckoutModal
            vehicle={selectedVehicle}
            pickup={pickup}
            drop={drop}
            distanceKm={distanceKm}
            helperConfig={helperConfig}
            onConfirmBooking={handleConfirmBooking}
            onBack={() => setCurrentScreen('SELECT_HELPER')}
          />
        )}

        {currentScreen === 'LIVE_TRACKING' && activeBooking && (
          <LiveTrackingScreen
            booking={activeBooking}
            onDone={() => setCurrentScreen('HOME')}
          />
        )}

        {currentScreen === 'ORDER_HISTORY' && (
          <OrderHistoryScreen onBack={() => setCurrentScreen('HOME')} />
        )}

        {currentScreen === 'B2B_PORTAL' && (
          <B2BEnterpriseScreen onBack={() => setCurrentScreen('HOME')} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
});
