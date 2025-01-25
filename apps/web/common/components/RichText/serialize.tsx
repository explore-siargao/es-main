import React, { Fragment } from "react"
// @ts-ignore
import escapeHTML from "escape-html"
import { Text } from "slate"
import Image from "next/image"

const serialize = (children: any) =>
  children.map((node: any, i: any) => {
    if (Text.isText(node)) {
      let text = (
        <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
      )

      // @ts-ignore
      if (node.bold) text = <strong key={i}>{text}</strong>
      // @ts-ignore
      if (node.code) text = <code key={i}>{text}</code>
      // @ts-ignore
      if (node.italic) text = <em key={i}>{text}</em>
      // @ts-ignore
      if (node.underline) text = <u key={i}>{text}</u>
      // @ts-ignore
      if (node.strikethrough) text = <s key={i}>{text}</s>
      // @ts-ignore
      if (node.url)
        text = (
          <a key={i} href="#">
            {text}
          </a>
        )

      return <Fragment key={i}>{text}</Fragment>
    }

    if (!node) return null

    switch (node.type) {
      case "h1":
        return <h1 key={i}>{serialize(node.children)}</h1>
      case "h2":
        return <h2 key={i}>{serialize(node.children)}</h2>
      case "h3":
        return <h3 key={i}>{serialize(node.children)}</h3>
      case "h4":
        return <h4 key={i}>{serialize(node.children)}</h4>
      case "h5":
        return <h5 key={i}>{serialize(node.children)}</h5>
      case "h6":
        return <h6 key={i}>{serialize(node.children)}</h6>
      case "blockquote":
        return <blockquote key={i}>{serialize(node.children)}</blockquote>
      case "ul":
        return <ul key={i}>{serialize(node.children)}</ul>
      case "ol":
        return <ol key={i}>{serialize(node.children)}</ol>
      case "li":
        return <li key={i}>{serialize(node.children)}</li>
      case "link":
        return (
          <a
            href={escapeHTML(node.url)}
            key={i}
            target={node.newTab ? "_blank" : "_self"}
          >
            {serialize(node.children)}
          </a>
        )
      case "upload":
        return (
          <Image
            key={i}
            src={node.value.url}
            alt={node.value.alt}
            width={node.value.width}
            height={node.value.height}
            className="rounded-xl"
          />
        )
      case "indent":
        const indentLevel = node.level || 1
        const indentSize = indentLevel * 24
        return (
          <div key={i} style={{ marginLeft: `${indentSize}px` }}>
            {serialize(node.children)}
          </div>
        )
      default:
        return <p key={i}>{serialize(node.children)}</p>
    }
  })

export default serialize
