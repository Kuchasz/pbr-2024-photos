import { redirect } from "next/navigation";
import BasePage from "~/components/base-page";
import { formatMilliseconds, getStsImageUrl, sortBy } from "~/utils";
import images from "../../../data/images.json";
import teams from "../../../data/teams.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"


function timestampsMatch(timestamp1: number, timestamp2: number, accuracy: number): boolean {
  return Math.abs(timestamp1 - timestamp2) <= accuracy;
}

export default function HomePage({ params: { teamId, photoId } }: { params: { photoId: string; teamId: string } }) {

  const team = teams.find(i => i.id === teamId);
  if (!team) {
    return redirect('/nice-try');
  }

  const imagesForPlayers = team.times.map((time, index) => ({ time, name: `Player ${index + 1}`, images: sortBy(images.filter(i => timestampsMatch(i.time, time, 3000)), 'time') }));
  const imagesToShow = imagesForPlayers.flatMap(p => p.images.map(i => ({ ...p, ...i })));
  const initialPhoto = imagesToShow.find(i => i.time === Number(photoId))!;

  if (!initialPhoto) {
    return redirect('/nice-try');
  }

  return (
    <BasePage>
      <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16">
        <Carousel opts={{
          startIndex: imagesToShow.indexOf(initialPhoto)
        }} className="w-full text-black">
          <CarouselContent >
            {imagesToShow.map((i) => (
              <CarouselItem className="text-white" key={i.url}>
                <h3 className="text-lg">{i.name} ({formatMilliseconds(i.time)})</h3>
                <img src={getStsImageUrl(i.url)} alt={i.name} />
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
