import { Button, Grid, Menu, MenuItem, Stack, styled } from "@mui/material";
import { Editor } from "@tiptap/react";
import React from "react";

import ReplayIcon from "@mui/icons-material/Replay";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import ListIcon from "@mui/icons-material/List";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
interface MenuItemProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  editor: Editor;
}

interface MenuItemParentProps {
  editor: Editor | null;
  Component: React.FC<MenuItemProps>;
  name: string;
}

const MenuItemParent = ({ editor, Component, name }: MenuItemParentProps) => {
  if (!editor) {
    return null;
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="contained"
        id={`${name}-button`}
        aria-controls={open ? `menu-${name}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {name}
      </Button>
      <Component
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        editor={editor}
      />
    </>
  );
};

function StylesMenu(props: MenuItemProps) {
  const { anchorEl, open, handleClose, editor } = props;

  return (
    <>
      <Menu
        id="menu-styles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "styles-button",
        }}
      >
        <MenuItem
          onClick={() => {
            editor.chain().focus().toggleBold().run();
            handleClose();
          }}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          Bold
        </MenuItem>
        <MenuItem
          onClick={() => {
            editor.chain().focus().toggleBold().run();
            handleClose();
          }}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          Italic
        </MenuItem>
        <MenuItem
          onClick={() => {
            editor.chain().focus().toggleStrike().run();
            handleClose();
          }}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          Strike
        </MenuItem>
        <MenuItem
          onClick={() => {
            editor.chain().focus().unsetAllMarks().run();
            handleClose();
          }}
        >
          Clear Marks
        </MenuItem>
      </Menu>
    </>
  );
}

declare type Level = 1 | 2 | 3 | 4 | 5 | 6;

function TypographyMenu(props: MenuItemProps) {
  const { anchorEl, open, handleClose, editor } = props;

  const headings = [...Array(6).keys()] as Level[];

  return (
    <>
      <Menu
        id="menu-typography"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "typography-button",
        }}
      >
        <MenuItem
          onClick={() => {
            editor.chain().focus().setParagraph().run();
            handleClose();
          }}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          Paragraph
        </MenuItem>
        {headings.map((heading) => (
          <MenuItem
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: heading }).run();
              handleClose();
            }}
            className={
              editor.isActive("heading", { level: heading }) ? "is-active" : ""
            }
          >
            H{heading + 1}
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => {
            editor.chain().focus().toggleCode().run();
            handleClose();
          }}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          Code
        </MenuItem>
      </Menu>
    </>
  );
}
function FontSizeMenu(props: MenuItemProps) {
  const { anchorEl, open, handleClose, editor } = props;

  const sizes = [8, 9, 10, 12, 14, 15, 16, 18, 20, 24, 30, 36, 48, 64, 72, 96];

  return (
    <>
      <Menu
        id="menu-font-size"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "font-size-button",
        }}
      >
        {sizes.map((size) => (
          <MenuItem
            onClick={() => {
              editor.chain().focus().setFontSize(size).run();
              handleClose();
            }}
          >
            {size}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <MenuBarRoot alignItems="center" direction="row" spacing={1}>
      <UndoIcon
        onClick={() => editor.chain().focus().undo().run()}
        // disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </UndoIcon>
      <RedoIcon
        onClick={() => editor.chain().focus().redo().run()}
        // disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </RedoIcon>
      <MenuItemParent editor={editor} Component={StylesMenu} name="styles" />
      <MenuItemParent
        editor={editor}
        Component={TypographyMenu}
        name="typography"
      />
      <MenuItemParent editor={editor} Component={FontSizeMenu} name="Size" />

      <Button
        variant="text"
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        clear nodes
      </Button>

      <ListIcon
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        Bullets
      </ListIcon>
      <FormatListNumberedIcon
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        List
      </FormatListNumberedIcon>
      <Button
        variant="text"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </Button>
      <Button
        variant="text"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </Button>
      <Button
        variant="text"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        horizontal rule
      </Button>
      <MenuItemParent editor={editor} Component={ColorMenu} name="colors" />
    </MenuBarRoot>
  );
};

const MenuBarRoot = styled(Stack)(
  ({ theme }) => `
  flex-wrap: wrap;
`
);

const colors: Color[] = [
  "red",
  "blue",
  "yellow",
  "green",
  "purple",
  "gray",
  "black",
  "white",
];

const ColorMenu = (props: MenuItemProps) => {
  const { anchorEl, open, handleClose, editor } = props;

  return (
    <>
      <Menu
        id="menu-colors"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "colors-button",
        }}
      >
        <Grid container rowSpacing={1}>
          {colors.map((color) => (
            <Grid
              item
              xs={3}
              sx={{ justifyContent: "center", display: "flex" }}
            >
              <MenuItemColor
                color={color}
                onClick={() => {
                  editor.chain().focus().setColor(color).run();
                  handleClose();
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Menu>
    </>
  );
};

type Color =
  | "red"
  | "blue"
  | "yellow"
  | "green"
  | "purple"
  | "gray"
  | "black"
  | "white";

const MenuItemColor = styled("li")<{ color: Color }>(
  ({ theme, color }) => `
  background: ${color};
  height: 20px;
  width: 20px;
  border-radius: 50%;
  padding: 0;
  border: 1px solid black;
  cursor: pointer;

  &:hover {
    opacity: .8;
  }
`
);

export default MenuBar;
