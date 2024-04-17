// pages/applicants.tsx
"use client";
import React, { useEffect, useState } from "react";
import ApplicantTile from "../components/ApplicantTile";

type Applicant = { [key: string]: any; id: string };

const ApplicantsPage = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/converted.json");
      const data = await response.json();
      // Adding an ID to each applicant
      const processedData = data.map((applicant: any, index: any) => ({
        ...applicant,
        id: `applicant-${index + 1}`, // Generating a simple ID
      }));
      setApplicants(processedData);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Applicant List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {applicants.map((applicant) => (
          <ApplicantTile
            key={applicant.id}
            id={applicant.id}
            name={applicant["Full Name"]}
            headshotUrl={applicant["Upload a Headshot of Yourself"]}
          />
        ))}
      </div>
    </div>
  );
};

export default ApplicantsPage;
