"use client";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useNode } from "../hooks";
import { withGlobalContext } from "./contexts/GlobalContext";

import { v4 as uuidv4 } from "uuid";

import { useSession, signIn, signOut } from "next-auth/react";

import { addNotebookToDB } from "../actions/add-notebook";
import { addNoteToDB } from "../actions/add-note";
import { Notebook } from "@/lib/db/models/notebookModel";

import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

interface SideBarProps {
  globalNotebook: Notebook;
}

const Sidebar = ({ globalNotebook }: SideBarProps) => {
  const email = useSession()?.data?.user?.email!;

  return (
    <Root>
      <Typography variant="h1">NeverEverNote</Typography>
      <NotebooksSection globalNotebook={globalNotebook} id={email} />
      <Button sx={{ marginTop: "auto" }} onClick={() => signOut()}>
        Sign Out
      </Button>
    </Root>
  );
};
interface NotebooksSectionProps {
  globalNotebook: Notebook;
  id: string;
  fake?: boolean;
}
export const NotebooksSection = ({
  globalNotebook,
  id,
  fake = false,
}: NotebooksSectionProps) => {
  const { insertNode } = useNode();
  const [optionToggle, setOptionToggle] = useState(false);

  const handleInsertNode = async (type: "note" | "notebook") => {
    const newNode = {
      id: uuidv4(),
      type,
      name: type == "note" ? "New Note" : "New Notebook",
      children: [],
    };
    const result = insertNode(globalNotebook, id, newNode);
    setOptionToggle(false);
    if (!fake) addNotebookToDB(result);

    if (type == "note") {
      console.log("note added");
      addNoteToDB(newNode.id);
    }
  };

  return (
    <Box mt={2}>
      <Stack direction="row">
        <Typography variant="h2">Notebooks</Typography>
        <Box px={2} sx={{ position: "relative" }}>
          {optionToggle && (
            <Box
              sx={{
                position: "absolute",
                left: "100%",
                bottom: "0%",
                background: "#202021",
              }}
            >
              <Button onClick={() => handleInsertNode("notebook")}>
                Notebook
              </Button>
              <Button onClick={() => handleInsertNode("note")}>Note</Button>
            </Box>
          )}
          <Typography
            onClick={() => setOptionToggle(!optionToggle)}
            sx={{ cursor: "pointer" }}
          >
            +
          </Typography>
        </Box>
      </Stack>
      {globalNotebook.children?.map((notebook) => (
        <NotebookCell
          key={notebook.id}
          notebook={notebook}
          globalNotebook={globalNotebook}
        />
      ))}
    </Box>
  );
};

interface NoteBookCellProps {
  notebook: Notebook;
  globalNotebook: Notebook;
}
const NotebookCell = ({ notebook, globalNotebook }: NoteBookCellProps) => {
  const router = useRouter();
  const { insertNode, updateNodeName } = useNode();

  const [open, toggleOpen] = useState(false);
  const [optionToggle, setOptionToggle] = useState(false);
  const [name, setName] = useState(notebook.name);
  const [disabled, setDisabled] = useState(true);

  const handleRoute = () => {
    router.push(`?id=${notebook.id}`);
  };

  const handleToggleOpen = () => {
    toggleOpen((prev) => !prev);
  };

  const handleInsertNode = async (type: "note" | "notebook") => {
    const newNode = {
      id: uuidv4(),
      type,
      name: type == "note" ? "New Note" : "New Notebook",
      children: [],
    };
    const result = insertNode(globalNotebook, notebook.id, newNode);

    setOptionToggle(false);
    addNotebookToDB(result);
    console.log(newNode.id);

    if (type == "note") {
      console.log("note added");
      addNoteToDB(newNode.id);
    }
  };

  const handleUpdateName = (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    const result = updateNodeName(globalNotebook, notebook.id, name);
    addNotebookToDB(result);
    console.log(result);
  };

  return (
    <>
      <NotebookCellRoot>
        <Stack px={2} direction="row" alignItems="center" spacing={1}>
          {notebook.type == "notebook" && (
            <ExpandIcon open={open} onClick={handleToggleOpen} />
          )}
          <Box onClick={handleRoute}>
            <form
              onSubmit={handleUpdateName}
              onDoubleClick={() => setDisabled(false)}
            >
              {disabled ? (
                <p>{name}</p>
              ) : (
                <input
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    outline: "none",
                    border: "none",
                    background: "none",
                  }}
                />
              )}
            </form>
          </Box>
        </Stack>
        <Box px={2} sx={{ position: "relative" }}>
          {optionToggle && (
            <Box
              sx={{
                position: "absolute",
                left: "100%",
                bottom: "0%",
                background: "#202021",
                border: ".5px solid gray",
              }}
            >
              <Button onClick={() => handleInsertNode("notebook")}>
                Notebook
              </Button>
              <Button onClick={() => handleInsertNode("note")}>Note</Button>
            </Box>
          )}
          {notebook.type == "notebook" && (
            <Typography onClick={() => setOptionToggle(!optionToggle)}>
              +
            </Typography>
          )}
        </Box>
      </NotebookCellRoot>
      <Stack>
        {open &&
          notebook.children?.map((notebook) => (
            <Box ml={1}>
              <NotebookCell
                notebook={notebook}
                globalNotebook={globalNotebook}
              />
            </Box>
          ))}
      </Stack>
    </>
  );
};

const NotebookCellRoot = styled(Box)(
  ({ theme }) => `
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 8px;
  text-align: center;
  width: 100%;
  transition: 0.3s;
  border-left: 3px solid #f1f1f1;
  white-space: nowrap;
  &:hover {
    background: ${theme.palette.primary.main};
    background: #d09204e0;
    transform: translate(-2px, -2px);
  }
`
);
const Root = styled(Stack)(
  ({ theme }) => `
  background: ${theme.palette.primary.dark};
  padding: 40px;
  width: 100%;
  max-width: 300px;
  height: 100vh;
  z-index: 1;
`
);

const ExpandIcon = styled(ExpandCircleDownIcon)<{ open: boolean }>(
  ({ theme, open }) => `
    height: 20px;
    width: 20px;
    transform: rotateZ(${open ? "-90deg" : 0});
    transition: .2s ease-in-out;
  `
);

export default withGlobalContext(Sidebar);
