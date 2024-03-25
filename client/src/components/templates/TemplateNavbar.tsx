import { Stack } from "@mui/material"
import { TemplateAdd, TemplateFilter, TemplateSearch } from "."

const TemplateNavbar: React.FC = () => {
    return (
        <Stack flexDirection={{ sm: 'row' }} justifyContent='space-between'>
            <TemplateSearch />
            <Stack mt={{ xs: 2, sm: 0 }} flexDirection='row' alignItems='center' gap={2}>
                <TemplateAdd />
                <TemplateFilter />
            </Stack>
        </Stack>
    )
}
export default TemplateNavbar