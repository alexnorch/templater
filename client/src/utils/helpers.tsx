export const formatTemplateData = (data: any) => {
  const attributeValues = Object.values(data.attributeValues).filter(
    (item) => typeof item === "string"
  );

  return {
    ...data,
    category: data.category._id || data.category,
    attributeValues,
  };
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
};
