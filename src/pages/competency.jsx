// import React, { useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import competency from "@/components/competency.json";
// import SVGComponent from "@/components/SVGComponent";
// import { useStore } from "@/store/store";
// import Image from "next/image";

// export default function Home() {
//   const {
//     selectedCompetency,
//     selectedTitle,
//     setSelectedCompetency,
//     setSelectedTitle,
//     setBehaviors,
//     setSelectedThemeColor,
//   } = useStore();

//   const data = competency.competencyFramework;

//   // Select first competency and title by default
//   useEffect(() => {
//     if (!selectedCompetency && data.length > 0) {
//       const firstCompetency = data[0];
//       const firstTitle = firstCompetency.competencyPoints[0]?.title;

//       handleCompetencyClick(firstCompetency.competencyName);
//       // setSelectedTitle(firstTitle);
//       updateBehaviors(firstTitle);
//     }
//   }, []);

//   const getBehaviors = () => {
//     if (!selectedCompetency || !selectedTitle) return null;

//     const competency = data.find(
//       (c) => c.competencyName === selectedCompetency
//     );
//     if (!competency) return null;

//     const point = competency.competencyPoints.find(
//       (p) => p.title === selectedTitle
//     );
//     return point?.behaviors ?? null;
//   };

//   const updateBehaviors = (title) => {
//     const behaviors = getBehaviors();
//     setBehaviors(behaviors);
//   };

//   const handleCompetencyClick = (competencyName) => {
//     setSelectedCompetency(competencyName);

//     // Find and set first title for selected competency
//     const firstTitle = data.find((c) => c.competencyName === competencyName)
//       ?.competencyPoints[0]?.title;
//     setSelectedTitle(firstTitle);

//     // Update behaviors
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

//   // Get current competency icon
//   const getCurrentIcon = () => {
//     if (!selectedCompetency) return null;
//     return data.find((c) => c.competencyName === selectedCompetency)
//       ?.competencyIcon;
//   };

//   return (
//     <div className="container mx-auto px-4 py-2">
//       {/* Competency Navigation */}
//       <div className="grid grid-cols-5 gap-4 mb-3">
//         {data.map((competency) => (
//           <Button
//             key={competency.competencyName}
//             onClick={() => handleCompetencyClick(competency.competencyName)}
//             variant={
//               selectedCompetency === competency.competencyName
//                 ? "default"
//                 : "outline"
//             }
//             className={`h-auto text-xs whitespace-normal ${
//               selectedCompetency === competency.competencyName
//                 ? "bg-asliRed hover:bg-asliRed border border-asliRed font-medium"
//                 : "bg-halkaRed hover:bg-asliRed/10 border border-asliRed font-light"
//             }`}
//           >
//             {competency.competencyName}
//           </Button>
//         ))}
//       </div>

//       {/* Competency Icon */}
//       {selectedCompetency && getCurrentIcon() && (
//         <div className="flex justify-center items-center">
//           <p className="font-bold mr-4">{selectedCompetency}</p>
//           <Image
//             src={getCurrentIcon()}
//             alt={`${selectedCompetency} icon`}
//             width={60}
//             height={60}
//             priority
//           />
//         </div>
//       )}

//       <p className="mb-2 font-normal text-md">Key Behaviours</p>

//       {/* Competency Points */}
//       {selectedCompetency && (
//         <div className="grid grid-cols-4 gap-4 mb-12">
//           {data
//             .find((c) => c.competencyName === selectedCompetency)
//             ?.competencyPoints.map((point) => (
//               <Button
//                 key={point.title}
//                 onClick={() => handleTitleClick(point.title)}
//                 variant={
//                   selectedTitle === point.title ? "secondary" : "outline"
//                 }
//                 className={`h-28 py-4 md:text-md text-xs whitespace-normal ${
//                   selectedTitle === point.title
//                     ? "bg-halkaRed hover:bg-halkaRed text-asliRed border border-asliRed font-medium"
//                     : "bg-[#F2F2F2] font-light"
//                 }`}
//               >
//                 {point.title}
//               </Button>
//             ))}
//         </div>
//       )}

