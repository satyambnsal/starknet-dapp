"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { IconButton, Dialog } from "@radix-ui/themes";

type AwesomeModalProps = {
  isOpen: boolean;
  onToggle: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export const AwesomeModal = ({
  isOpen,
  onToggle,
  title,
  description,
  children,
}: AwesomeModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onToggle}>
      <Dialog.Content className="relative max-w-6xl">
        <Dialog.Title>{title}</Dialog.Title>
        {description && <Dialog.Description>{description}</Dialog.Description>}
        {children}
        <Dialog.Close>
          <IconButton
            variant="soft"
            color="gray"
            className="absolute right-5 top-4"
          >
            <Cross2Icon />
          </IconButton>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};
