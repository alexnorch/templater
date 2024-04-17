import { Stack, Divider } from "@mui/material"
import { TemplateAdd, TemplateSearch } from "."
import { FilterByCategory, FilterByAttribute, FilterByAttributeValue } from "../filters"

const TemplateNavbar: React.FC = () => {
    return (
        <Stack >
            <Stack flexDirection={{ sm: 'row' }} justifyContent='space-between'>
                <Stack flexDirection='row' gap={2}>
                    <TemplateSearch />
                    <Divider orientation="vertical" />
                    <FilterByCategory />
                    <Divider orientation="vertical" />
                    <FilterByAttribute />
                </Stack>
                <TemplateAdd />
            </Stack>
            <Divider sx={{ mt: 1 }} />
            <Stack mt={1}>
                <FilterByAttributeValue />
            </Stack>
        </Stack>
    )
}
export default TemplateNavbar