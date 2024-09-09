import BasePage from "~/components/base-page";
import teams from "../data/teams.json";
import BetterAutocomplete from "~/components/better-autocomplete";
import ForkMeOnGithub from "~/components/gh";

export default function HomePage() {

  return (
    <BasePage>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div><img className="max-h-24" src="logo-fundacja.png"></img><span className="font-medium">Poland Business Run 2024</span></div>
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Find your team&apos;s photos
        </h1>
        <ForkMeOnGithub repoUrl="https://github.com/Kuchasz/pbr-2024-photos" />
        {/* {teams.map((team) => (<div key={team.id}>{team.name}</div>))} */}

        <BetterAutocomplete options={teams.map(t => ({ label: t.name, value: t.id }))} />

      </div>
    </BasePage>
  );
}
