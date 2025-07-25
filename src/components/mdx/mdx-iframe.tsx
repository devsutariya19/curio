export function MdxIframe({ src, title }: { src: string; title?: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded border bg-muted shadow">
      <iframe
        src={src}
        title={title}
        className="h-full w-full border-0"
        allowFullScreen
      />
    </div>
  );
}
