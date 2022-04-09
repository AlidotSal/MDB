// Solid's fine-grained exivalent to React's `useReducer` Hook
const useReducer = (reducer, state) => {
  const [store, setStore] = createState(state);
  const dispatch = (action) => {
    state = reducer(state, action);
    setStore(reconcile(state));
  };
  return [store, dispatch];
};

export default useReducer;
