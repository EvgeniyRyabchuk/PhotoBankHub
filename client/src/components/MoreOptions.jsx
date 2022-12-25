import { Menu, MenuItem } from "@mui/material";
import PencilIcon from "../assets/icons/PencilIcon";
import {Small} from "../assets/typography";
import DeleteIcon from "../assets/icons/DeleteIcon";

// component props interface

// interface MoreOptionsProps {
//     open?: boolean;
//     anchorEl: HTMLElement | null;
//     handleMoreClose: () => void;
// }

const MoreOptions = ({ anchorEl, handleMoreClose }) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMoreClose}
        >
            <MenuItem
                onClick={handleMoreClose}
                sx={{ "&:hover": { color: "primary.main" } }}
            >
                <PencilIcon sx={{ fontSize: 14, marginRight: 1 }} />
                <Small fontWeight={500}>Edit</Small>
            </MenuItem>
            <MenuItem
                onClick={handleMoreClose}
                sx={{ "&:hover": { color: "primary.main" } }}
            >
                <DeleteIcon sx={{ fontSize: 14, marginRight: 1 }} />
                <Small fontWeight={500}>Remove</Small>
            </MenuItem>
        </Menu>
    );
};

export default MoreOptions;
