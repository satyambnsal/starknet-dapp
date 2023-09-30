'use client'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'

export const Alert = () => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Revoke Access</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Revoke Access</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure ?. This application will no longer be accessible and any existing session
          will be expired.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Revoke Access
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
