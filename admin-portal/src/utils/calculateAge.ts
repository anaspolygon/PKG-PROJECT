export const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); 

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };
  export const filesToBase64 = async (files: File[]): Promise<string[]> => {
    const promises = files.map((file) => fileToBase64(file))
    return Promise.all(promises)
  }
