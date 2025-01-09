import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import competency from "@/components/competency.json";
import SVGComponent from "@/components/SVGComponent";
import { useStore } from "@/store/store";
import Image from "next/image";

export default function Home() {
  const {
    selectedCompetency,
    selectedTitle,
    setSelectedCompetency,
    setSelectedTitle,
    setBehaviors,
    setSelectedThemeColor,
  } = useStore();

  const data = competency.competencyFramework;

  // Select first competency and title by default
  useEffect(() => {
    if (!selectedCompetency && data.length > 0) {
      const firstCompetency = data[0];
      const firstTitle = firstCompetency.competencyPoints[0]?.title;

      handleCompetencyClick(firstCompetency.competencyName);
      // setSelectedTitle(firstTitle);
      updateBehaviors(firstTitle);
    }
  }, []);

  const getBehaviors = () => {
    if (!selectedCompetency || !selectedTitle) return null;

    const competency = data.find(
      (c) => c.competencyName === selectedCompetency
    );
    if (!competency) return null;

    const point = competency.competencyPoints.find(
      (p) => p.title === selectedTitle
    );
    return point?.behaviors ?? null;
  };

  const updateBehaviors = (title) => {
    const behaviors = getBehaviors();
    setBehaviors(behaviors);
  };

  const handleCompetencyClick = (competencyName) => {
    setSelectedCompetency(competencyName);

    // Find and set first title for selected competency
    const firstTitle = data.find((c) => c.competencyName === competencyName)
      ?.competencyPoints[0]?.title;
    setSelectedTitle(firstTitle);

    // Update behaviors
    updateBehaviors(firstTitle);
  };

  const handleTitleClick = (title) => {
    if (selectedTitle === title) {
      setSelectedTitle("");
      setBehaviors(null);
      return;
    }

    setSelectedTitle(title);
    updateBehaviors(title);
  };

  // Get current competency icon
  const getCurrentIcon = () => {
    if (!selectedCompetency) return null;
    return data.find((c) => c.competencyName === selectedCompetency)
      ?.competencyIcon;
  };

  return (
    <div className="container mx-auto px-4 py-2">
      {/* Competency Navigation */}
      <div className="grid grid-cols-5 gap-4 mb-3">
        {data.map((competency) => (
          <Button
            key={competency.competencyName}
            onClick={() => handleCompetencyClick(competency.competencyName)}
            variant={
              selectedCompetency === competency.competencyName
                ? "default"
                : "outline"
            }
            className={`h-auto text-xs whitespace-normal ${
              selectedCompetency === competency.competencyName
                ? "bg-asliRed hover:bg-asliRed border border-asliRed font-medium"
                : "bg-halkaRed hover:bg-asliRed/10 border border-asliRed font-light"
            }`}
          >
            {competency.competencyName}
          </Button>
        ))}
      </div>

      {/* Competency Icon */}
      {selectedCompetency && getCurrentIcon() && (
        <div className="flex justify-center items-center">
          <p className="font-bold mr-4">{selectedCompetency}</p>
          <Image
            src={getCurrentIcon()}
            alt={`${selectedCompetency} icon`}
            width={60}
            height={60}
            priority
          />
        </div>
      )}

      <p className="mb-2 font-normal text-md">Key Behaviours</p>

      {/* Competency Points */}
      {selectedCompetency && (
        <div className="grid grid-cols-4 gap-4 mb-12">
          {data
            .find((c) => c.competencyName === selectedCompetency)
            ?.competencyPoints.map((point) => (
              <Button
                key={point.title}
                onClick={() => handleTitleClick(point.title)}
                variant={
                  selectedTitle === point.title ? "secondary" : "outline"
                }
                className={`h-28 py-4 md:text-md text-xs whitespace-normal ${
                  selectedTitle === point.title
                    ? "bg-halkaRed hover:bg-halkaRed text-asliRed border border-asliRed font-medium"
                    : "bg-[#F2F2F2] font-light"
                }`}
              >
                {point.title}
              </Button>
            ))}
        </div>
      )}

      <SVGComponent props={getBehaviors()} />
    </div>
  );
}

// import React, { useEffect, useState } from 'react';
// import { Button } from "@/components/ui/button";
// import competency from "@/components/competency.json";
// import SVGComponent from '@/components/SVGComponent';
// import { useStore } from '@/store/store';
// import Image from 'next/image';
// import { cn } from "@/lib/utils";

// // Color mapping object
// const themeColorMap = {
//   asliRed: "#AB1F24",
//   halkaRed: "#FFF4F4",
//   asliPink: "#AA336A",
//   halkaPink: "#FBEFE6",
//   asliOrange: "#F2733226",
//   halkaOrange: "#FFF5F0",
//   asliYellow: "#F2C94C",
//   halkaYellow: "#FFF9E6",
//   asliBeige: "#080000",
//   halkaBeige: "#FFFFFF",
// };

// export default function Home() {
//   const {
//     selectedCompetency,
//     selectedTitle,
//     setSelectedCompetency,
//     setSelectedTitle,
//     setBehaviors,
//     setSelectedThemeColor
//   } = useStore();

