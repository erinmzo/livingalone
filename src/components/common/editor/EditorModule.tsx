"use client";

import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor, EditorProps } from "@toast-ui/react-editor";
import "tui-color-picker/dist/tui-color-picker.css";

export const colorSyntaxOptions = {
  preset: [
    "#008575",
    "#00B8A2",
    "#c8f683",
    "#ddfab3",
    "#E9430C",
    "#f9ae94",
    "#ffec99",
    "#fff6cc",
    "#303634",
    "#57605d",
    "#899490",
  ],
};
export const toolbarItems = [
  ["heading", "bold", "italic", "strike"],
  ["hr"],
  ["ul", "ol", "task"],
  ["link"],
  ["scrollSync"],
];

type EditorModuleProps = EditorProps & {
  initialValue?: string;
};

function EditorModule({ initialValue, editorRef }: EditorModuleProps) {
  return (
    <Editor
      initialValue={initialValue || " "}
      placeholder="※여기에 글을 작성해주세요."
      previewStyle="tab"
      height="400px"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      ref={editorRef}
      plugins={[[colorSyntax, colorSyntaxOptions]]}
      toolbarItems={toolbarItems}
      usageStatistics={false} // 통계 수집 거부
    />
  );
}

export default EditorModule;
