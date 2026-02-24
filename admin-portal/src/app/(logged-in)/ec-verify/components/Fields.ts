export const fields = [
  {
    label: "National ID",
    name: "nid",
    type: "number",
    placeholder: "National ID",
    required: true,
  },
  {
    label: "Date of birth",
    name: "dateOfBirth",
    type: "date",
    placeholder: "dd/mm/yyyy",
    required: true,
  },
  {
    label: "Name (In English)",
    name: "nameEn",
    type: "text",
    placeholder: "Enter name",
    required: true,
  },
  {
    label: "Name (In Bangla)",
    name: "name",
    type: "text",
    placeholder: "Enter name",
  },

  {
    label: "Father Name (In Bangla)",
    name: "father",
    type: "text",
    placeholder: "Enter father name",
  },
  {
    label: "Mother Name (In Bangla)",
    name: "mother",
    type: "text",
    placeholder: "Enter mother name",
  },
  {
    label: "Spouse Name (In Bangla)",
    name: "spouse",
    type: "text",
    placeholder: "Enter spouse name",
  },

  {
    label: "Present Address",
    fields: [
      // {
      //   label: "Postal Code (In Bangla)",
      //   name: "postalCode",
      //   type: "dropdown",
      //   placeholder: "Enter postal code",
      //   parent: "presentAddress",
      // },
      {
        label: "Division (In Bangla)",
        name: "division",
        type: "dropdown",
        placeholder: "Enter division",
        parent: "presentAddress",
      },
      {
        label: "District (In Bangla)",
        name: "district",
        type: "dropdown",
        placeholder: "Enter district",
        parent: "presentAddress",
      },
      // {
      //   label: "Post office (In Bangla)",
      //   name: "postOffice",
      //   type: "dropdown",
      //   placeholder: "Enter post office",
      //   parent: "presentAddress",
      // },
      {
        label: "Upazila (In Bangla)",
        name: "upozila",
        type: "dropdown",
        placeholder: "Enter upazila",
        parent: "presentAddress",
      },

      // {
      //   label: "Union or ward (In Bangla)",
      //   name: "unionOrWard",
      //   type: "text",
      //   placeholder: "Enter union or ward",
      //   parent: "presentAddress",
      // },

      // {
      //   label: "Village or road (In Bangla)",
      //   name: "villageOrRoad",
      //   type: "text",
      //   placeholder: "Enter village or road",
      //   parent: "presentAddress",
      // },
      // {
      //   label: "Region (In Bangla)",
      //   name: "region",
      //   type: "text",
      //   placeholder: "Enter region",
      //   parent: "presentAddress",
      // },
    ],
  },
  {
    label: "Permanent Address",
    fields: [
      // {
      //   label: "Postal Code (In Bangla)",
      //   name: "postalCode",
      //   type: "dropdown",
      //   placeholder: "Enter postal code",
      //   parent: "permanentAddress",
      // },
      {
        label: "Division (In Bangla)",
        name: "division",
        type: "dropdown",
        placeholder: "Enter division",
        parent: "permanentAddress",
      },
      {
        label: "District (In Bangla)",
        name: "district",
        type: "dropdown",
        placeholder: "Enter district",
        parent: "permanentAddress",
      },
      // {
      //   label: "Post office (In Bangla)",
      //   name: "postOffice",
      //   type: "dropdown",
      //   placeholder: "Enter post office",
      //   parent: "permanentAddress",
      // },
      {
        label: "Upazila (In Bangla)",
        name: "upozila",
        type: "dropdown",
        placeholder: "Enter upazila",
        parent: "permanentAddress",
      },

      // {
      //   label: "Union or ward (In Bangla)",
      //   name: "unionOrWard",
      //   type: "text",
      //   placeholder: "Enter union or ward",
      //   parent: "permanentAddress",
      // },
      // {
      //   label: "Village or road (In Bangla)",
      //   name: "villageOrRoad",
      //   type: "text",
      //   placeholder: "Enter village or road",
      //   parent: "permanentAddress",
      // },
      // {
      //   label: "Region (In Bangla)",
      //   name: "region",
      //   type: "text",
      //   placeholder: "Enter region",
      //   parent: "permanentAddress",
      // },
    ],
  },
  // {
  //   label:"",
  //   name: "addressSameAsPermanent",
  //   type: "checkbox",
  //   placeholder: "Same as Permanent Address"
  // },
];
