import { AvatarFallback } from '@radix-ui/react-avatar'
import { organizationSchema } from '@saas/auth'
import { ArrowLeftRight, Crown, UserMinus } from 'lucide-react'
import Image from 'next/image'

import { ability, getCurrentOrg } from '@/auth/auth'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'

import { removeMemberAction } from './actions'
import { UpdateMemberRoleSelect } from './update-member-role-select'

export default async function MembersList() {
  const currentOrg = await getCurrentOrg()

  const permissions = await ability()

  const [{ membership }, { members }, { organization }] = await Promise.all([
    getMembership(currentOrg!),
    getMembers(currentOrg!),
    getOrganization(currentOrg!),
  ])

  const authOrganization = organizationSchema.parse(organization)

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>

      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="py-2.5" style={{ width: 48 }}>
                  <Avatar>
                    <AvatarFallback />

                    {member.avatarUrl && (
                      <Image
                        src={member.avatarUrl}
                        width={32}
                        height={32}
                        alt="User Photo"
                        className="aspect-square size-full"
                      />
                    )}
                  </Avatar>
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex flex-col">
                    <span className="inline-flex items-center gap-2 font-medium">
                      {member.name}

                      {member.userId === membership?.userId && ' (me)'}

                      {member.userId === organization?.ownerId && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Crown className="size-3" />
                          owner
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {member.email}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-2.5">
                  <div className="flex items-center justify-end gap-2">
                    {permissions?.can(
                      'transfer_ownership',
                      authOrganization,
                    ) && (
                      <Button size={'sm'} variant={'ghost'}>
                        <ArrowLeftRight className="mr-2 size-4" />
                        Transfer ownership
                      </Button>
                    )}

                    <UpdateMemberRoleSelect
                      memberId={member.id}
                      value={member.role}
                      disabled={
                        member.userId === membership?.userId ||
                        member.userId === organization?.ownerId ||
                        permissions?.cannot('update', 'User')
                      }
                    />

                    <Dialog>
                      <DialogTrigger
                        disabled={
                          member.userId === membership?.userId ||
                          member.userId === organization?.ownerId
                        }
                      >
                        <Button
                          disabled={
                            member.userId === membership?.userId ||
                            member.userId === organization?.ownerId
                          }
                          size={'sm'}
                          variant={'destructive'}
                        >
                          <UserMinus className="mr-2 size-4" />
                          Remove
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete this account and remove your data from our
                            servers.
                            <form
                              action={removeMemberAction.bind(null, member.id)}
                            >
                              <Button
                                type="submit"
                                size={'sm'}
                                variant={'destructive'}
                                className="mt-4"
                              >
                                <UserMinus className="mr-2 size-4" />
                                Remove
                              </Button>
                            </form>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
