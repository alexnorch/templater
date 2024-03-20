import { Stack } from "@mui/material"
import { TemplateAdd, TemplateFilter, TemplateSearch } from "."

const TemplateNavbar: React.FC = () => {
    return (
        <Stack flexDirection='row' justifyContent='space-between'>
            <TemplateSearch />
            <Stack flexDirection='row' alignItems='center' gap={2}>
                <TemplateAdd />
                <TemplateFilter />
            </Stack>

        </Stack>
    )
}
export default TemplateNavbar