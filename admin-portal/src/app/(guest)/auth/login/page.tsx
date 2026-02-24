import React from "react";
import AdminLoginForm from "./components/AdminLoginForm";
// import { TokenManager } from "@/api/TokenManager";
// import { getPayloadFromJWT } from "@/utils";
// import { routes } from "@/lib/routes";
// import { redirect } from "next/navigation";

const page =  () => {
  // const token = await TokenManager.get();
  // if (token) {
  //   const payload = getPayloadFromJWT(token);
  //   for (const route of routes) {
  //     if (payload?.permissions[route.permission]) {
  //       redirect(route.path);
  //     }
  //   }
  // }
  return (
    <>
      <AdminLoginForm />
    </>
  );
};

export default page;
