import UserRoleEnum from '@/enums/user-role'

export default function (context) {
  if (context.$auth.user?.role?.id !== UserRoleEnum.ADMIN) {
    return context.redirect('/')
  }
}
