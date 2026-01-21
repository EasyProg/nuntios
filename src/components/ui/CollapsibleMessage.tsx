import { splitPartsElement } from "@/helpers/helpers";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Collapsible } from "radix-ui";
import { FC, PropsWithChildren } from "react";

type OpenProps = {
  isOpen: boolean;
  openVisibility: boolean;
  messageId: number;
  setIsOpenMessageId: (messageId: number | null) => void;
};

export const CollapsibleMessage: FC<PropsWithChildren<OpenProps>> = ({
  children,
  openVisibility,
  isOpen,
  messageId,
  setIsOpenMessageId,
}) =>
  openVisibility ? (
    <Collapsible.Root open={isOpen}>
      <div>{splitPartsElement(children).firstPart}</div>
      <Collapsible.Content>
        {splitPartsElement(children).secondPart}
      </Collapsible.Content>
      <Collapsible.Trigger asChild className="cursor-pointer">
        {isOpen ? (
          <ArrowUpIcon
            className="hover:stroke-cyan-700"
            onClick={() => setIsOpenMessageId(null)}
          />
        ) : (
          <ArrowDownIcon
            className="hover:stroke-cyan-700"
            onClick={() => {
              console.log({ messageId });
              setIsOpenMessageId(messageId);
            }}
          />
        )}
      </Collapsible.Trigger>
    </Collapsible.Root>
  ) : (
    <div>{children}</div>
  );
