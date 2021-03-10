import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { useReducer } from "react";

import { allPokemonReducer, AllPokemonResponse } from "../reducers";
import { get } from "../utils";

interface ServerProps {
  data: AllPokemonResponse;
}

const Home: NextPage<ServerProps> = ({ data }) => {
  const [state, dispatch] = useReducer(allPokemonReducer, {
    pokemons: data.results,
    nextPage: data.next,
    isLoading: false,
    error: null,
  });

  const handleLoadMore = async () => {
    try {
      dispatch({ type: "LOADING_MORE" });
      const payload = await get(state.nextPage);
      dispatch({ type: "LOADING_MORE_SUCCESS", payload });
    } catch (error) {
      dispatch({ type: "LOADING_MORE_FAILURE", error: error.message });
    }
  };

  return (
    <main>
      <h1>Pokemon</h1>
      <ul>
        {state.pokemons.map((pokemon) => (
          <li key={pokemon.name}>
            <article>
              <Link href={pokemon.name}>{pokemon.name}</Link>
            </article>
          </li>
        ))}
      </ul>
      {state.isLoading && <p>Loading more...</p>}
      {state.error && <p>{state.error}</p>}
      <button onClick={handleLoadMore}>Load more</button>
    </main>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await get("https://pokeapi.co/api/v2/pokemon");
  return {
    props: { data },
  };
};
