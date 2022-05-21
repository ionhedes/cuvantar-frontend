import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import {logoutUser} from "../services/AuthService";
import {attachRouter} from "../services/CommonService";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

class SearchableNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', alignment: 'front'};

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleOnChange(event) {
        this.setState({value: event.target.value})
    }

    handleSearch(event) {
        if (event.key === "Enter" && this.state.value !== "") {
            this.props.router.navigate(`/search/${this.state.value}/${this.state.alignment}`);
        }
    }

    handleLogout(event) {
        logoutUser().then(() => {
            sessionStorage.clear();
            this.props.router.navigate('/');
        });
    }

    handleChange = (event, newAlignment) => {
        this.setState({
            alignment: newAlignment
        })
    }

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            Cuvântar
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                value={this.state.value}
                                onChange={this.handleOnChange}
                                onKeyDown={this.handleSearch}
                            />
                        </Search>
                        <ToggleButtonGroup
                            color="warning"
                            value={this.state.alignment}
                            exclusive
                            onChange={this.handleChange}
                            sx={{backgroundColor: "rgba(255,255,255,0.15)"}}
                        >
                            <ToggleButton value="front" sx={{color: "#ffffff"}}>Front</ToggleButton>
                            <ToggleButton value="back" sx={{color: "#ffffff"}}>Back</ToggleButton>
                        </ToggleButtonGroup>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: 'flex', whiteSpace: "nowrap" }}>
                            <Button variant="contained"
                                    color="error"
                                    onClick={this.handleLogout}
                            >
                                Log out
                            </Button>
                        </Box>

                    </Toolbar>
                </AppBar>
                <Toolbar />
            </Box>
        );
    }
}

export default attachRouter(SearchableNavbar);