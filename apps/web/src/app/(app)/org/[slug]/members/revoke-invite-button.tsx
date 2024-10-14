import { XOctagon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { revokeInviteAction } from './actions'

interface RevokeInviteButtonProps {
  inviteId: string
}

export default function RevokeInviteButton({
  inviteId,
}: RevokeInviteButtonProps) {
  return (
    <form action={revokeInviteAction.bind(null, inviteId)}>
      <Button variant="destructive" size={'sm'} type="submit">
        <XOctagon className="mr-2 size-4" />
        Revoke invite
      </Button>
    </form>
  )
}