import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ThemeToggle } from "@/features/preferences/components/ThemeToggle"
import { Settings, Sliders } from "lucide-react"
import PreferredAuthors from "./PreferredAuthors"
import PreferredCategory from "./PreferredCategory"
import PreferredSource from "./PreferredSources"
import PreferencesHeader from "./PreferencesHeader"

export const PreferencesDrawer = () => {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger
        render={
          <div className="flex size-10 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
            <Settings size={22} />
          </div>
        }
      />
      <DrawerContent className="dark:bg-gray-900">
        <DrawerHeader className="mb-1">
          <DrawerTitle>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                <Sliders size={18} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Preferences
              </h3>
            </div>
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {/* Theme */}
          <div className="preferences-card">
            <p className="mb-2 text-sm text-muted-foreground">Theme</p>
            <ThemeToggle />
          </div>

          <hr />

          {/* Feed Preferences */}
          <PreferencesHeader />
          {/* Preferred Source */}
          <div className="preferences-card">
            <PreferredSource />
          </div>

          {/* Preferred Category */}
          <div className="preferences-card">
            <PreferredCategory />
          </div>
          {/* Preferred Author */}
          <div className="preferences-card">
            <PreferredAuthors />
          </div>
        </div>

        <DrawerFooter className="mt-1">
          <DrawerClose render={<Button>Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
