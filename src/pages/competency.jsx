import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import competency from "@/components/competency.json";
import SVGComponent from "@/components/SVGComponent";
import { useStore } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/router";

const themeColorMap = {
  asliRed: "#AB1F24",
  halkaRed: "#FFF4F4",
  asliPink: "#DB212F",
  halkaPink: "#FBE9E9",
  asliOrange: "#F37333",
  halkaOrange: "#FDEEE6",
  asliYellow: "#FBB03B",
  halkaYellow: "#FFF6E9",
  asliBeige: "#FDD422",
  halkaBeige: "#FFFAE7",
};

export default function Home() {
  const router = useRouter();
  const {
    selectedCompetency,
    selectedTitle,
    setSelectedCompetency,
    setSelectedTitle,
    setBehaviors,
  } = useStore();

  const data = competency.competencyFramework;

  const initializeDefaults = () => {
    if (data.length > 0) {
      const firstCompetency = data[0];
      const firstTitle = firstCompetency.competencyPoints[0]?.title;
      setSelectedCompetency(firstCompetency.competencyName);
      setSelectedTitle(firstTitle);
      setBehaviors(firstCompetency.competencyPoints[0]?.behaviors);
    }
  };

  useEffect(() => {
    if (router.query.q) {
      const queryCompetency = data.find(
        (c) => c.competencyName === router.query.q
      );
      if (queryCompetency) {
        const firstTitle = queryCompetency.competencyPoints[0]?.title;
        setSelectedCompetency(router.query.q);
        setSelectedTitle(firstTitle);
        setBehaviors(queryCompetency.competencyPoints[0]?.behaviors);
      } else {
        initializeDefaults();
      }
    } else if (!selectedCompetency || !selectedTitle) {
      initializeDefaults();
    }
  }, [router.query, data]);

  const handleCompetencyClick = (competencyName) => {
    const selectedComp = data.find((c) => c.competencyName === competencyName);
    if (selectedComp) {
      const firstTitle = selectedComp.competencyPoints[0]?.title;
      setSelectedCompetency(competencyName);
      setSelectedTitle(firstTitle);
      setBehaviors(selectedComp.competencyPoints[0]?.behaviors);
    }
  };

  const handleTitleClick = (title) => {
    if (selectedTitle === title) {
      setSelectedTitle("");
      setBehaviors(null);
      return;
    }
    const currentComp = data.find(
      (c) => c.competencyName === selectedCompetency
    );
    const point = currentComp?.competencyPoints.find((p) => p.title === title);
    setSelectedTitle(title);
    setBehaviors(point?.behaviors ?? null);
  };

  const getCurrentIcon = () => {
    if (!selectedCompetency) return null;
    return data.find((c) => c.competencyName === selectedCompetency)
      ?.competencyIcon;
  };

  const getCompetencyColors = (competencyName) => {
    const comp = data.find((c) => c.competencyName === competencyName);
    if (!comp?.themeColor) {
      return {
        primary: themeColorMap.asliRed,
        secondary: themeColorMap.halkaRed,
      };
    }
    const [primaryColor, secondaryColor] = comp.themeColor;
    return {
      primary: themeColorMap[primaryColor],
      secondary: themeColorMap[secondaryColor],
    };
  };

  return (
    <div className="container mx-auto px-0 sm:px-4 mt-2">
      {/* Competency Navigation - Carousel for mobile, Grid for desktop */}
      <div className="block md:hidden mb-4 relative">
        <Carousel
          opts={{
            align: "center", // Changed to center alignment
            loop: true,
          }}
          className="w-full mx-auto"
        >
          <CarouselContent className="-ml-1">
            {" "}
            {/* Adjusted margin */}
            {data.map((comp) => {
              const colors = getCompetencyColors(comp.competencyName);
              return (
                <CarouselItem
                  key={comp.competencyName}
                  className="pl-1 basis-[85%] sm:basis-1/2" // Adjusted basis and padding
                >
                  <div className="px-1">
                    {" "}
                    {/* Added padding wrapper */}
                    <Button
                      onClick={() => handleCompetencyClick(comp.competencyName)}
                      variant={
                        selectedCompetency === comp.competencyName
                          ? "default"
                          : "outline"
                      }
                      className="w-full h-14 md:h-auto py-3 text-sm whitespace-normal transition-colors duration-100"
                      style={{
                        backgroundColor:
                          selectedCompetency === comp.competencyName
                            ? colors.primary
                            : colors.secondary,
                        borderColor: "transparent",
                        color:
                          selectedCompetency === comp.competencyName
                            ? "white"
                            : "black",
                        fontWeight:
                          selectedCompetency === comp.competencyName
                            ? "500"
                            : "400",
                      }}
                    >
                      {comp.competencyName}
                    </Button>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="hidden sm:block">
            {" "}
            {/* Hide arrows on smallest screens */}
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </div>
        </Carousel>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid md:grid-cols-5 gap-4 mb-8 ">
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
              className="h-auto py-2 text-sm whitespace-normal transition-colors duration-100"
              style={{
                backgroundColor:
                  selectedCompetency === comp.competencyName
                    ? colors.primary
                    : colors.secondary,
                borderColor: "transparent",
                color:
                  selectedCompetency === comp.competencyName
                    ? "white"
                    : "black",
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
        <div className="flex flex-col sm:flex-row justify-start items-center sm:items-center gap-2 mb-4 ">
          <p
            className="font-bold text-center sm:text-left"
            style={{ color: getCompetencyColors(selectedCompetency).primary }}
          >
            {selectedCompetency}
          </p>
          <Image
            src={getCurrentIcon()}
            alt={`${selectedCompetency} icon`}
            width={50}
            height={50}
            priority
            className="w-12 h-12 sm:w-14 sm:h-14"
          />
        </div>
      )}

      <p className="mb-2 font-normal text-md text-center sm:text-left">
        Key Behaviours
      </p>

      {/* Competency Points */}
      {selectedCompetency && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6 md:px-0 px-4">
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
                  className="min-h-24 py-3 text-sm md:text-xs whitespace-normal transition-colors duration-200"
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
                      selectedTitle === point.title &&
                      colors.primary !== "#FBB03B" &&
                      colors.primary !== "#FDD422"
                        ? colors.primary
                        : "black",
                  }}
                >
                  {point.title}
                </Button>
              );
            })}
        </div>
      )}

      <SVGComponent
        props={
          selectedCompetency && selectedTitle
            ? data
                .find((c) => c.competencyName === selectedCompetency)
                ?.competencyPoints.find((p) => p.title === selectedTitle)
                ?.behaviors
            : null
        }
        colors={
          selectedCompetency ? getCompetencyColors(selectedCompetency) : null
        }
      />
    </div>
  );
}
