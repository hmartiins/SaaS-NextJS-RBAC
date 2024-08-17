import Image from 'next/image'

import shadcnIcon from '@/assets/shadcn-icon.svg'

import { ProfileButton } from './profile-button'

export function Header() {
  return (
    <header className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={shadcnIcon}
          className="size-6 dark:invert"
          alt="Ícone da RocketSeat"
        />
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </header>
  )
}
