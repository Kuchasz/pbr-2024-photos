import BasePage from "~/components/base-page";
import teams from "../data/teams.json";
import BetterAutocomplete from "~/components/better-autocomplete";

export default function HomePage() {

  return (
    <BasePage>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Find your team&apos;s photos
        </h1>
        {/* {teams.map((team) => (<div key={team.id}>{team.name}</div>))} */}

        <BetterAutocomplete options={teams.map(t => ({ label: t.name, value: t.id }))} />

      </div>
    </BasePage>
  );
}
