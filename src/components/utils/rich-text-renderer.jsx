import parse from "html-react-parser";
import Image from "next/image";

export default function RichTextRenderer({ html }) {
  if (!html) return null;

  return parse(html, {
    replace: (domNode) => {
      if (domNode.name === "img" && domNode.attribs?.src) {
        const { src, alt, loading, ...rest } = domNode.attribs;
        return (
          <div className="relative w-full aspect-video my-4 overflow-hidden rounded bg-gray-100">
            <Image
              src={src}
              alt={alt || ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="object-cover"
            />
          </div>
        );
      }
    },
  });
}
