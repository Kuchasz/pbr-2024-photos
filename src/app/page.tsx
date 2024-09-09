import Autocomplete from "~/components/autocomplete";
import teams from "../data/teams.json";
import BasePage from "~/components/base-page";

export default function HomePage() {

  return (
    <BasePage>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Find your team's photos
        </h1>
        {/* {teams.map((team) => (<div key={team.id}>{team.name}</div>))} */}

        <Autocomplete options={teams.map(t => ({ label: t.name, value: t.id }))} />

      </div>
    </BasePage>
  );
}
