import Link from "next/link"
import { Menu } from "lucide-react"

export interface SidebarCategory {
  title: string
  links: SidebarLink[]
}

export interface SidebarLink {
  label: string
  href: string
  icon?: React.ReactNode
  disabled?: boolean
}

interface SidebarProps {
  categories: SidebarCategory[]
  currentPath: string
  bottomContent?: React.ReactNode
  collapsed?: boolean
}

export default function Sidebar({ categories, currentPath, bottomContent, collapsed }: SidebarProps) {
  return (
    <aside className="bg-white bg-zinc-300 shadow-xl dark:bg-neutral-900 w-64 h-[100vh]">
      <div key="topContent">
        <Menu />
      </div>
      {categories.map((category) => (
        <div key={category.title} className="p-4">
          <h2 className="text-neutral-400 select-none">{category.title}</h2>
          <nav>
            {category.links.map((link) => (
              link.disabled ? (
                <span>
                  {link.icon}
                  {link.label}
                </span>
              ) : (
                <Link key={link.href} href={link.href} className="flex hover:shadow-lg hover:bg-zinc-200 dark:text-white dark:hover:shadow-lg dark:hover:bg-neutral-600 rounded-lg px-3 py-1">
                  {link.icon}
                  {link.label}
                </Link>
              )
            ))}
          </nav>
        </div>
      ))}
    </aside>
  )
}

