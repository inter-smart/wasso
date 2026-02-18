import DOMPurify from "isomorphic-dompurify";

/**
 * Convert Strapi Rich Text Blocks → Safe HTML
 * FULL SUPPORT for Strapi Rich Text Editor
 */
export function convertRichTextToHtml(blocks = []) {
    if (!Array.isArray(blocks)) return "";

    let html = "";
    let inList = false;
    let listType = "ul";

    const closeList = () => {
        if (inList) {
            html += `</${listType}>`;
            inList = false;
        }
    };

    const renderInline = (children = []) =>
        children
            .map((c) => {
                let content = "";

                // Text node
                if (c.text) content = c.text;

                // Inline children
                if (c.children) content = renderInline(c.children);

                // Inline styles
                if (c.bold) content = `<strong>${content}</strong>`;
                if (c.italic) content = `<em>${content}</em>`;
                if (c.underline) content = `<u>${content}</u>`;
                if (c.strikethrough) content = `<s>${content}</s>`;
                if (c.code) content = `<code class="px-1 bg-gray-100 rounded">${content}</code>`;

                // Link
                if (c.type === "link" && c.url) {
                    const target = c.target ? ` target="${c.target}"` : "";
                    const rel =
                        c.rel || c.target === "_blank"
                            ? ` rel="${c.rel || "noopener noreferrer"}"`
                            : "";

                    return `<a href="${c.url}" class="underline"${target}${rel}>${renderInline(
                        c.children
                    )}</a>`;
                }

                return content;
            })
            .join("");

    blocks.forEach((block, i) => {
        const { type, children = [], level, format, image } = block;
        const content = renderInline(children);

        switch (type) {
            case "paragraph":
                closeList();
                html += `<p>${content}</p>`;
                break;

            case "heading": {
                closeList();
                const tag = `h${Math.min(Math.max(level || 4, 1), 6)}`;
                html += `<${tag}>${content}</${tag}>`;
                break;
            }

            case "list": {
                const tag = format === "ordered" ? "ol" : "ul";
                html += `<${tag}>`;
                children.forEach((listItem) => {
                    if (listItem.type === "list-item") {
                        html += `<li>${renderInline(listItem.children)}</li>`;
                    }
                });
                html += `</${tag}>`;
                break;
            }

            case "quote":
                closeList();
                html += `<blockquote class="border-l-4 pl-4 italic">${content}</blockquote>`;
                break;

            case "code":
                closeList();
                html += `<pre><code class="block p-4 bg-gray-900 text-white rounded">${content}</code></pre>`;
                break;

            case "image": {
                closeList();
                if (image?.url) {
                    html += `<img src="${image.url}" alt="${image.alternativeText || ""}" loading="lazy" />`;
                }
                break;
            }

            case "horizontal-rule":
                closeList();
                html += `<hr />`;
                break;

            default:
                closeList();
                html += `<p>${content}</p>`;
        }
    });

    closeList();

    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            "p",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "ul",
            "ol",
            "li",
            "strong",
            "em",
            "u",
            "s",
            "code",
            "pre",
            "blockquote",
            "a",
            "img",
            "hr",
        ],
        ALLOWED_ATTR: [
            "href",
            "target",
            "rel",
            "class",
            "src",
            "alt",
            "loading",
        ],
    });
}

/**
 * Convert Alternative Features → Safe HTML
 */
export function convertAltFeatureToHtml(altFeatures = []) {
    if (!Array.isArray(altFeatures)) return "";

    const html = altFeatures
        .map((alt, index) => {
            const labelHtml = alt?.label ? `<strong>${alt.label}</strong>` : "";

            const valueHtml = alt?.value
                ? `<p>${alt.value.replace(/\n/g, "<br />")}</p>`
                : "";

            return `<div data-index="${index}">${labelHtml}${valueHtml}</div>`;
        })
        .join("");

    return DOMPurify.sanitize(html);
}
