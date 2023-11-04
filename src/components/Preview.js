import React, { useEffect, memo } from 'react';
import Prism from "prismjs";
import '../styles/prism.css';
import MarkdownIt from 'markdown-it';
import MarkdownItAttrs from 'markdown-it-attrs';

function Preview({ value }) {
  useEffect(() => {
    // Initialize markdown-it
    const md = new MarkdownIt();
    // Use markdown-it-attrs plugin
    md.use(MarkdownItAttrs);

    // Customize the renderer
    const renderer = md.renderer;
    renderer.code = function (code) {
      // Give block codes Js class and pre element for Prism highlight.
      return `<pre><code class="language-javascript">${code}</code></pre>\n`;
    };
    // Give inline codes Js class for Prism highlight.
    renderer.codespan = function (code) {
      return `<code class="language-javascript">${code}</code>`;
    };

    // Render the markdown and highlight the code
    document.getElementById('preview').innerHTML = md.render(value);
    Prism.highlightAll();
  }, [value]);

  return (
    <>
      <div id='preview'></div>
    </>
  );
}

export default memo(Preview);
