import { Skeleton, Stack } from "@mui/material";

const TemplatesListSkeleton: React.FC = () => {
  const skeletonItems = Array.from(Array(6).keys()).map((item) => (
    <Skeleton key={item} variant="rectangular" height={50} />
  ));

  return <Stack spacing={2}>{skeletonItems}</Stack>;
};

export default TemplatesListSkeleton;
