'use client'

import { ECVerifyLog } from '../types/ECLogTypes';
import { formatDateWithTime } from '@/utils/date';

interface RoleTableProps {
  ecVerifyLogs: ECVerifyLog[];
  onRoleUpdated: () => void
}

const EcVerificationLogsTable = ({ ecVerifyLogs }: RoleTableProps) => {


  const headings = ['Application ID', 'Display ID', 'NID', 'Mobile', 'EC User', 'Request User', 'Response Status', 'Created At']

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="text-gray-400">
          <tr>
            {headings.map((heading, index) => (
              <th key={index} className="px-4 py-4 text-left text-sm font-medium text-gray-500 capitalize">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ecVerifyLogs.map((log, index) => (
            <tr key={index} className="border-b border-gray-300 border-dashed hover:bg-gray-50">
              <td className="px-4 py-4 text-sm text-gray-700 capitalize">{log.application_id || 'N/A'}</td>
              <td className="px-4 py-4 text-sm text-gray-700 capitalize">{log.display_id || 'N/A'}</td>
              <td className="px-4 py-4 text-sm text-gray-700 capitalize">{log.nid || 'N/A'}</td>
              <td className="px-4 py-4 text-sm text-gray-700 capitalize">{log.mobile || 'N/A'}</td>
              <td className="px-4 py-4 text-sm text-gray-700 capitalize">{log.ec_user || 'N/A'}</td>
              <td className="px-4 py-4 text-sm text-gray-700 capitalize">{log.request_user || 'N/A'}</td>
              <td className="px-4 py-4 text-sm text-gray-700 capitalize">{log.response_status || 'N/A'}</td>
              <td className="px-4 py-4 text-sm text-gray-700">{formatDateWithTime(log.created_at)}</td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default EcVerificationLogsTable