//       <SVGComponent props={getBehaviors()} />
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import competency from "@/components/competency.json";
import SVGComponent from "@/components/SVGComponent";
import { useStore } from "@/store/store";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Color mapping object
const themeColorMap = {
  asliRed: "#AB1F24",
  halkaRed: "#FFF4F4",
  asliPink: "#DB212F",
  halkaPink: "#FCEEED",
  asliOrange: "#F37333",
  halkaOrange: "#FFF4F4",
  asliYellow: "#FBB03B",
  halkaYellow: "#FFF9EF",
  asliBeige: "#FDD422",
  halkaBeige: "#FFFCED",
};

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

  useEffect(() => {
    if (!selectedCompetency && data.length > 0) {
      const firstCompetency = data[0];
      const firstTitle = firstCompetency.competencyPoints[0]?.title;
      handleCompetencyClick(firstCompetency.competencyName);
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
    const selectedComp = data.find((c) => c.competencyName === competencyName);
    const firstTitle = selectedComp?.competencyPoints[0]?.title;
    setSelectedTitle(firstTitle);
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

  const getCurrentIcon = () => {
    if (!selectedCompetency) return null;
    return data.find((c) => c.competencyName === selectedCompetency)
      ?.competencyIcon;
  };

  const getCompetencyColors = (competencyName) => {
    const comp = data.find((c) => c.competencyName === competencyName);
    if (!comp?.themeColor)
      return {
        primary: themeColorMap.asliRed,
        secondary: themeColorMap.halkaRed,
      };
    const [primaryColor, secondaryColor] = comp.themeColor;
    return {
      primary: themeColorMap[primaryColor],
      secondary: themeColorMap[secondaryColor],
    };
  };

  return (
    <div className="container mx-auto px-4 py-2">
      {/* Competency Navigation */}
      <div className="grid grid-cols-5 gap-4 mb-3">
        {data.map((comp) => {
          const colors = getCompetencyColors(comp.competencyName);
          return (
            <Button
              key={comp.competencyName}
              onClick={() => handleCompetencyClick(comp.competencyName)}
              variant={
                selectedCompetency === comp.competencyName
                  ? "default"
                  : "outline"
              }
              className="h-auto text-xs whitespace-normal transition-colors duration-100"
              style={{
                backgroundColor:
                  selectedCompetency === comp.competencyName
                    ? colors.primary
                    : colors.secondary,
                borderColor: colors.primary,
                color:
                  selectedCompetency === comp.competencyName
                    ? "white"
                    : colors.primary,
                fontWeight:
                  selectedCompetency === comp.competencyName ? "500" : "400",
              }}
            >
              {comp.competencyName}
            </Button>
          );
        })}
      </div>

      {/* Competency Icon */}
      {selectedCompetency && getCurrentIcon() && (
        <div className="flex justify-start items-center mb-2">
          <p
            className="font-bold mr-4"
            style={{ color: getCompetencyColors(selectedCompetency).primary }}
          >
            {selectedCompetency}
          </p>
          <Image
            src={getCurrentIcon()}
            alt={`${selectedCompetency} icon`}
            width={60}
            height={60}
            priority
          />
        </div>
      )}

      <p className="mb-1 font-normal text-md">Key Behaviours</p>

      {/* Competency Points */}
      {selectedCompetency && (
        <div className="grid grid-cols-4 gap-4 mb-8">
          {data
            .find((c) => c.competencyName === selectedCompetency)
            ?.competencyPoints.map((point) => {
              const colors = getCompetencyColors(selectedCompetency);
              return (
                <Button
                  key={point.title}
                  onClick={() => handleTitleClick(point.title)}
                  variant={
                    selectedTitle === point.title ? "secondary" : "outline"
                  }
                  className="h-28 py-4 md:text-md text-sm whitespace-normal transition-colors duration-200"
                  style={{
                    backgroundColor:
                      selectedTitle === point.title
                        ? colors.secondary
                        : "#F2F2F2",
                    border: "1px solid",
                    borderColor:
                      selectedTitle === point.title
                        ? colors.primary
                        : "transparent",
                    color:
                      selectedTitle === point.title ? colors.primary : "black",
                    fontWeight: selectedTitle === point.title ? "500" : "400",
                  }}
                >
                  {point.title}
                </Button>
              );
            })}
        </div>
      )}

      <SVGComponent
        props={getBehaviors()}
        colors={
          selectedCompetency ? getCompetencyColors(selectedCompetency) : null
        }
      />
    </div>
  );
}
