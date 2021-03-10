import { GetServerSideProps, NextPage } from "next";

import { get } from "../utils/fetching";

interface PokemonDetailResponse {
  base_experience: string;
  height: number;
  name: string;
  weight: number;
}

interface ServerProps {
  data: PokemonDetailResponse;
}

const PokemonDetailPage: NextPage<ServerProps> = ({ data }) => {
  return (
    <main>
      <h1>{data.name}</h1>
      <p>
        <strong>Height:</strong> {data.height}
      </p>
      <p>
        <strong>Weight:</strong> {data.weight}
      </p>
    </main>
  );
};

export default PokemonDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const data = await get(`https://pokeapi.co/api/v2/pokemon/${query.id}`);
  return {
    props: { data },
  };
};
