import { toast } from "@/components/ui/toast"
import type { ToastManagerAddOptions } from "@base-ui/react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const commonClasses = "!fixed !left-4 !bottom-4 !w-[350px] "
const toastTypes = {
  success: {
    type: "success",
    data: {
      className: commonClasses + "!bg-green-100",
    },
  },
  error: {
    type: "error",
    data: {
      className: commonClasses + "!bg-red-100",
    },
  },
  warning: {
    type: "warning",
    data: {
      className: commonClasses + "!bg-yellow-100",
    },
  },
  info: {
    type: "info",
    data: {
      className: commonClasses + "!bg-blue-100",
    },
  },
}
// create toast

export interface CustomToastData {
  className?: string
  [key: string]: unknown
}

export function customToast<Data extends object = CustomToastData>({
  type,
  toastParams,
}: {
  type: keyof typeof toastTypes
  toastParams: ToastManagerAddOptions<Data>
}) {
  const toastData = toastTypes[type]

  toast.add({
    ...toastData,
    ...toastParams,
  })
}
