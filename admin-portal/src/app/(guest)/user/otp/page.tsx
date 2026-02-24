import Layout from "../set-password/components/Layout";
import Otp from "../set-password/components/Otp";

const Page = () => {
  return (
    <Layout title="Verify OTP" className="w-[500px]">
      <Otp />
    </Layout>
  );
};

export default Page;
