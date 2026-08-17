import Link from 'next/link'
import { getSidebar, SidebarItem } from '@/lib/docs/sidebar'

export function DocsPrevNext({ version, currentPath }: { version: string, currentPath: string }) {
  const sidebar = getSidebar(version)
  
  const flatten = (items: SidebarItem[]): { title: string, href: string }[] => {
    return items.reduce((acc, item) => {
      const arr = []
      if (item.href) arr.push({ title: item.title, href: item.href })
      if (item.children) arr.push(...flatten(item.children))
      return acc
    }, [] as { title: string, href: string }[])
  }

  const flatList = flatten(sidebar)
  const currentIndex = flatList.findIndex(item => item.href === currentPath)
  
  if (currentIndex === -1) return null
  
  const prev = currentIndex > 0 ? flatList[currentIndex - 1] : null
  const next = currentIndex < flatList.length - 1 ? flatList[currentIndex + 1] : null

  if (!prev && !next) return null

  return (
    <div className="flex flex-row justify-between items-center border-t border-white/10 pt-6 mt-8 text-sm">
      <div className="flex-1">
        {prev && (
          <Link href={prev.href} className="group flex flex-col gap-1 text-slate-400 w-fit">
            <span>Previous</span>
            <span className="text-white group-hover:text-emerald-400 transition-colors">← {prev.title}</span>
          </Link>
        )}
      </div>
      <div className="flex-1 text-right flex justify-end">
        {next && (
          <Link href={next.href} className="group flex flex-col gap-1 text-slate-400 items-end w-fit">
            <span>Next</span>
            <span className="text-white group-hover:text-emerald-400 transition-colors">{next.title} →</span>
          </Link>
        )}
      </div>
    </div>
  )
}
