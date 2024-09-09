export default function BasePage({ children }: { children: React.ReactNode }) {

    return (
        <main className="flex min-h-screen h-full flex-col items-center justify-center bg-gradient-to-b from-[#f39500] to-[#ea5601] text-white">
            {children}
        </main>
    );
}
