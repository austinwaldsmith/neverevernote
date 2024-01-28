"use client";
import { Box, Typography, styled } from "@mui/material";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle, { TextStyleOptions } from "@tiptap/extension-text-style";
import { Editor, EditorContent, generateHTML, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { fetchNotes } from "../actions/fetch-note";
import { useDebounce } from "../hooks/useDebounce";
import { saveNoteToDB } from "../actions/save-note";
import { Fragment } from "@tiptap/pm/model";
import MenuBar from "./ MenuBar";

export const TextStyleExtended = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize.replace("px", ""),
        renderHTML: (attributes) => {
          if (!attributes["fontSize"]) {
            return {};
          }
          return {
            style: `font-size: ${attributes["fontSize"]}px`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setFontSize:
        (fontSize) =>
        ({ commands }) => {
          return commands.setMark(this.name, { fontSize: fontSize });
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark(this.name, { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

export const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyleExtended.configure({
    types: [ListItem.name],
  } as Partial<TextStyleOptions>),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

export default () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [content, setContent] = React.useState<string | Fragment>("...");

  const [loading, setLoading] = React.useState(true);
  const editor = useEditor({
    extensions: [...extensions],
    content: content,
    onUpdate({ editor }) {
      console.log(editor.getHTML());
    },
    onCreate() {
      setLoading(false);
    },
  });

  const debouncedContent = useDebounce(editor?.state.doc.content, 2000);

  React.useEffect(() => {
    if (!id) return;
    handleFetchNote(id);
  }, [id, editor]);

  React.useEffect(() => {
    if (!id) return;
    handleSaveNote(id, editor?.getHTML()!);
  }, [debouncedContent]);

  if (!id) return null;

  const handleFetchNote = async (id: string) => {
    if (!id) return {};
    const data = await fetchNotes(id);
    editor?.commands.setContent(data.content);
    console.log(data);
  };

  const handleSaveNote = async (id: string, content: string) => {
    console.log("save", id, content);
    saveNoteToDB(id, content);
  };

  return (
    <Root>
      <TextEditor loading={loading} editor={editor} />
    </Root>
  );
};

const Root = styled(Box)`
  height: 100%;
  width: 100%;
`;

export const StyledEditor = styled(EditorContent)(
  ({ theme }) => `
  .tiptap  {
    padding: 16px;

  }
  .ProseMirror-focused {
    outline: none;
  }
`
);

export const UnderlineWrapper = styled(Box)(
  ({ theme }) => `
  padding: 16px 20px;
  border-bottom: 1px solid ${theme.palette.primary.light};
  width: 100%;
`
);

interface TextEditorProps {
  editor: Editor | null;
  loading: boolean;
}
export const TextEditor = ({ editor, loading }: TextEditorProps) => {
  if (!editor) return null;

  return (
    <>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <UnderlineWrapper>
            <MenuBar editor={editor} />
          </UnderlineWrapper>
          <StyledEditor editor={editor} />
        </>
      )}
    </>
  );
};
