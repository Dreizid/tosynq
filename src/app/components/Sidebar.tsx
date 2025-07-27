import Link from "next/link"

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
    <aside className="bg-slate-600 w-64 h-[100vh]">
      {categories.map((category) => (
        <div key={category.title}>
          <h2 className="select-none">{category.title}</h2>
          <nav>
            {category.links.map((link) => (
              link.disabled ? (
                <span>
                  {link.icon}
                  {link.label}
                </span>
              ) : (
                <Link key={link.href} href={link.href} className="">
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

