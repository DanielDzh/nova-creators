import { SparkIcon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="border-line border-t pb-28 md:pb-0">
      <div className="text-muted mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-white">
          <SparkIcon className="size-4" />
          <span className="font-display font-bold tracking-wide">NOVA</span>
        </div>
        <p className="max-w-md">
          Усі персонажі NOVA — віртуальні. Їхні образи створені генеративними нейромережами, а збіги
          з реальними людьми випадкові.
        </p>
        <p>© {new Date().getFullYear()} NOVA</p>
      </div>
    </footer>
  );
}
