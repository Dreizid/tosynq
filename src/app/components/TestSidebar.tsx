import Link from "next/link"

export interface TestSidebarItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  onClick: () => void
  href?: string
  active?: boolean
  disbaled?: boolean
}

interface TestSidebarProps {
  header?: React.ReactNode
  items: TestSidebarItem[]
  footer?: React.ReactNode
}

function TestSidebar({ header, items, footer }: TestSidebarProps) {
  return (
    <div className="bg-bg-tertiary shadow-lg h-screen w-16 transition">
      {header}
      <div className="mt-8">
        {items.map((item) => (
          <div className="">
            {
              item.href ? (
                <Link href={item.href}>
                  <item.icon className="" />
                </Link>
              ) : (
                <div className="group relative flex items-center justify-center ">
                  <button onClick={item.onClick} className="p-2 rounded-md hover:bg-bg-secondary transition">
                    <item.icon className="h-5 w-5 text-text-primary transition" />
                  </button>
                  <span className="absolute text-text-primary bg-bg-secondary left-full top-1/2 -translate-y-1/2 ml-4 scale-0 group-hover:scale-100 transition-transform rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md z-10 whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              )
            }
          </div>
        ))}</div>
      {footer}
    </div>
  )
}

export default TestSidebar
