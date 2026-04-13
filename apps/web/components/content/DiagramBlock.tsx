import Image from "next/image";

interface DiagramBlockProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function DiagramBlock({ src, alt, caption, width = 800, height = 450 }: DiagramBlockProps) {
  return (
    <figure className="my-8 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] overflow-hidden">
      <div className="p-4">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          unoptimized={src.endsWith('.svg')}
        />
      </div>
      {caption ? (
        <figcaption className="border-t border-[var(--color-border-subtle)] px-4 py-2 text-xs text-[var(--color-fg-muted)] bg-[var(--color-bg-panel-subtle)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
