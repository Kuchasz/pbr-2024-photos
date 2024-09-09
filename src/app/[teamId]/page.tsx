import { redirect } from "next/navigation";
import images from "../../data/images.json";
import teams from "../../data/teams.json";
import BasePage from "~/components/base-page";
import Image from "next/image";
import { formatMilliseconds, sortBy } from "~/utils";

function timestampsMatch(timestamp1: number, timestamp2: number, accuracy: number): boolean {
  return Math.abs(timestamp1 - timestamp2) <= accuracy;
}

const getStsImageUrl = (imageId: string) => `https://live.sts-timing.pl/businessrun2024/photo1/172.20.23.182_01_20240908${imageId}`;

export default function HomePage({ params: { teamId } }: { params: { teamId: string } }) {

  const team = teams.find(i => i.id === teamId);
  if (!team) {
    return redirect('/nice-try');
  }

  const imagesForPlayers = team.times.map((time, index) => ({ time, name: `Player ${index + 1}`, images: sortBy(images.filter(i => timestampsMatch(i.time, time, 5000)), 'time') }));

  return (
    <BasePage>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          #{team.id} {team.name}
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {imagesForPlayers.map(({ name, images, time }) => (
            <div key={name} className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
              <h3 className="text-2xl">{name} ({formatMilliseconds(time)})</h3>
              {images.length ? images.map(image => (<img width="300" height="200" key={image.url} src={getStsImageUrl(image.url)} alt={name} />)) : <div className="text-lg">No image found</div>}
            </div>
          ))}
        </div>


      </div>
    </BasePage>
  );
}
