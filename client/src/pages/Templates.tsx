import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import CategoriesNav from "../components/categories/CategoriesNav";
import TemplateFilter from "../components/templates/TemplateFilter";
import TemplatesList from "../components/templates/TemplatesList";
import TemplateAdd from "../components/templates/TemplateAdd";
import CategoriesOptions from "../components/categories/CategoriesOptions";
import useAuthAxios from "../hooks/useAuthAxios";

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const { queryObj } = useSelector((state: RootState) => state.template);
  const { category } = useParams();

  const { authAxios } = useAuthAxios();

  useEffect(() => {
    const getTemplates = async () => {
      const { data } = await authAxios.get("/api/templates/", {
        params: {
          gender: queryObj.gender,
          language: queryObj.language,
          title: queryObj.title,
          category: category?.toLocaleLowerCase() || "",
        },
      });

      setTemplates(data);
    };

    getTemplates();
  }, [queryObj.gender, queryObj.title, queryObj.language, category]);

  return (
    <>
      <Typography component="h2" variant="h5">
        Categories
      </Typography>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <CategoriesNav />
        <CategoriesOptions />
      </Stack>
      <Divider sx={{ margin: "10px 0" }} />
      <Box my={2}>
        <TemplateFilter />
      </Box>
      <TemplatesList templates={templates} />
      <TemplateAdd />
    </>
  );
};

export default Templates;
