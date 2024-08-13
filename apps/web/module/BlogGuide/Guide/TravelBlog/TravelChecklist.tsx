import React from "react";

type T_Requirement = {
  item: string;
};

type T_Props = {
  readonly requirements: T_Requirement[];
};

function TravelChecklist({ requirements }: T_Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Travel Requirements Checklist</h2>
      <ul className="grid list-disc ml-6 space-y-5">
        {requirements.map((requirement, index) => (
          <li key={index}>{requirement.item}</li>
        ))}
      </ul>
    </div>
  );
}

export default TravelChecklist;
