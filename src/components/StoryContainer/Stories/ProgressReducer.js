export const initialState = {
  progress: 0,
  stopProgress: false,
};

export const PROGRESS = 'PROGRESS',
  STOP_PROGRESS = 'STOP_PROGRESS';

export const progressReducer = (state, action) => {
  switch (action.type) {
    case PROGRESS:
      return {...state, progress: action.payload};

    case STOP_PROGRESS:
      return {...state, stopProgress: action.payload};
  }
};
