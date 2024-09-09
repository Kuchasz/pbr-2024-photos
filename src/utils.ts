export function sortBy<T>(array: T[], key: keyof T, ascending = true): T[] {
    return array.sort((a, b) => {
        if (a[key] < b[key]) {
            return ascending ? -1 : 1;
        }
        if (a[key] > b[key]) {
            return ascending ? 1 : -1;
        }
        return 0;
    });
}

export function formatMilliseconds(ms: number): string {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export const getStsImageUrl = (imageId: string) => `https://live.sts-timing.pl/businessrun2024/photo1/172.20.23.182_01_20240908${imageId}`;

export const getPlayerName = (teamId: string, index: number) => `Player: ${teamId} / ${['A', 'B', 'C', 'D', 'E'][index]}`;