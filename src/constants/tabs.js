export const tabs = [
  {
    name: "Contact Info",
    inputs: [
      {
        name: "Name",
        type: "text",
        isRequired: false,
      },
      {
        name: "Email",
        type: "email",
        isRequired: true,
      },
      {
        name: "Phone",
        type: "tel",
        isRequired: false,
      },
    ],
  },
  {
    name: "Quantity",
    inputs: [
      {
        name: "Quantity",
        type: "number",
        isRequired: true,
      },
    ],
  },
  {
    name: "Price",
    inputs: [],
  },
  { name: "Done", inputs: [] },
];