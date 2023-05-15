import Link from 'next/link'

export interface MenuItem {
  text: string
  href: string
  alwaysEnabled?: boolean
}

export interface MenuBoxProps {
  title: string
  menuItems: MenuItem[]
}

export const allMenuGroups: MenuBoxProps[] = [
  {
    title: 'Admin',
    menuItems: [{ text: 'Search for Users', href: '/admin/users' }],
  },
  {
    title: 'User Management',
    menuItems: [
      {
        text: 'Change Password',
        href: '/auth/change-password',
        alwaysEnabled: true,
      },
      {
        text: 'Log Out',
        href: '/api/auth/logout',
        alwaysEnabled: true,
      },
    ],
  },
  {
    title: 'Product Management',
    menuItems: [{ text: 'Search for Products', href: '/config/products' }],
  },
]

export default function MenuBox({ title, menuItems }: MenuBoxProps) {
  return (
    <div className="max-w-sm rounded overflow-hidden">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="text-gray-700 text-base">
          {menuItems.map((mi) => (
            <div key={mi.text}>
              <Link href={mi.href}>{mi.text}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
