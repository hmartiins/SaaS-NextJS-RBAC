import { XOctagon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { revokeInviteAction } from './actions'

interface RevokeInviteButtonProps {
  inviteId: string
}

export default function RevokeInviteButton({
  inviteId,
}: RevokeInviteButtonProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="destructive" size={'sm'} type="submit">
          <XOctagon className="mr-2 size-4" />
          Revoke invite
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            account and remove your data from our servers.
            <form action={revokeInviteAction.bind(null, inviteId)}>
              <Button
                variant="destructive"
                size={'sm'}
                type="submit"
                className="mt-4"
              >
                <XOctagon className="mr-2 size-4" />
                Revoke invite
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
