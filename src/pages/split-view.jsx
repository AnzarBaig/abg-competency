import React, { useEffect } from "react";
import { useStore } from "@/store/store";

export default function SplitView() {
  const { setBehaviors, setSelectedCompetency, setSelectedTitle } = useStore();

  useEffect(() => {
    // Listen for messages from iframes
    const handleMessage = (event) => {
      if (event.data.type === "STORE_UPDATE") {
        setBehaviors(event.data.behaviors);
        setSelectedCompetency(event.data.competency);
        setSelectedTitle(event.data.title);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setBehaviors, setSelectedCompetency, setSelectedTitle]);

  return (
    <div className="flex h-screen">
      {/* Left side - Main page */}
      <div className="w-1/2 h-full">
        <iframe
          src="/"
          className="w-full h-full border-r border-gray-200"
          title="Main Content"
        />
      </div>

      {/* Right side - Behaviors page */}
      <div className="w-1/2 h-full">
        <iframe src="/behaviours" className="w-full h-full" title="Behaviors" />
      </div>
    </div>
  );
}
