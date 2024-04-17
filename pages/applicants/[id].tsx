// pages/applicants/[id].tsx
"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "/styles/globals.css";

type Applicant = {
  [key: string]: any;
};

const ApplicantDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchApplicant = async () => {
      if (!id || typeof id !== "string") return;
      try {
        const index = parseInt(id.split("-")[1], 10) - 1;
        const response = await fetch("/converted.json");
        const data: Applicant[] = await response.json();
        const selectedApplicant = data[index];
        if (!selectedApplicant) {
          setError("Applicant not found");
          return;
        }
        setApplicant(selectedApplicant);
      } catch (err) {
        setError("Failed to fetch applicant data");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicant();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!applicant) {
    return <div>No applicant data</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="relative container mx-auto p-8">
          <div className="z-10">
            <img
              src={applicant["Upload a Headshot of Yourself"]}
              alt={`Headshot of ${applicant["Full Name"]}`}
              className="w-full object-cover"
              //centered image
              style={{
                maxHeight: "500px",
                maxWidth: "500px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </div>
          <div className="p-4">
            <h2 className="text-2xl text-gray-600 font-semibold mb-2 text-center">
              {applicant["Full Name"]}
            </h2>
            <div className="mb-4">
              {/* Dynamically generate other fields */}
              {Object.keys(applicant).map((key) => {
                if (
                  key !== "Full Name" &&
                  key !== "Upload a Headshot of Yourself"
                ) {
                  const value = applicant[key];
                  return (
                    <p key={key} className="text-gray-600 mb-1">
                      <strong>{key}:</strong>{" "}
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : value}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetails;
