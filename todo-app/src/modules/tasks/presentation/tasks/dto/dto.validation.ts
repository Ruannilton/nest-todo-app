export const TASK_TITLE_VALIDATION = {
  minLength: 3,
  maxLength: 200,
};

export const TASK_DESCRIPTION_VALIDATION = {
  minLength: 5,
  maxLength: 1000,
};

export const PAGINATION_VALIDATION = {
  page: {
    min: 1,
    default: 1,
  },
  limit: {
    min: 1,
    max: 100,
    default: 10,
  },
};

export const TITLE_FILTER_VALIDATION = {
  maxLength: 200,
};
