"use client";
import { useEditor } from "@tiptap/react";
import React from "react";
import { signIn } from "next-auth/react";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { motion, useAnimate, stagger } from "framer-motion";
import { TextEditor, extensions } from "./components/TextArea";

const staggerMenuItems = stagger(0.3, { startDelay: 0.2 });

function useH1Animation() {
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    animate(
      "h1",
      { y: ["-100%", "0%"] },
      {
        duration: 0.4,
        ease: "anticipate",
        delay: staggerMenuItems,
      }
    );
  }, []);

  return [scope, animate];
}

const content = "Write a little something here...";

const loggedOutPage = () => {
  return (
    <Root>
      <ScrollContainer>
        <HeroSection />
        <NotebookNestingExample />
        <AboutSection />
        <ArchitectureSection />
        <DataSection />
        <LoginBtn onClick={() => signIn()}>Sign in</LoginBtn>
      </ScrollContainer>
    </Root>
  );
};

const HeroSection = () => {
  const [loading, setLoading] = React.useState(true);
  const [scope, animate] = useH1Animation();

  const editor = useEditor({
    extensions: [...extensions],
    content: content,
    onCreate() {
      setLoading(false);
    },
  });
  return (
    <HeroRoot spacing={6}>
      <Stack direction="row" spacing={4}>
        <Box ref={scope}>
          <HiddenWrapper>
            <HeroHeader>Never</HeroHeader>
          </HiddenWrapper>
          <HiddenWrapper>
            <HeroHeader>Ever</HeroHeader>
          </HiddenWrapper>
          <HiddenWrapper>
            <HeroHeader>Note</HeroHeader>
          </HiddenWrapper>
        </Box>
        <Stack
          p={3}
          sx={{
            width: "100%",
            border: "3px double #fff",
            borderRadius: "5px",
            maxHeight: "50vh",
          }}
        >
          <TextEditor loading={loading} editor={editor} />
        </Stack>
      </Stack>
      <Typography variant="h2">
        A simple, itsy, bitsy notetaking app that let's you have infinite...ish
        notebooks.
      </Typography>
      <Typography variant="h2">
        Test it out the notebook nesting below.
      </Typography>
    </HeroRoot>
  );
};

const NotebookNestingExample = () => {
  return (
    <NotebookNestingExampleRoot>
      <Typography>Info</Typography>
    </NotebookNestingExampleRoot>
  );
};

const AboutSection = () => {
  return (
    <AboutRoot>
      <Typography>About</Typography>
      <Typography>
        As my free trial of another unnamed notetaking app began to run out, I
        was inundated with ads. For the last 6 months, it was 40% off. Today's
        40% off deal isn't special. Unwilling, out of spite, to pay money to
        continue using the app, I decided to create my own. That is how
        NeverEverNote came into being. Out of spite. And curiousity about using
        Kubernetes. Now, I know what you're thinking - is hosting a personal
        notetaking app using Kubernetes overkill? Well, probably. But I did it.
      </Typography>
    </AboutRoot>
  );
};
const ArchitectureSection = () => {
  return (
    <ArchitectureRoot>
      <Typography>Architecture</Typography>
      <Typography>
        As my free trial of another unnamed notetaking app began to run out, I
        was inundated with ads. For the last 6 months, it was 40% off. Today's
        40% off deal isn't special. Unwilling, out of spite, to pay money to
        continue using the app, I decided to create my own. That is how
        NeverEverNote came into being. Out of spite. And curiousity about using
        Kubernetes. Now, I know what you're thinking - is hosting a personal
        notetaking app using Kubernetes overkill? Well, probably. But I did it.
      </Typography>
    </ArchitectureRoot>
  );
};

const DataSection = () => {
  return (
    <DataRoot>
      <Typography>Data</Typography>
      <Typography>
        It's stored on a server running out of my home. Idk, do with that what
        you will.
      </Typography>
    </DataRoot>
  );
};

const Root = styled(Stack)(
  ({ theme }) => `
  height: 100vh;
  padding-left: 5vw;
`
);

const NotebookNestingExampleRoot = styled(Stack)(
  ({ theme }) => `
  height: 100vh;
`
);

const AboutRoot = styled(Stack)(
  ({ theme }) => `
  height: 100vh;
`
);
const ArchitectureRoot = styled(Stack)(
  ({ theme }) => `
  height: 100vh;
`
);
const DataRoot = styled(Stack)(
  ({ theme }) => `
  height: 100vh;
`
);

const ScrollContainer = styled(Box)`
  scroll-snap-type: y proximity;
  overflow-y: scroll;

  & > * {
    scroll-snap-align: start;
    padding-top: 5vw;
  }
`;
const HeroRoot = styled(Stack)`
  height: 100vh;
`;

const HeroHeader = styled(motion.h1)`
  font-size: 200px;
  line-height: 75%;
`;
const HiddenWrapper = styled("div")`
  overflow: hidden;
`;

const LoginBtn = styled(Button)(
  ({ theme }) => `
  font-size: 36px;
  align-self: flex-start;
  margin-top: auto;
  text-transform: capitalize;
  position: fixed;
  bottom: 50px;
  left: 50px;

  &:hover {
    color: #129580;
  }
`
);

export default loggedOutPage;
