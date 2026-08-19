import Image from "next/image";

export function MacBookFrame({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[28rem] sm:max-w-[34rem] lg:max-w-none">
      <div className="relative">
        <div className="rounded-[14px] bg-gradient-to-b from-[#3f3f46] to-[#18181b] p-[8px] shadow-[0_28px_60px_-28px_rgba(15,23,42,0.55)] ring-1 ring-black/20 sm:rounded-[18px] sm:p-[10px] 2xl:rounded-[22px] 2xl:p-[12px]">
          <div className="relative mb-1 flex h-2.5 items-center justify-center sm:mb-1.5 sm:h-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#27272a] ring-1 ring-black/40" />
          </div>
          <div className="relative aspect-[16/10.2] overflow-hidden rounded-[6px] bg-[#0f172a] sm:rounded-[8px]">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-[16%_8%]"
              priority
              sizes="(min-width: 1536px) 720px, (min-width: 1280px) 560px, (min-width: 1024px) 46vw, 88vw"
            />
          </div>
        </div>
        <div
          className="relative mx-auto h-[10px] w-[72%] rounded-b-[4px] bg-gradient-to-b from-[#d4d4d8] to-[#a1a1aa]"
          aria-hidden
        />
        <div
          className="mx-auto h-[7px] w-[92%] rounded-b-[10px] bg-gradient-to-b from-[#a1a1aa] via-[#d4d4d8] to-[#71717a] shadow-[0_10px_24px_-8px_rgba(15,23,42,0.35)]"
          aria-hidden
        />
      </div>
    </div>
  );
}
