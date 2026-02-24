// "use client";
// import Button from "@/components/button/Button";
// import Card from "@/components/ui/Card";
// import React from "react";
// import Image from "next/image";
// import useGetLocation from "@/hooks/usegetLocation";

// const Location = () => {
//   // const { userInfo, setUserInfo } = useUserContext();

//   const { handleLocationAccess } = useGetLocation();

//   return (
//     <>
//       <Card title="Confirm Location" subTitle="Please confirm your location">
//         <div className="flex flex-col items-start gap-2 border border-border-grey p-4 rounded-2xl mb-10 mt-3">
//           <div className="flex items-center gap-2">
//             <Image
//               src="/assests/location.png"
//               width={18}
//               height={24}
//               alt="Location icon"
//             />
//             <p className="text-lightblack text-tiny font-medium">
//               Location Track
//             </p>
//           </div>
//           <div>
//             <p className="text-grey text-sm ml-6">
//               To help us show you the right registration form, we kindly ask for
//               your permission to access your location. This helps us determine
//               if you are registering from inside or outside Bangladesh.
//             </p>
//           </div>
//         </div>

//         <Button text="Give Location Access" fn={handleLocationAccess} />
//       </Card>
//     </>
//   );
// };

// export default Location;
