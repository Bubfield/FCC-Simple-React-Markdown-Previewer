import { useState } from "react";
import { marked } from "marked";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowDownUpAcrossLine,
  faArrowsUpDownLeftRight,
} from "@fortawesome/free-solid-svg-icons";

const backTick = "`";

const backTickThree = "```";

const commentText = `// this is multi-line code:`;

const startingText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, ${backTick}<div></div>${backTick}, between 2 backticks.

${backTickThree}
${commentText} 

function anotherExample(firstLine, lastLine) {
  if (firstLine == '${backTickThree}' && lastLine == '${backTickThree}') {
    return multiLineCode;
  }
}
${backTickThree}

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartypants: false,
  xhtml: false,
});

function App() {
  const [text, setText] = useState(startingText);
  const [arrows, setArrows] = useState(false);

  const getMarkdownText = (text) => {
    let rawMarkup = marked.parse(text);
    return { __html: rawMarkup };
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleMaximize = (e) => {
    const targetClass = e.target.closest("div").parentNode.classList[0];
    const target = e.target.closest("div").parentNode;
    const editorWrap = document.querySelector(".editorWrap");
    const previewWrap = document.querySelector(".previewWrap");
    const editorWrapClass = editorWrap.classList[0];

    target.classList.add("maximized");
    if (targetClass !== editorWrapClass) {
      editorWrap.classList.add("hide");
    } else {
      previewWrap.classList.add("hide");
    }
    setArrows(true);
  };

  const handleMinimize = (e) => {
    const targetClass = e.target.closest("div").parentNode.classList[0];
    const target = e.target.closest("div").parentNode;
    const editorWrap = document.querySelector(".editorWrap");
    const previewWrap = document.querySelector(".previewWrap");
    const editorWrapClass = editorWrap.classList[0];

    target.classList.remove("maximized");
    if (targetClass !== editorWrapClass) {
      editorWrap.classList.remove("hide");
    } else {
      previewWrap.classList.remove("hide");
    }

    setArrows(false);
  };

  return (
    <div className="main-container">
      <div className="editorWrap">
        <div className="editor-toolbar">
          <FontAwesomeIcon icon={faFreeCodeCamp} className="fa-icon" />
          Editor
          {!arrows ? (
            <FontAwesomeIcon
              icon={faArrowsUpDownLeftRight}
              className="fa-icon-arrows"
              onClick={handleMaximize}
            />
          ) : (
            <FontAwesomeIcon
              icon={faArrowDownUpAcrossLine}
              className="fa-icon-arrows"
              onClick={handleMinimize}
            />
          )}
        </div>
        <textarea
          id="editor"
          value={text}
          onChange={handleChange}
          className="editory"
        ></textarea>
      </div>
      <div className="previewWrap">
        <div className="preview-toolbar">
          <FontAwesomeIcon icon={faFreeCodeCamp} className="fa-icon" />
          Previewer
          {!arrows ? (
            <FontAwesomeIcon
              icon={faArrowsUpDownLeftRight}
              className="fa-icon-arrows"
              onClick={handleMaximize}
            />
          ) : (
            <FontAwesomeIcon
              icon={faArrowDownUpAcrossLine}
              className="fa-icon-arrows"
              onClick={handleMinimize}
            />
          )}
        </div>
        <div dangerouslySetInnerHTML={getMarkdownText(text)} id="preview" />
      </div>
    </div>
  );
}

export default App;
