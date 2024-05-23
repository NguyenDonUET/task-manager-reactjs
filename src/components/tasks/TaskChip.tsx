import { Priority } from "../../types"
import cn from "../../utils/cn"

type BaseChipProps = {
  text: Priority
}

const colors: Record<Priority, string> = {
  [Priority.Low]: "gray-400",
  [Priority.Medium]: "yellow-600",
  [Priority.High]: "red-500",
}

export default function TaskChip({ text }: BaseChipProps) {
  const color = colors[text]

  const baseStyle =
    "relative grid select-none items-center whitespace-nowrap rounded-lg py-1.5 px-3 font-sans text-xs font-bold uppercase bg-white w-min m-2 mb-0 ml-auto capitalize"
  const borderStyle = cn(
    "border",
    color === "gray-400" && "border-gray-400",
    color === "yellow-600" && "border-yellow-600",
    color === "red-500" && "border-red-500"
  )
  const textStyle = cn(
    color === "gray-400" && "text-gray-400",
    color === "yellow-600" && "text-yellow-600",
    color === "red-500" && "text-red-500"
  )

  return (
    <div className={cn(baseStyle, borderStyle)}>
      <span className={textStyle}>{text}</span>
    </div>
  )
}
