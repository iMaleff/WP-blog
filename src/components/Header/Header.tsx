
import { Avatar, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/avatar'

// ... в компоненте Header
return (
  <header>
    <div className="flex items-center gap-2">
      {/* ... другие элементы */}
      <LangSwitcher />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Ваш профиль</DropdownMenuItem>
          <DropdownMenuItem>Ваши публикации</DropdownMenuItem>
          <DropdownMenuItem>Избранное</DropdownMenuItem>
          <DropdownMenuItem>Список для чтения</DropdownMenuItem>
          <DropdownMenuItem>Тёмная тема</DropdownMenuItem>
          <DropdownMenuItem>Помощь</DropdownMenuItem>
          <DropdownMenuItem>Выйти</DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
      {/* ... другие элементы */}
    </div>
  </header>
) 