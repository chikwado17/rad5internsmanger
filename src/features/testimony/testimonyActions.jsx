

export const createTestimony = (testimony) => ({
    type: 'CREATE_TESTIMONY',
    testimony
});


export const updateTestimony = (testimony) => ({
    type: 'UPDATE_TESTIMONY',
    testimony
});

export const deleteTestimony = (testimonyId) => ({
    type: 'DELETE_TESTIMONY',
    testimonyId
});
