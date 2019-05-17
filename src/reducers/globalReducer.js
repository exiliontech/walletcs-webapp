export const initStateGlobal = {
  error: '',
  isLoadingContract: false,
  isLoadingMethod: false,
  success: ''
};

export const  globalReducer = (state, action) => {
  switch (action.type) {
    case 'set_global_error':
      return ({...state, error: action.payload});
    case 'set_global_success':
      return ({...state, success: action.payload});
    case 'set_is_loading_contract':
      return {...state, isLoadingContract: !state.isLoadingContract};
    case 'set_is_loading_method':
      return {...state, isLoadingMethod: !state.isLoadingMethod};
  }
};
