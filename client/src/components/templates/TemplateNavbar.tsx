import { Stack } from "@mui/material"
import { TemplateAdd, TemplateFilter, TemplateSearch } from "."

const TemplateNavbar: React.FC = () => {
    return (
        <Stack flexDirection='row' justifyContent='space-between'>
            <Stack flexDirection='row' alignItems='center' gap={2}>
                <TemplateSearch />
                <TemplateFilter />
            </Stack>
            <TemplateAdd />
        </Stack>
    )
}
export default TemplateNavbar