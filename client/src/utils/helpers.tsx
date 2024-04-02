export const formatTemplateData = (data: any) => {
  const attributeValues = Object.values(data.attributeValues).filter(
    (item) => typeof item === "string" && item.length !== 0
  );

  return {
    ...data,
    category: data.category._id || data.category,
    text: typeof data.text === "string" ? data.text : JSON.stringify(data.text),
    attributeValues,
  };
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
};
