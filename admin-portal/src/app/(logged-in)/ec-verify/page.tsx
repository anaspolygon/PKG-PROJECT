/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef, useState } from "react";
import { fields } from "./components/Fields";
import Input from "./components/Input";
import { formSchema, transformData } from "./components/FieldValidation";
import ecVerify from "./actions/ecVerify";
import { toast } from "sonner";
// import Image from "next/image";
import useAdminPreload from "./hooks/useAdminPreload";
import { useRouter } from "next/navigation";


const Page = () => {
  const [form, setForm] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [verifyFields, setVerifyFields] = useState<
    Record<string, Record<string, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [pin, setPin] = useState<string | null>(null);
  const [nid, setNid] = useState<string | null>(null);
  const [disableVerifyBtn, setDisableVerifyBtn] = useState(false);
  const router = useRouter();

  const [presentAddress, setPresentAddress] = useState<Record<string, string>>({
    division: "",
    district: "",
    upozila: "",
    postOffice: "",
    postalCode: "",
  });

  const [permanentAddress, setPermanentAddress] = useState<
    Record<string, string>
  >({
    division: "",
    district: "",
    upozila: "",
    postOffice: "",
    postalCode: "",
  });

  const validateForm = () => {
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path.join(".")] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    return true;
  };

  const onChange = (key: string, value: string, parent: string | null) => {
  
    setDisableVerifyBtn(false);
    if (key === "postalCode" && value === "") {
      const data = form;
      delete data[parent!];
      setForm({ ...data });
      return;
    }
    if (key === "nid") {
      setPhoto(null);
      setPin(null);
      setNid(null);
    }
    if (parent) {
      setForm({ ...form, [parent]: { ...form[parent], [key]: value } });
      setErrors({ ...errors, [`${parent}.${key}`]: "" });
      setVerifyFields({ ...verifyFields, [`${parent}.${key}`]: {} });
    } else {
      setForm({ ...form, [key]: value });
      if (key === "nid") {
        if (value.length === 10 || value.length === 13 || value.length === 17) {
          setErrors({ ...errors, [key]: "" });
          setVerifyFields({ ...verifyFields, [key]: {} });
        } else {
          setErrors({
            ...errors,
            [key]: "NID must be exactly 10, 13, or 17 digits",
          });
          setVerifyFields({ ...verifyFields, [key]: {} });
        }
        return;
      }
      setErrors({ ...errors, [key]: "" });
      setVerifyFields({ ...verifyFields, [key]: {} });
    }
  };

  const { divisions, districts, thanas, postOffices, postalCodes } =
    useAdminPreload();

  useEffect(() => {
    if (permanentAddress.postalCode) {
      const division = divisions.find(
        (item) => item.value === permanentAddress.division
      );
      const district = districts.find(
        (item) => item.value === permanentAddress.district
      );
      const postOffice = postOffices.find(
        (item) => item.value === permanentAddress.postOffice
      );
      setForm((prev) => ({
        ...prev,
        permanentAddress: {
          ...prev.permanentAddress,
          division: division?.label || "",
          district: district?.label || "",
          postOffice: postOffice?.label || "",
        },
      }));
    }

    if (presentAddress.postalCode) {
      const division = divisions.find(
        (item) => item.value === presentAddress.division
      );
      const district = districts.find(
        (item) => item.value === presentAddress.district
      );
      const postOffice = postOffices.find(
        (item) => item.value === presentAddress.postOffice
      );
      setForm((prev) => ({
        ...prev,
        presentAddress: {
          ...prev.presentAddress,
          division: division?.label || "",
          district: district?.label || "",
          postOffice: postOffice?.label || "",
        },
      }));
    }
  }, [permanentAddress, presentAddress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setPhoto(null);
      setLoading(true);
      const payload = transformData(form);
      const res = await ecVerify(payload);
      if (res?.success && res.verified) {
        setLoading(false);
        toast.success(res.message);
        setDisableVerifyBtn(true);
      } else {
        setLoading(false);
        if(res.code === 401){
          toast.error(res.message);
          router.push("/auth/login");
        }
        if (res.error) {
          toast.error(
            typeof res.error === "string"
              ? res.error
              : res.error?.message || "An error occurred during verification."
          );
        } else {
          toast.error(res.message);
        }
        setPhoto(null);
        setPin(null);
        setNid(null);
      }
      if (res.photo) {
        setPhoto(res.photo);
      }
      if (res.pin) {
        setPin(res.pin);
      }
      if (res.nid) {
        setNid(res.nid);
      }
      setVerifyFields(res.data ? res.data : res);
    } else {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

 

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setIsChecked(value);
    if (value) {
      setPermanentAddress?.({
        division: presentAddress?.division || "",
        district: presentAddress?.district || "",
        upozila: presentAddress?.upozila || "",
        // postOffice: permanentAddress?.postOffice || "",
        // postalCode: permanentAddress?.postalCode || "",
      });
      const data = form;
      data.permanentAddress = {
        ...(presentAddress?.division
          ? { division: data.presentAddress.division }
          : {}),
        ...(presentAddress?.district
          ? { district: data.presentAddress.district }
          : {}),
        ...(presentAddress?.upozila
          ? { upozila: data.presentAddress.upozila }
          : {}),
        ...(data.presentAddress?.unionOrWard
          ? { unionOrWard: data.presentAddress.unionOrWard }
          : {}),
        ...(data.presentAddress?.villageOrRoad
          ? { villageOrRoad: data.presentAddress.villageOrRoad }
          : {}),
      };
      setForm({ ...data });
    }
    if (!value) {
      setPermanentAddress({
        division: "",
        district: "",
        upozila: "",
        postOffice: "",
        postalCode: "",
      });
      const data = form;
      delete data.permanentAddress;
      setForm({ ...data });
    }
  };

  const resetAll = () => {
    setForm({});
    setErrors({});
    setVerifyFields({});
    setPhoto(null);
    setPin(null);
    setNid(null);
    setDisableVerifyBtn(false);
    setPresentAddress({
      division: "",
      district: "",
      upozila: "",
      postOffice: "",
      postalCode: "",
    });
    setPermanentAddress({
      division: "",
      district: "",
      upozila: "",
      postOffice: "",
      postalCode: "",
    });
    setIsChecked(false);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };



  return (
    <div ref={topRef} className="bg-white shadow rounded-xl p-6 w-full sm:mt-8 md:mt-8 lg:mt-0">
      <h1 className="sm:text-lg lg:text-2xl font-medium mb-5">EC Verification</h1>
      <hr className="text-gray-300 py-2" />
      <div className="flex gap-4">
        <div className="w-[60%] border border-gray-300 pt-2 rounded-lg p-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {fields.map((item) => {
                if (item.fields) {
                  return (
                    <div key={item.label}>
                      <div className="flex items-center gap-2">
                        <h2 className="font-medium">{item.label}</h2>
                        {item.label === "Permanent Address" && (
                          <div className="flex items-center gap-2">
                            <input
                              name="addressSameAsPresent"
                              id="addressSameAsPresent"
                              type="checkbox"
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="text-sm font-medium capitalize"
                              htmlFor="addressSameAsPresent"
                            >
                              Same as Present Address
                            </label>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        {item.fields.map((f) => (
                          <Input
                            key={f.label}
                            input={f}
                            onChange={onChange}
                            onBlur={validateForm}
                            error={errors[`${f.parent}.${f.name}`]}
                            verify={
                              verifyFields &&
                              verifyFields[`${f.parent}.${f.name}`]
                            }
                            presentAddress={presentAddress}
                            permanentAddress={permanentAddress}
                            form={form}
                            setPresentAddress={setPresentAddress}
                            setPermanentAddress={setPermanentAddress}
                            setForm={setForm}
                            divisions={divisions}
                            districts={districts}
                            thanas={thanas}
                            postOffices={postOffices}
                            postalCodes={postalCodes}
                          />
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Input
                    form={form}
                    setForm={setForm}
                    key={item.label}
                    input={item}
                    onChange={onChange}
                    onBlur={validateForm}
                    error={errors[item.name]}
                    verify={verifyFields && verifyFields[item?.name]}
                    divisions={divisions}
                    districts={districts}
                    thanas={thanas}
                    postOffices={postOffices}
                    postalCodes={postalCodes}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                );
              })}
              <button
                type="submit"
                disabled={loading || disableVerifyBtn}
                className={`px-4 py-2 bg-[#003970] text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 mt-4  ${
                  loading || disableVerifyBtn
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } font-medium`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <p>Please wait...</p>
                  </div>
                ) : (
                  "Verify"
                )}
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-800 disabled:opacity-50 mt-4 cursor-pointer font-medium"
              >
                Reset All
              </button>
            </div>
          </form>
        </div>
        <div className="w-[40%]">
          <div className="flex flex-col items-center border border-gray-300 pt-2 rounded-lg w-full min-h-[500px]">
            <h2 className="text-base font-medium text-center mb-2">Photo</h2>
            <img
              src={photo || "/assests/dummy-user.jpeg"}
              alt="Verification Photo"
              width={200}
              height={200}
            />
            {pin && nid ? (
              <div>
                <p className="text-base font-medium text-center my-2">
                  NID : {nid ?? "N/A"}
                </p>
                <p className="text-base font-medium text-center mt-2">
                  Pin : {pin ?? "N/A"}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="w-full h-[300px]"></div>
    </div>
  );
};

export default Page;
