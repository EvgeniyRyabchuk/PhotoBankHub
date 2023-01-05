
const defOrderSortOrderData = [
    {
        id: 1,
        name: 'Дата публикации',
        value: 'created_at',
        order: 'asc',
        selected: true
    },
    {
        id: 2,
        name: 'Дата публикации',
        value: 'created_at',
        order: 'desc',
        selected: false
    },

    {
        id: 3,
        value: 'status',
        order: 'asc',
        name: 'Просмотрам',
        selected: false
    },
    {
        id: 4,
        value: 'status',
        order: 'desc',
        name: 'Просмотрам',
        selected: false
    },

    {
        id: 5,
        value: 'deadline',
        order: 'asc',
        name: 'Скачиваниям',
        selected: false
    },
    {
        id: 6,
        value: 'deadline',
        order: 'desc',
        name: 'Скачиваниям',
        selected: false
    }
];

export const getSortOrderOptionValue = (option) => {
    return `${option.name} ${option.order === 'desc' ? '(по убыванию)' : '(по возрастанию)'}`
}

export default defOrderSortOrderData;