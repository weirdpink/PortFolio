// Editorial section marker, e.g. [ 01 / ABOUT ]
export function SectionMarker({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <div className="eyebrow flex items-center gap-3">
      <span>[ {index} ]</span>
      <span className="h-px w-8 bg-black/20 dark:bg-white/25" />
      <span>{label}</span>
    </div>
  );
}
