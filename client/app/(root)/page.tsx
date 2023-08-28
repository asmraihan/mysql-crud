import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import TaskList from "@/components/TaskList";
import AddDialog from "@/components/add-dialog";
import { Terminal } from "lucide-react"
import { getAllTodos } from "@/api/api";

export default async function Home() {

  const tasks = await getAllTodos()
  // console.log(tasks)

  return (
    <main className="p-4 max-w-4xl mx-auto h-full flex flex-col justify-center">
      <Alert  className="my-4">
        <Terminal className="h-4 w-4" />
        <AlertTitle>mySQL CRUD</AlertTitle>
        <AlertDescription>
          Add, Edit, Delete, and Complete Tasks!
        </AlertDescription>
      </Alert>
      <AddDialog></AddDialog>
      <TaskList tasks={tasks}></TaskList>
    </main>
  )
}
