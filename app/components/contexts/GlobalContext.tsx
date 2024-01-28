"use client";
import { Note } from "@/lib/db/models/noteModel";
import * as React from "react";

export type Notes = { [id: string]: Note };

interface GlobalContext {
  notes: Notes;
  setNotes?: React.Dispatch<React.SetStateAction<Notes>>;
  saving: boolean;
}

const context = React.createContext<GlobalContext>({
  notes: {},
  saving: false,
});

export function GlobalProvider(props: { children: React.ReactNode }) {
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  //   if (process.env.NODE_ENV === 'development') {
  //     initStep = parseInt(router.query.step?.toString() || '') || 0 // For dev/testing in local
  //   }

  const [notes, setNotes] = React.useState<Notes>({});
  const initVal = {
    notes,
    setNotes,
    saving: false,
  };

  return (
    <context.Provider value={{ ...initVal }}>{props.children}</context.Provider>
  );
}

export const withGlobalContext = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return function ContextWrapper(props: P) {
    return (
      <GlobalProvider>
        <Component {...props} />
      </GlobalProvider>
    );
  };
};

export const useGlobalContext = () => {
  const ctx = React.useContext(context);
  if (!ctx) throw new Error("The context provider have not set yet");
  return ctx;
};
