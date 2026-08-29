/**
 * react-native.config.js
 *
 * Tell React Native CLI to skip autolinking the expo package.
 * Expo SDK 52 uses its own autolinking (expo-modules-autolinking) which
 * generates ExpoModulesPackageList.java. Without this, the RN CLI autolinking
 * would also try to link expo, generating PackageList.java with the old
 * import expo.core.ExpoModulesPackage path (class that no longer exists).
 */
module.exports = {
  dependencies: {
    expo: {
      platforms: {
        android: null,
        ios: null,
      },
    },
  },
};