//   const [activeColors, setActiveColors] = useState({
//     primary: themeColorMap.asliRed,
//     secondary: themeColorMap.halkaRed
//   });

//   const data = competency.competencyFramework;

//   useEffect(() => {
//     if (!selectedCompetency && data.length > 0) {
//       const firstCompetency = data[0];
//       const firstTitle = firstCompetency.competencyPoints[0]?.title;

//       handleCompetencyClick(firstCompetency.competencyName);
//       // updateBehaviors(firstTitle);

//       // Set initial colors from the first competency
//       const [primaryColor, secondaryColor] = firstCompetency.themeColor;
//       setActiveColors({
//         primary: themeColorMap[primaryColor],
//         secondary: themeColorMap[secondaryColor]
//       });
//     }
//   }, []);

//   const getBehaviors = () => {
//     if (!selectedCompetency || !selectedTitle) return null;
//     const competency = data.find(c => c.competencyName === selectedCompetency);
//     if (!competency) return null;
//     const point = competency.competencyPoints.find(p => p.title === selectedTitle);
//     return point?.behaviors ?? null;
//   };

//   const updateBehaviors = (title) => {
//     const behaviors = getBehaviors();
//     setBehaviors(behaviors);
//   };

//   const handleCompetencyClick = (competencyName) => {
//     setSelectedCompetency(competencyName);

//     const selectedComp = data.find(c => c.competencyName === competencyName);

//     if (selectedComp?.themeColor) {
//       const [primaryColor, secondaryColor] = selectedComp.themeColor;
//       setActiveColors({
//         primary: themeColorMap[primaryColor],
//         secondary: themeColorMap[secondaryColor]
//       });
//     }

//     const firstTitle = selectedComp?.competencyPoints[0]?.title;
//     setSelectedTitle(firstTitle);
//     updateBehaviors(firstTitle);
//   };

//   const handleTitleClick = (title) => {
//     if (selectedTitle === title) {
//       setSelectedTitle("");
//       setBehaviors(null);
//       return;
//     }
//     setSelectedTitle(title);
//     updateBehaviors(title);
//   };

//   const getCurrentIcon = () => {
//     if (!selectedCompetency) return null;
//     return data.find(c => c.competencyName === selectedCompetency)?.competencyIcon;
//   };
//   console.log("activeColors.primary" + activeColors.primary);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Competency Navigation */}
//       <div className="grid grid-cols-5 gap-4 mb-8">
//         {data.map((competency) => (
//           <Button
//             key={competency.competencyName}
//             onClick={() => handleCompetencyClick(competency.competencyName)}
//             variant={selectedCompetency === competency.competencyName ? "default" : "outline"}
//             className="h-auto text-xs whitespace-normal transition-colors duration-200"
//             style={{
//               backgroundColor: selectedCompetency === competency.competencyName
//                 ? activeColors.primary
//                 : activeColors.secondary,
//               borderColor: activeColors.primary,
//               color: selectedCompetency === competency.competencyName ? 'white' : activeColors.primary,
//               fontWeight: selectedCompetency === competency.competencyName ? '500' : '400',
//             }}
//           >
//             {competency.competencyName}
//           </Button>
//         ))}
//       </div>

//       {/* Competency Icon */}
//       {selectedCompetency && getCurrentIcon() && (
//         <div className="flex justify-center items-center mb-8">
//           <p className="font-bold mr-4" style={{ color: activeColors.primary }}>
//             {selectedCompetency}
//           </p>
//           <Image
//             src={getCurrentIcon()}
//             alt={`${selectedCompetency} icon`}
//             width={50}
//             height={50}
//             priority
//           />
//         </div>
//       )}

//       <p className="mb-2 font-normal text-md">Key Behaviours</p>

//       {/* Competency Points */}
//       {selectedCompetency && (
//         <div className="grid grid-cols-4 gap-4 mb-12">
//           {data
//             .find(c => c.competencyName === selectedCompetency)
//             ?.competencyPoints.map((point) => (
//               <Button
//                 key={point.title}
//                 onClick={() => handleTitleClick(point.title)}
//                 variant={selectedTitle === point.title ? "secondary" : "outline"}
//                 className="h-32 py-4 md:text-md text-xs whitespace-normal transition-colors duration-200"
//                 style={{
//                   backgroundColor: selectedTitle === point.title
//                     ? activeColors.secondary
//                     : '#F2F2F2',
//                   borderColor: selectedTitle === point.title ? activeColors.primary : 'transparent',
//                   color: selectedTitle === point.title ? activeColors.primary : 'black',
//                   fontWeight: selectedTitle === point.title ? '500' : '400',
//                 }}
//               >
//                 {point.title}
//               </Button>
//             ))}
//         </div>
//       )}

//       <SVGComponent props={getBehaviors()} colors={{
//         primary: activeColors.primary,
//         secondary: activeColors.secondary
//       }} />
//     </div>
//   );
// }
