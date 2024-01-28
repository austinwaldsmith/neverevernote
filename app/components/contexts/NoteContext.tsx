"use client";
import * as React from "react";

interface NoteContext {
  note?: string;
  setNote?: React.Dispatch<React.SetStateAction<string>>;
}

const ctx = React.createContext<NoteContext>({
  note: "",
});

export function NoteProvider(props: { children: React.ReactNode }) {
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  //   if (process.env.NODE_ENV === 'development') {
  //     initStep = parseInt(router.query.step?.toString() || '') || 0 // For dev/testing in local
  //   }
  const [note, setNote] = React.useState<string>("");

  return (
    <ctx.Provider value={{ note, setNote }}>{props.children}</ctx.Provider>
  );
}

export const withNoteContext = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return function ContextWrapper(props: P) {
    return (
      <NoteProvider>
        <Component {...props} />
      </NoteProvider>
    );
  };
};

export const useNoteContext = () => React.useContext(ctx);
