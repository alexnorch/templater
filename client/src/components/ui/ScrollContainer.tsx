import { Stack } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled(Stack)({
    overflowY: "auto",
    paddingRight: 18,
    "&::-webkit-scrollbar": {
        width: "10px",
    },
    "&::-webkit-scrollbar-track": {
        background: "none",
    },
    "&::-webkit-scrollbar-thumb": {
        background: "none",
    },
    "&:hover::-webkit-scrollbar-track": {
        background: "#ddd",
        borderRadius: '10px'
    },
    "&:hover::-webkit-scrollbar-thumb": {
        background: "#1976d2",
        borderRadius: '10px'
    }
});

const ScrollContainer: React.FC<any> = (props) => {
    return (
        <Container {...props}>
            {props.children}
        </Container>
    )
}
export default ScrollContainer