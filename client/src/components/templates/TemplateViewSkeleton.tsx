import { Skeleton, Stack } from "@mui/material";

const TemplateViewSkeleton: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Skeleton variant="rectangular" height={30} />
      <Skeleton variant="rectangular" height={250} />
      <Stack flexDirection="row" gap={2}>
        <Skeleton variant="rounded" height={30} width={40} />
        <Skeleton variant="rounded" height={30} width={40} />
      </Stack>
    </Stack>
  );
};

export default TemplateViewSkeleton;
