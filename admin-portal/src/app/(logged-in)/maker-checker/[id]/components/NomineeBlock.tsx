import React from 'react'
import { Image } from 'antd'
import { Nominee } from '../types/ApplicationDetailsType'

interface NomineeBlockProps {
  nominees: Nominee[] | undefined
}

const NomineeBlock = ({ nominees }: NomineeBlockProps) => {
  if (!nominees) return <div>No Nominee Added</div>
  const headings = ['Field Name', 'Value'];

  return (
    <div className="flex flex-col gap-3 p-3">
      {nominees.map((nominee, index) => (
        <div
          key={index}
          className="p-5 border border-gray-200 rounded-xl shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
        >
          {nominee.nid_number ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-4 justify-between border rounded-xl border-gray-200 p-3 text-gray-700 text-sm">
                {nominee.user_image?.[0] && (
                  <div className='flex flex-col gap-2 border p-3 rounded-xl border-gray-200'>
                    <h3>Nominee Photo</h3>
                    <Image
                      src={nominee.user_image[0]}
                      alt="Nominee Image"
                      width={400}
                      height={300}
                      className="rounded-md object-cover min-w-96 h-64"
                    />
                  </div>
                )}
                {nominee.nid_front?.[0] && (
                  <div className='flex flex-col gap-2 border p-3 rounded-xl border-gray-200'>
                    <h3>NID Front</h3>
                    <Image
                      src={nominee.nid_front[0]}
                      alt="NID Front"
                      width={400}
                      height={300}
                      className="rounded-md object-cover min-w-96 h-64"
                    />
                  </div>
                )}
                {nominee.nid_back?.[0] && (
                <div className='flex flex-col gap-2 border p-3 rounded-xl border-gray-200'>
                    <h3>NID Back</h3>
                    <Image
                      src={nominee.nid_back[0]}
                      alt="NID Back"
                      width={400}
                      height={300}
                      className="rounded-md object-cover min-w-96 h-64"
                    />
                  </div>
                )}
              </div>
              <div className="overflow-x-auto border rounded-xl p-3 border-gray-200">
                <table className="min-w-full table-auto border-collapse">
                  <thead className="text-gray-400">
                  <tr>
                      {headings.map((heading, index) => (
                        <th key={index} className="px-4 py-4 text-left text-sm font-semibold">{heading}</th>
                      ))}
                    </tr>
                  </thead>
                <tbody>
                  <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm w-[20%] text-gray-700">Name</td>
                    <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.name || 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm w-[20%] text-gray-700">Relation</td>
                    <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.relation || 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm w-[20%] text-gray-700">Date of Birth</td>
                    <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.dob || 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm w-[20%] text-gray-700">Share</td>
                    <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.share}%</td>
                  </tr>
                  <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm w-[20%] text-gray-700">Mobile</td>
                    <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.mobile || 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm w-[20%] text-gray-700">Email</td>
                    <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.email || 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm w-[20%] text-gray-700">Address</td>
                    <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.address || 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm w-[20%] text-gray-700">NID Number</td>
                    <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.nid_number || 'N/A'}</td>
                  </tr>
                 
                </tbody>
              </table>
               <div className='flex flex-col gap-2 border p-3 my-3 rounded-xl border-gray-200  text-gray-700 text-sm'>
                    <h3>Signature</h3>
                    <Image
                      src={nominee.nominee_signature}
                      alt="NID Back"
                      width={400}
                      height={300}
                      className="rounded-md object-cover min-w-96 h-64"
                    />
                  </div>
              </div>
            </div>
            ):(
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
              <div className="flex gap-4 border rounded-xl border-gray-200 p-3 text-gray-700 text-sm">
                {nominee.user_image?.[0] && (
                  <div className='flex flex-col gap-2 border rounded-xl border-gray-200 p-3'>
                    <h3>Nominee Photo</h3>
                    <Image
                      src={nominee.user_image[0]}
                      alt="Nominee Image"
                      width={400}
                      height={300}
                      className="rounded-md object-cover min-w-96 h-64"
                    />
                  </div>
                )}
                <div className="overflow-x-auto border w-full rounded-xl p-3 border-gray-200">
                <table className="min-w-full table-auto border-collapse">
                  <thead className="text-gray-400">
                  <tr>
                      {headings.map((heading, index) => (
                        <th key={index} className="px-4 py-4 text-left text-sm font-semibold">{heading}</th>
                      ))}
                    </tr>
                  </thead>
                <tbody>
                  <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm w-[20%] text-gray-700">Name</td>
                    <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.name || 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm w-[20%] text-gray-700">Relation</td>
                    <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.relation || 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm w-[20%] text-gray-700">Date of Birth</td>
                    <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.dob || 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm w-[20%] text-gray-700">Share</td>
                    <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.share}%</td>
                  </tr>
                  <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm w-[20%] text-gray-700">Mobile</td>
                    <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.mobile || 'N/A'}</td>
                  </tr>
                  {/* <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm w-[20%] text-gray-700">Email</td>
                    <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.email || 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm w-[20%] text-gray-700">Address</td>
                    <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.address || 'N/A'}</td>
                  </tr>
                  */}
                </tbody>
              </table>
              </div>
              </div>

                  <div className='flex flex-col gap-2 border p-3 my-3 rounded-xl border-gray-200  text-gray-700 text-sm'>
                    <h3>Signature</h3>
                    <Image
                      src={nominee.nominee_signature}
                      alt="NID Back"
                      width={400}
                      height={300}
                      className="rounded-md object-cover min-w-96 h-64"
                    />
                  </div>
                </div>
                {(nominee.guardian_name || nominee.guardian_nid_number) && (
                  <div className="flex flex-col gap-2 border rounded-xl border-gray-200 p-3 text-gray-700">
                    <h3 className="font-medium text-lg">
                      Guardian Info
                    </h3>
                    <div className='flex gap-4'>

                    <div className="flex gap-4">
                      {nominee.guardian_nid_front?.[0] && (
                        <div className='border flex flex-col gap-2 rounded-xl border-gray-200 p-3'>
                          <h4 className="text-sm">
                            Guardian NID Front
                          </h4>
                          <Image
                            src={nominee.guardian_nid_front[0]}
                            alt="Guardian NID Front"
                            width={400}
                            height={300}
                            className="rounded-md object-cover min-w-96 h-64"
                          />
                        </div>
                      )}
                      {nominee.guardian_nid_back?.[0] && (
                        <div className='border flex flex-col gap-2 rounded-xl border-gray-200 p-3'>

                          <h4 className="text-sm">
                            Guardian NID Back
                          </h4>
                          {nominee.guardian_nid_back[0] &&
                          <Image
                          src={nominee.guardian_nid_back[0]}
                          alt="Guardian NID Back"
                          width={400}
                          height={300}
                          className="rounded-md object-cover min-w-96 h-64"
                          />
                        }
                        </div>
                      )}
                    </div>
                    <div className="overflow-x-auto border w-full rounded-xl p-3 border-gray-200">
                      <table className="min-w-full table-auto border-collapse">
                        <thead className="text-gray-400">
                          <tr>
                            {headings.map((heading, index) => (
                              <th key={index} className="px-4 py-4 text-left text-sm font-semibold">{heading}</th>
                            ))}
                          </tr>
                        </thead>
                      <tbody>

                      {nominee.guardian_name && (
                        <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm w-[20%] text-gray-700">Name</td>
                          <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.guardian_name}</td>
                        </tr>
                      )}
                      {nominee.guardian_nid_number && (
                        <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm w-[20%] text-gray-700">NID Number</td>
                          <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{nominee.guardian_nid_number}</td>
                        </tr>
                      )}
                      </tbody>
                      </table>
                      </div>
                    </div>
                    

                  </div>
                )}
              </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default NomineeBlock
