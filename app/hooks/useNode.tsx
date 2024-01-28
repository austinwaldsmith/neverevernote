import { Notebook } from "@/lib/db/models/notebookModel";

export function useNode() {
  const insertNode = (tree: Notebook, id: string, item: Notebook) => {
    console.log(tree, id, item);
    if (tree.id === id) {
      if (tree.children) {
        tree["children"] = [...tree.children, item];
      } else {
        tree["children"] = [item];
      }

      return tree;
    }

    let latestNode: Notebook[] = [];
    if (tree.children) {
      latestNode = tree?.children?.map((child) => insertNode(child, id, item));
    }

    return { ...tree };
  };

  const updateNodeName = (tree: Notebook, id: string, name: string) => {
    if (tree.id === id) {
      tree.name = name;

      return tree;
    }

    let latestNode: Notebook[] = [];
    if (tree.children) {
      latestNode = tree?.children?.map((child) =>
        updateNodeName(child, id, name)
      );
    }

    return { ...tree };
  };

  const deleteNode = (tree: Notebook[], id: string, item: Notebook) => {};

  return { insertNode, deleteNode, updateNodeName };
}
