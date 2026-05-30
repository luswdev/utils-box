function isStandalonePWA () {
  return typeof window !== 'undefined' &&

    // matchMedia()
    (window?.matchMedia('(display-mode: standalone)').matches ||

      // iOS
      // @ts-ignore
      window.navigator?.standalone ||

      // Android
      document.referrer.startsWith('android-app://') ||

      // Windows
      // @ts-ignore
      window?.Windows ||
      /trident.+(msapphost|webview)\//i.test(navigator.userAgent) ||
      document.referrer.startsWith('app-info://platform/microsoft-store'));
}

const IS_PWA = isStandalonePWA()
