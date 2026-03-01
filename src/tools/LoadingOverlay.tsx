"use client"

// need to install react-spinners for this component to work
// with docker - must shut down, clear volumes, and rebuild / spinup all containers
import PuffLoader from 'react-spinners/PuffLoader';

// included this here and not in quotes.model.ts so that LoadingOverlay component is easily reusable in other apps
interface LoadingOverlayProps {
  show?: boolean;
  showSpinner?: boolean;
  spinnerColor?: string;
  bgColor?: string;
}

export default function LoadingOverlay({
  show = true,
  showSpinner = true,
  spinnerColor = "#FFFFFF",
  bgColor = "rgba(0,0,0,0.6)"
}: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      {showSpinner && <PuffLoader color={spinnerColor} size={60} />}
    </div>
  );
}