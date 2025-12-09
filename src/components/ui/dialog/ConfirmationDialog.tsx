import { AlertDialog } from "radix-ui";
import * as React from "react";

type ConfirmationDialogProps = {
  headerText: string;
  description: string;
  confirmationText: string;
  declineText: string;
  trigger: React.ReactNode;
  onAction: <T extends number>(params: T) => void;
  actionParam: number;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  headerText,
  description,
  confirmationText,
  declineText,
  trigger,
  onAction,
  actionParam,
}) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-black/40 fixed inset-0 animate-overlayShow" />
      <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-lg shadow-lg w-[90vw] max-w-[500px] max-h-[85vh] p-6 animate-contentShow focus:outline-none">
        <AlertDialog.Title className="text-gray-700 text-lg font-medium">
          {headerText}
        </AlertDialog.Title>
        <AlertDialog.Description className="text-gray-600 text-sm leading-relaxed mb-5">
          {description}
        </AlertDialog.Description>
        <div className="flex gap-6 justify-end">
          <AlertDialog.Cancel asChild>
            <button className="inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium bg-cyan-700 text-white-100 outline-none focus-visible:outline-2 focus-visible:outline-gray-600 focus-visible:outline-offset-1 hover:bg-cyan-600 hover:cursor-pointer">
              {declineText}
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button
              onClick={() => onAction(actionParam)}
              className="inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium bg-rose-800 text-white-700 outline-none focus-visible:outline-2 focus-visible:outline-red-600 focus-visible:outline-offset-1 hover:bg-rose-700 hover:cursor-pointer"
            >
              {confirmationText}
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default ConfirmationDialog;
