import { Box, TextField, Typography, Button } from '@mui/material';
import { IFilterComponentProps } from './types';

const FilterComponent = (props:IFilterComponentProps) => {

    const {handleChange, handleSearch} = props;
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", my: 3 }}>
                <Box>
                    <Typography variant="subtitle1" gutterBottom>
                        First Name
                    </Typography>
                    <TextField onChange={handleChange} name="firstName" id="firstName" placeholder="First Name" variant="outlined" size='small' />
                </Box>


                <Box>
                    <Typography variant="subtitle1" gutterBottom>
                        Last Name
                    </Typography>
                    <TextField onChange={handleChange} name="lastName" id="lastName" placeholder="Last Name" variant="outlined" size='small' />
                </Box>

                <Box>
                    <Typography variant="subtitle1" gutterBottom>
                        Email
                    </Typography>
                    <TextField onChange={handleChange} name="email" id="email" placeholder="Email" variant="outlined" size='small' />
                </Box>

                <Box>
                    <Typography variant="subtitle1" gutterBottom>
                        Username
                    </Typography>
                    <TextField onChange={handleChange} name="username" id="username" placeholder="Username" variant="outlined" size='small' />
                </Box>

                <Box sx={{ display: "flex", alignItems: "end" }}>
                    <Button onClick={handleSearch} variant="contained">Search</Button>
                </Box>
            </Box>
        </>
    )
}

export default FilterComponent