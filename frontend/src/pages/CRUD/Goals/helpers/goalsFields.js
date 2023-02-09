
const goalsFields = {
	id: { type: 'id', label: 'ID' },

    name: { type: 'string', label: 'Name',

    options: [

    { value: 'value', label: 'value' },

]

    },

    category: { type: 'relation_one', label: 'Category',

    options: [

    { value: 'value', label: 'value' },

]

    },

    author: { type: 'relation_one', label: 'Author',

    options: [

    { value: 'value', label: 'value' },

]

    },

    award: { type: 'string', label: 'Award',

    options: [

    { value: 'value', label: 'value' },

]

    },

    start_date: { type: 'string', label: 'Start Date',

    options: [

    { value: 'value', label: 'value' },

]

    },

    end_date: { type: 'string', label: 'End Date',

    options: [

    { value: 'value', label: 'value' },

]

    },

    reason: { type: 'string', label: 'Reason',

    options: [

    { value: 'value', label: 'value' },

]

    },

}

export default goalsFields;
