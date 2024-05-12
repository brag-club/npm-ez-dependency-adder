import Contributors from "@/components/Contributors";
import Dependencies from "@/components/Dependencies";
import SearchResults from "@/components/SearchResults";
import SettingsButton from "@/components/SettingsButton";

export default function Home() {
    return (
        <main className="mx-auto flex h-screen justify-center px-28 py-8 overflow-hidden">
            <div className="flex w-1/2 flex-col px-4 h-full">
                <SearchResults />
            </div>

            <div className="flex w-1/2 flex-col px-4 py-0 h-full">
                <SettingsButton />
                <div className="flex flex-col h-full overflow-hidden">
                    <Dependencies />
                </div>
                <Contributors />
            </div>
        </main>
    );
}
