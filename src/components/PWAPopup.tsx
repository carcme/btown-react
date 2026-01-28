import { useEffect, useState } from "react";
import { usePWA } from "@/lib/usePWA";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export function PWAPopup() {
  const { installPrompt, handleInstall } = usePWA();
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    if (!dismissed) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [installPrompt]);

  const handleDismiss = () => {
    localStorage.setItem("pwa-install-dismissed", "true");
    setShowPopup(false);
  };

  const handleInstallClick = () => {
    handleInstall();
    setShowPopup(false);
  };

  const handleReset = () => {
    localStorage.removeItem("pwa-install-dismissed");
    // This is for debugging purposes only.
    // In a real app, you might want to reload the page or
    // take other actions to re-trigger the install prompt.
    window.location.reload();
  };

  if (!showPopup) {
    // For debugging, we can add a button to reset the dismissed state.
    if (process.env.NODE_ENV === "development") {
      return (
        <div className="fixed bottom-1 right-1 bg-background border border-berlin rounded-lg p-1 max-w-sm z-500">
          <p className="text-sm text-muted-foreground">PWA popup hidden. </p>
          <Button onClick={handleReset} variant="link" className="text-berlin">
            Reset
          </Button>
        </div>
      );
    }
    return null;
  } else
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4/5 bg-background border border-berlin shadow-lg rounded-lg p-4 min-w-xs max-w-sm z-500">
        <div className="flex justify-between items-start">
          <div className="pr-4">
            <h3 className="font-semibold">Install App</h3>
            <p className="text-sm text-muted-foreground">
              Install this application on your device for a better experience.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="berlin" onClick={handleInstallClick}>
            Install
          </Button>
        </div>
      </div>
    );
}
