import React from 'react';
import { AdditionalInfo } from '../types/ApplicationDetailsType';
import Image from 'next/image';

interface AdditionalInfoProps {
  additionalInfo: AdditionalInfo;
}

const AdditionalDetails = ({ additionalInfo }: AdditionalInfoProps) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-medium mb-4">Additional Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 border rounded-xl p-3 border-gray-300">
        <div><strong>Application ID:</strong> {additionalInfo.application_display_id}</div>
        <div><strong>Name:</strong> {additionalInfo.name}</div>
        <div><strong>Mobile:</strong> {additionalInfo.mobile}</div>
        <div><strong>First Submitted At:</strong> {additionalInfo.first_submitted_at}</div>
        <div><strong>Business Name:</strong> {additionalInfo.business_name || 'N/A'}</div>
        <div><strong>NID No:</strong> {additionalInfo.nid_no || 'N/A'}</div>
  
        <div>
          <strong>Application Status:</strong>
          <span
            className="ml-2 px-2 py-1 rounded"
            style={{
              backgroundColor: additionalInfo.application_status.bg_color,
              color: additionalInfo.application_status.font_color,
            }}
          >
            {additionalInfo.application_status.type}
          </span>
        </div>
        <div>
          <strong>Risk Rating:</strong>
          <span
            className="ml-2 px-2 py-1 rounded"
            style={{
              backgroundColor: additionalInfo.risk_rating.bg_color,
              color: additionalInfo.risk_rating.font_color,
            }}
          >
            {additionalInfo.risk_rating.type}
          </span>
        </div>
        <div><strong>MQC Updated At:</strong> {additionalInfo.mqc_updated_at || 'N/A'}</div>
        <div><strong>HQC Updated At:</strong> {additionalInfo.hqc_updated_at || 'N/A'}</div>
        <div><strong>Risk Rating Updated At:</strong> {additionalInfo.risk_rating_updated_at || 'N/A'}</div>
        <div><strong>Assigned:</strong> {additionalInfo.has_assigned ? 'Yes' : 'No'}</div>
        <div><strong>Assigned To:</strong> {additionalInfo.assigned_to || 'N/A'}</div>
        <div><strong>Has Resubmitted:</strong> {additionalInfo.has_resubmitted ? 'Yes' : 'No'}</div>
        <div className="col-span-2">
          <strong>User Image:</strong>
          <div className="mt-2">
            <Image
              src={additionalInfo.user_image}
              width={600}
              height={600}
              alt="User"
              className="rounded border h-100 w-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetails;
