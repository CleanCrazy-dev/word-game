const sortByOptions = [
    {
        label: 'Access Status',
        value: 'status',
    },
    {
        label: 'Level Status',
        value: 'level',
    },
];
export const accessStatusDesSort = ({ access: accessA }, { access: accessB }) => {
    if (accessA < accessB) { return -1; }
    return 0;
}
export const accessStatusAscSort = ({ access: accessA }, { access: accessB }) => {
    if (accessA > accessB) { return -1; }
    return 0;
}
export const levelDesSort = ({ level: levelA }, { level: levelB }) => {
    if (levelA < levelB) { return -1; }
    return 0;
}
export const levelAscSort = ({ level: levelA }, { level: levelB }) => {
    if (levelA > levelB) { return -1; }
    return 0;
}

export default sortByOptions;
