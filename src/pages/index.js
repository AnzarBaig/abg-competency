import React from 'react';
import { Button } from "@/components/ui/button";
import competency from "@/components/competency.json";
import SVGComponent from '@/components/SVGComponent';
import { useStore } from '@/store/store';

export default function Home() {
  const {
    selectedCompetency,
    selectedTitle,
    setSelectedCompetency,
    setSelectedTitle,
    setBehaviors
  } = useStore();

  const data = competency.competencyFramework;

  const handleCompetencyClick = (competencyName) => {
    setSelectedCompetency(competencyName);
    // Find the first competency point title for the selected competency
    const firstTitle = data.find(c => c.competencyName === competencyName)
      ?.competencyPoints[0]?.title;
    setSelectedTitle(firstTitle);
    // Update behaviors in store
    updateBehaviors(firstTitle);
  };

  const handleTitleClick = (title) => {
    setSelectedTitle(title);
    updateBehaviors(title);
  };

  const getBehaviors = () => {
    if (!selectedCompetency || !selectedTitle) return null;
    const competency = data.find(c => c.competencyName === selectedCompetency);
    if (!competency) return null;
    const point = competency.competencyPoints.find(p => p.title === selectedTitle);
    return point ? point.behaviors : null;
  };

  const updateBehaviors = (title) => {
    const behaviors = getBehaviors();
    setBehaviors(behaviors);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Navigation */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {data.map((competency) => (
          <Button
            key={competency.competencyName}
            onClick={() => handleCompetencyClick(competency.competencyName)}
            variant={selectedCompetency === competency.competencyName ? "default" : "outline"}
            className={`h-auto text-xs whitespace-normal ${selectedCompetency === competency.competencyName
              ? "bg-asliRed hover:bg-asliRed border border-asliRed font-medium"
              : "bg-halkaRed hover:bg-asliRed/10 border border-asliRed font-light"
              }`}
          >
            {competency.competencyName}
          </Button>
        ))}
      </div>

      {/* Competency Points */}
      {selectedCompetency && (
        <div className="grid grid-cols-4 gap-4 mb-12">
          {data
            .find(c => c.competencyName === selectedCompetency)
            ?.competencyPoints.map((point) => (
              <Button
                key={point.title}
                onClick={() => handleTitleClick(point.title)}
                variant={selectedTitle === point.title ? "secondary" : "outline"}
                className={`h-32 py-4 text-sm whitespace-normal ${selectedTitle === point.title
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

      {/* Behaviors */}
      {/* {selectedTitle && getBehaviors() && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Behaviors by Job Band</h3>
          <div className="space-y-4">
            {getBehaviors().map((behavior) => (
              <div
                key={behavior.jobBand}
                className="border-l-4 border-blue-600 pl-4 py-2"
              >
                <h4 className="font-medium text-gray-900">{behavior.jobBand}</h4>
                <p className="text-sm text-gray-600 mt-1">{behavior.description}</p>
                <p className="text-xs text-gray-500 mt-1">Level: {behavior.level}</p>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}