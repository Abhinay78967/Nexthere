/**
 * react-native.config.js
 *
 * Tell React Native CLI to skip autolinking expo and expo-modules-core.
 * Expo SDK 52 uses its own autolinking (expo-modules-autolinking) which
 * generates ExpoModulesPackageList.java. The RN CLI autolinking would also
 * try to link expo, generating PackageList.java with the old
 * import expo.core.ExpoModulesPackage path (class no longer exists).
 */
module.exports = {
  dependencies: {
    expo: {
      platforms: {
        android: null,
        ios: null,
      },
    },
    'expo-modules-core': {
      platforms: {
        android: null,
        ios: null,
      },
    },
  },
};
