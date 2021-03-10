export interface Result {
  name: string;
  url: string;
}

export interface AllPokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
}

type ActionTypes =
  | "LOADING_MORE"
  | "LOADING_MORE_SUCCESS"
  | "LOADING_MORE_FAILURE";

interface Action {
  type: ActionTypes;
  payload?: AllPokemonResponse;
  error?: string;
}

interface State {
  pokemons: Result[];
  nextPage: string | undefined;
  isLoading: boolean;
  error: string | null;
}

export const allPokemonReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOADING_MORE":
      return { ...state, isLoading: true };
    case "LOADING_MORE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        nextPage: action.payload.next,
        pokemons: [...state.pokemons, ...action.payload.results],
      };
    case "LOADING_MORE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      throw new Error();
  }
};
