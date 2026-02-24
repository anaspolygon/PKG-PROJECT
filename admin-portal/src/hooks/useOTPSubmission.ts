import { useUserContext } from "@/context/GetUserInfoContext";

export const useOTPSubmission = ({})=> {
    const {userInfo} = useUserContext();
    const payload = {
        section_slg: "otp",
        identifier: userInfo.phoneNumber,
        location: userInfo.location,
        captcha_token: userInfo.captcha_token ,
        data: {
          mobile: userInfo.phoneNumber,
          email: "",
          authorization_code: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vcHJpbWViYW5rLWFwaS5kZXYtcG9seWdvbnRlY2gueHl6L2FwaS9tZXJjaGFudC9sb2dpbiIsImlhdCI6MTc0NTc2MTU2NCwiZXhwIjoxNzQ1Nzk3NTY0LCJuYmYiOjE3NDU3NjE1NjQsImp0aSI6IlB4QVNNWVpDWFRqM0V1SDMiLCJzdWIiOiIrODgwMTgxMTExMTExMSIsInBydiI6IjlhOTJjNjg1ZjFjZmRhMWY3NGEwOGJhZDcwZWNjM2U2Mzk4YTRlMGYiLCJ0eXBlIjoibWVyY2hhbnQifQ.Ae9IT4uCazdqc-by3O0vN-yataF-DuAVwOsSUURDV7Q"
        }
      }

    return {payload};
      
}