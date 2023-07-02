import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "./imge-resize/ImageResize";
import { ImageDrop } from "quill-image-drop-module";
import axios from "axios";
import parse from "html-react-parser";

const QuillClipboard = Quill.import("modules/clipboard");
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDrop", ImageDrop);
class Clipboard extends QuillClipboard {
  getMetaTagElements = (stringContent) => {
    const el = document.createElement("div");
    el.innerHTML = stringContent;
    return el.getElementsByTagName("meta");
  };

  async onPaste(e) {
    let clipboardData = e.clipboardData || window.clipboardData;
    let pastedData = await clipboardData.getData("Text");

    const urlMatches = pastedData.match(/\b(http|https)?:\/\/\S+/gi) || [];
    if (urlMatches.length > 0) {
      e.preventDefault();
      urlMatches.forEach((link) => {
        axios
          .get(link)
          .then((payload) => {
            // let title, image, url, description;
            let title, image, url;
            for (let node of this.getMetaTagElements(payload)) {
              if (node.getAttribute("property") === "og:title") {
                title = node.getAttribute("content");
              }
              if (node.getAttribute("property") === "og:image") {
                image = node.getAttribute("content");
              }
              if (node.getAttribute("property") === "og:url") {
                url = node.getAttribute("content");
              }
              // if (node.getAttribute("property") === "og:description") {
              //     description = node.getAttribute("content");
              // }
            }

            const rendered = `<a href=${url} target="_blank"><div><img src=${image} alt=${title} width="20%"/><span>${title}</span></div></a>`;

            let range = this.quill.getSelection();
            let position = range ? range.index : 0;
            this.quill.pasteHTML(position, rendered, "silent");
            this.quill.setSelection(position + rendered.length);
          })
          .catch((error) => console.error(error));
      });
    } else {
      //console.log('when to use this') 보통 다른 곳에서  paste 한다음에  copy하면 이쪽 걸로 한다.
      super.onPaste(e);
    }
  }
}
Quill.register("modules/clipboard", Clipboard, true);

const BlockEmbed = Quill.import("blots/block/embed");

class ImageBlot extends BlockEmbed {
  static create(value) {
    const imgTag = super.create();
    imgTag.setAttribute("src", value.src);
    imgTag.setAttribute("alt", value.alt);
    imgTag.setAttribute(
      "width",
      value.width ? value.width : value.naturalWidth
    );
    imgTag.setAttribute("height", value.naturalHeight);

    return imgTag;
  }

  static value(node) {
    console.log(node);
    return {
      src: node.getAttribute("src"),
      alt: node.getAttribute("alt"),
      width: node.getAttribute("width"),
      height: node.getAttribute("height"),
    };
  }
}

ImageBlot.blotName = "image";
ImageBlot.tagName = "img";
Quill.register(ImageBlot);

class VideoBlot extends BlockEmbed {
  static create(value) {
    const videoTag = super.create();
    if (value && value.src) {
      videoTag.setAttribute("src", value.src);
      videoTag.setAttribute("title", value.title);
      videoTag.setAttribute("width", "400");
      videoTag.setAttribute("height", "300");
      videoTag.setAttribute("controls", "");
    } else {
      const iframeTag = document.createElement("iframe");
      iframeTag.setAttribute("src", value);
      iframeTag.setAttribute("frameborder", "0");
      iframeTag.setAttribute("allowfullscreen", true);
      iframeTag.setAttribute("width", "90%");
      iframeTag.setAttribute("height", "377");
      return iframeTag;
    }

    return videoTag;
  }

  static value(node) {
    if (node.getAttribute("title")) {
      return {
        src: node.getAttribute("src"),
        title: node.getAttribute("title"),
      };
    } else {
      return node.getAttribute("src");
    }
  }
}

VideoBlot.blotName = "video";
VideoBlot.tagName = "video";
Quill.register(VideoBlot);

class FileBlot extends BlockEmbed {
  static create(value) {
    const prefixTag = document.createElement("span");
   

    const bTag = document.createElement("b");
    //위에 첨부파일 글자 옆에  파일 이름이 b 태그를 사용해서 나온다.
    bTag.innerText = value;

    const linkTag = document.createElement("a");
    linkTag.setAttribute("href", value);
    linkTag.setAttribute("target", "_blank");
    linkTag.setAttribute("className", "file-link-inner-post");
    linkTag.appendChild(bTag);
    //linkTag 이런식으로 나온다 <a href="btn_editPic@3x.png" target="_blank" classname="file-link-inner-post"><b>btn_editPic@3x.png</b></a>

    const node = super.create();
    node.appendChild(prefixTag);
    node.appendChild(linkTag);

    return node;
  }

