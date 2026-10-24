/**
 * The cover a text gets when it has no picture: a black panel with focus lines
 * running into a seal of its shelf number, the way a tankōbon cover frames its
 * title. Decorative — the card it sits in already carries the title as text —
 * so it is hidden from assistive technology and holds no heading.
 */
export function MangaCover({
  number,
  label,
  align = 'center',
  className = '',
}: {
  number: number;
  label?: string;
  /** "top" keeps the seal clear of text laid over the bottom of the cover. */
  align?: 'center' | 'top';
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`manga-cover flex flex-col items-center gap-2 ${
        align === 'top' ? 'justify-start pt-8 md:pt-12' : 'justify-center'
      } ${className}`}
    >
      <span className="sigil sigil-lg !border-[#f7f4ee] !text-[#f7f4ee] bg-[#14110f]">{number}</span>
      {label && (
        <span className="font-sans text-2xs font-semibold uppercase tracking-widest text-[#f7f4ee]/80">
          {label}
        </span>
      )}
    </div>
  );
}
