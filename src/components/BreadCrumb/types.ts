export interface IBreadCrumbItem {
    label?: any,
    onClick?: any,
    selected?: any
}

export interface ICustomBreadcrumb {
    handleClick:any, 
    breadcrumbItems:IBreadCrumbItem[]
}