  static value(node) {
    const linkTag = node.querySelector("a");
    return linkTag.getAttribute("href");
  }
}

FileBlot.blotName = "file";
FileBlot.tagName = "p";
FileBlot.className = "file-inner-post";
Quill.register(FileBlot);

class PollBlot extends BlockEmbed {
  static create(value) {
    const prefixTag = document.createElement("span");
    prefixTag.innerText = "투표 - ";

    const bTag = document.createElement("b");
    bTag.innerText = value.title;

    const node = super.create();
    node.setAttribute("id", value.id);
    node.appendChild(prefixTag);
    node.appendChild(bTag);

    return node;
  }

  static value(node) {
    const id = node.getAttribute("id");
    const bTag = node.querySelector("b");
    const title = bTag.innerText;
    return { id, title };
  }
}

PollBlot.blotName = "poll";
PollBlot.tagName = "p";
PollBlot.className = "poll-inner-post";
Quill.register(PollBlot);

class QuillEditor extends React.Component {
  bandId;
  placeholder;
  onEditorChange;
  onFilesChange;
  onPollsChange;
  _isMounted;

  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };

    this.reactQuillRef = null;

    this.inputOpenImageRef = React.createRef();
    this.inputOpenVideoRef = React.createRef();
    this.inputOpenFileRef = React.createRef();
  }

  // componentDidMount() {
  //   this._isMounted = true;
  // }

  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  handleChange = (html) => {
    console.log("html", html);

    this.props.onEditorChange(html);
  };

  // I V F P들을  눌렀을떄 insertImage: this.imageHandler로 가서  거기서 inputOpenImageRef를 클릭 시킨다.
  imageHandler = () => {
    this.inputOpenImageRef.current.click();
  };

  videoHandler = () => {
    this.inputOpenVideoRef.current.click();
  };

  fileHandler = () => {
    this.inputOpenFileRef.current.click();
  };

  insertImage = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const file = e.currentTarget.files[0];

      let formData = new FormData();
      const config = {
        header: { "content-type": "multipart/form-data" },
      };
      formData.append("file", file);

      axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/upload`, formData, config)
        .then((response) => {
          if (response) {
            const quill = this.reactQuillRef.getEditor();
            quill.focus();

            let range = quill.getSelection();
            let position = range ? range.index : 0;

            //먼저 노드 서버에다가 이미지를 넣은 다음에   여기 아래에 src에다가 그걸 넣으면 그게
            //이미지 블롯으로 가서  크리에이트가 이미지를 형성 하며 그걸 발류에서     src 랑 alt 를 가져간후에  editorHTML에 다가 넣는다.
            quill.insertEmbed(position, "image", {
              src: response.data.path,
              title:
                response.data.path.split("/")[
                  response.data.path.split("/").length - 1
                ],
            });
            quill.setSelection(position + 1);

            if (this._isMounted) {
              this.setState(
                {
                  files: [...this.state.files, file],
                },
                () => {
                  this.props.onFilesChange(this.state.files);
                }
              );
            }
          } else {
            return alert("failed to upload file");
          }
        });
    }
  };

  insertVideo = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const file = e.currentTarget.files[0];

      let formData = new FormData();
      const config = {
        header: { "content-type": "multipart/form-data" },
      };
      formData.append("file", file);

      axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/upload`, formData, config)
        .then((response) => {
          if (response.data) {
            const quill = this.reactQuillRef.getEditor();
            quill.focus();
            console.log("response", response.data);
            let range = quill.getSelection();
            let position = range ? range.index : 0;
            quill.insertEmbed(position, "video", {
              src: response.data.path,
              title:
                response.data.path.split("/")[
                  response.data.path.split("/").length - 1
                ],
            });
            quill.setSelection(position + 1);

            if (this._isMounted) {
              this.setState(
                {
                  files: [...this.state.files, file],
                },
                () => {
                  this.props.onFilesChange(this.state.files);
                }
              );
            }
          } else {
            return alert("failed to upload file");
          }
        });
    }
  };

  insertFile = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const file = e.currentTarget.files[0];
      console.log(file);

      let formData = new FormData();
      const config = {
        header: { "content-type": "multipart/form-data" },
      };
      formData.append("file", file);

      axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/upload`, formData, config)
        .then((response) => {
          if (response.data) {
            const quill = this.reactQuillRef.getEditor();
            quill.focus();

            let range = quill.getSelection();
            let position = range ? range.index : 0;
            quill.insertEmbed(position, "file", response.data.path);
            quill.setSelection(position + 1);

            if (this._isMounted) {
              this.setState(
                {
                  files: [...this.state.files, file],
                },
                () => {
                  this.props.onFilesChange(this.state.files);
                }
              );
            }
          }
        });
    }
  };

  render() {
    return (
      <div>
        <div id="toolbar">
          <select
            className="ql-header"
            defaultValue={""}
            onChange={(e) => e.persist()}
          >
            <option value="1" />
            <option value="2" />
            <option value="" />
          </select>
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
          <select className="ql-color">
            <option value="rgb(0, 0, 0)" />
            <option value="rgb(230, 0, 0)" />
            <option value="rgb(255, 153, 0)" />
            <option value="rgb(255, 255, 0)" />
            <option value="rgb(0, 138, 0)" />
            <option value="rgb(0, 102, 204)" />
            <option value="rgb(153, 51, 255)" />
            <option value="rgb(255, 255, 255)" />
            <option value="rgb(250, 204, 204)" />
            <option value="rgb(255, 235, 204)" />
            <option value="rgb(255, 255, 204)" />
            <option value="rgb(204, 232, 204)" />
            <option value="rgb(204, 224, 245)" />
            <option value="rgb(235, 214, 255)" />
            <option value="rgb(187, 187, 187)" />
            <option value="rgb(102, 185, 102)" />
            <option value="rgb(102, 163, 224)" />
            <option value="rgb(194, 133, 255)" />
            <option value="rgb(136, 136, 136)" />
            <option value="rgb(161, 0, 0)" />
            <option value="rgb(178, 107, 0)" />
            <option value="rgb(178, 178, 0)" />
            <option value="rgb(0, 97, 0)" />
            <option value="rgb(0, 71, 178)" />
            <option value="rgb(107, 36, 178)" />
            <option value="rgb(68, 68, 68)" />
            <option value="rgb(92, 0, 0)" />
            <option value="rgb(102, 61, 0)" />
            <option value="rgb(102, 102, 0)" />
            <option value="rgb(0, 55, 0)" />
            <option value="rgb(0, 41, 102)" />
            <option value="rgb(61, 20, 102)" />
          </select>
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
          <select
            className="ql-align"
            style={{ marginTop: "-2px" }}
            defaultValue={""}
            onChange={(e) => e.persist()}
          >
            <option value="">Select alignment</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
          <button className="ql-insertImage" style={{ marginTop: "-3px" }}>
            &#128444;
          </button>
          <button className="ql-insertVideo" style={{ marginTop: "-3px" }}>
            {" "}
            &#128249;
          </button>
          <button className="ql-insertFile" style={{ marginTop: "-2px" }}>
            &#128462;
          </button>
          <button className="ql-link" />
          <button className="ql-code-block" />
          <button className="ql-video" />
          <button className="ql-blockquote" />
          <button className="ql-clean" />
        </div>
        <ReactQuill
          // className="d-flex flex-center "
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          theme={"snow"}
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
          value={this.props.value}
          placeholder={this.props.placeholder}
          style={{ height: "500px", width: "700px" }}
        />
        <input
          type="file"
          accept="image/*"
          ref={this.inputOpenImageRef}
          style={{ display: "none" }}
          onChange={this.insertImage}
        />
        <input
          type="file"
          accept="video/*"
          ref={this.inputOpenVideoRef}
          style={{ display: "none" }}
          onChange={this.insertVideo}
        />
        <input
          type="file"
          accept="*"
          ref={this.inputOpenFileRef}
          style={{ display: "none" }}
          onChange={this.insertFile}
        />
      </div>
    );
  }

  modules = {
    // syntax: true,

    imageResize: {
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
    imageDrop: true,

    toolbar: {
      container: "#toolbar",
      handlers: {
        insertImage: this.imageHandler,
        insertVideo: this.videoHandler,
        insertFile: this.fileHandler,
        insertPoll: this.pollHandler,
      },
      items: [
        "bold",
        "italic",
        "underline",
        "strike",
        { list: "ordered" },
        { list: "bullet" },
        "image",
        "video",
        "file",
        "link",
        "code-block",
        "blockquote",
        "clean",
        { header: [1, 2, 3, 4, 5, 6, false] }, // heading styles
        { align: [] }, // text alignment
        { undo: true }, // undo
        { redo: true }, // redo
        { background: [] }, // text highlighting
        { script: "sub" }, // subscript
        { script: "super" }, // superscript
        { table: true }, // table insertion
        { emoji: true }, // emoji insertion
        { "code-block": "highlighted" }, // code highlighting
        { formula: true }, // math formulas
      ],
    },
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "image",
    "video",
    "file",
    "link",
    "code-block",
    "blockquote",
    "clean",
    "list",
    "bullet",
    "ordered",
    "size",
    "background",
    "align",
    "script",
    "table",
    "emoji",
    "code-block",
    "formula",
    "color",
  ];
}
export default QuillEditor;
