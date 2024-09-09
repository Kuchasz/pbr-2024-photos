import { redirect } from "next/navigation";
import BasePage from "~/components/base-page";
import { formatMilliseconds, getStsImageUrl, sortBy } from "~/utils";
import images from "../../data/images.json";
import teams from "../../data/teams.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"
import Link from "next/link";


function timestampsMatch(timestamp1: number, timestamp2: number, accuracy: number): boolean {
  return Math.abs(timestamp1 - timestamp2) <= accuracy;
}

export default function HomePage({ params: { teamId } }: { params: { teamId: string } }) {

  const team = teams.find(i => i.id === teamId);
  if (!team) {
    return redirect('/nice-try');
  }

  const imagesForPlayers = team.times.map((time, index) => ({ time, name: `Player ${index + 1}`, images: sortBy(images.filter(i => timestampsMatch(i.time, time, 3000)), 'time') }));
  const imagesToShow = imagesForPlayers.flatMap(p => p.images.map(i => ({ ...p, ...i })));

  return (
    <BasePage>
      <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          #{team.id} {team.name}
        </h1>

        <Carousel className="w-full text-black">
          <CarouselContent>
            {imagesToShow.map((i) => (
              <CarouselItem className="basis-1/3 text-white" key={i.url}>
                <Link href={`/${teamId}/${i.time}`}>
                  <h3 className="text-lg">{i.name} ({formatMilliseconds(i.time)})</h3>
                  <img src={getStsImageUrl(i.url)} alt={i.name} />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </BasePage>
  );
}
