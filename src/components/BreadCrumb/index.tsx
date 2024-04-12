import { Typography, Stack, Breadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IBreadCrumbItem, ICustomBreadcrumb } from './types';

const BreadcrumbItem = (props: IBreadCrumbItem) => {
    const { label, onClick, selected } = props;
    const color = selected ? 'text.primary' : 'text.secondary';

    return (
        <Typography color={color} onClick={onClick} style={{ cursor: 'pointer' }}>
            {label}
        </Typography>
    );
};

const CustomBreadcrumb = (props: ICustomBreadcrumb) => {
    const { handleClick, breadcrumbItems } = props;
    return (
        <Stack spacing={2} sx={{ my: 2 }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbItems.map((item: IBreadCrumbItem, index: number) => (
                    <BreadcrumbItem key={index} onClick={handleClick} {...item} />
                ))}
            </Breadcrumbs>
        </Stack>
    );
};

export default CustomBreadcrumb;