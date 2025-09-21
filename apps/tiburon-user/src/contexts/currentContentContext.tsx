import { PageContent } from "@/types/nav";
import { createContext, useState, type ReactNode } from "react";

interface CurrentContentContextType {
  currentContent: PageContent;
  setCurrentContent: React.Dispatch<React.SetStateAction<PageContent>>;
}

interface CurrentContentProviderProps {
  children: ReactNode;
}

const CurrentContentContext = createContext<CurrentContentContextType | null>(
  null
);

function CurrentContentProvider({ children }: CurrentContentProviderProps) {
  const [currentContent, setCurrentContent] = useState<PageContent>(
    PageContent.CHALLENGES
  );

  return (
    <CurrentContentContext.Provider
      value={{ currentContent, setCurrentContent }}
    >
      {children}
    </CurrentContentContext.Provider>
  );
}

export { CurrentContentProvider, CurrentContentContext };
