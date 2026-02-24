

// import { useRouter } from "next/navigation";
// import { useUpdateUserInfo } from "./useUpdateUserInfo";



// const useGetLocation = () => {
//     const updateUserInfo = useUpdateUserInfo();
//     const router = useRouter();
   
//   const getLocation = (): Promise<GeolocationPosition> => {
//       return new Promise((resolve, reject) => {
//         if (!navigator.geolocation) {
//           reject(new Error("Geolocation is not supported by your browser."));
//         } else {
//           navigator.geolocation.getCurrentPosition(resolve, reject);
//         }
//       });
//     };
//       const handleLocationAccess = async () => {
//         try {
//           const position = await getLocation();
//           const {latitude , longitude} = position.coords
         
         

//           const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
//           const data = await res.json();
//           console.log(data ,'locationnnnn')
          

//           updateUserInfo({
//             location: data,
//           });

//           router.push("/login");
//           // handlePageChange("login");
      
   
//         } catch (error) {
//           console.error("Error getting location:", error);
//           alert("Unable to fetch location. Please allow access.");
//         }
//       };
// return{
//     handleLocationAccess

// }
// }

// export default useGetLocation