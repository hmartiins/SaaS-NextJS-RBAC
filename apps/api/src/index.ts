import { defineAbilitiesFor } from '@saas-rbac/auth'

const ability = defineAbilitiesFor({ role: 'MEMBER', id: '1' })

console.log(ability.can('get', 'Billing'))
console.log(ability.can('create', 'Invite'))
