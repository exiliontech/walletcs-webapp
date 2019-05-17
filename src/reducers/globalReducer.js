export const initStateGlobal = {
  error: '',
  isLoadingContract: false,
  isLoadingMethod: false,
  success: '',
  appIsLoaded: false
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
    case 'set_app_is_loaded':
      return {...state, appIsLoaded: !state.appIsLoaded}
    default:
      throw new Error(`Unexpected param: ${action.type}`)
  }
};
