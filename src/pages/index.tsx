import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CustomBreadcrumb from '../components/BreadCrumb';

const Root = () => {
    const navigate = useNavigate();
    
    const handleClick = (data: string) => {
        switch (data) {
            case "home":
                return navigate("/")
            case "administrator":
                return navigate("/")
            case "user_list":
                return navigate("/user")
            default:
                return navigate("/")
        }
    }


    const breadcrumbItems = [
        { label: 'Home', onClick: () => handleClick("home"), selected: true },
        { label: 'Administrators', onClick: () => handleClick("administrator"), selected: true },
        { label: 'user list', onClick: () => handleClick("user_list"), selected: true }
    ];

    return (
        <>
            <CustomBreadcrumb handleClick={handleClick} breadcrumbItems={breadcrumbItems} />

            <Typography variant="h6" gutterBottom>
                Click on user list <ArrowRightAltIcon/>
            </Typography>
        </>
    )
}

export default Root