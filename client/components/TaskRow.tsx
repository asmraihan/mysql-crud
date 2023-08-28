import React from "react"
import { InterfaceTask } from "@/types/tasks"
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import DeleteDialog from "./delete-dialog"
import EditDialog from "./edit-dialog"

interface TaskRowProps {
    task: InterfaceTask
}

const TaskRow: React.FC<TaskRowProps> = ({ task }) => {

    return (
        <TableRow key={task.id}>
            <TableCell className="font-medium">{task.id}</TableCell>
            <TableCell className="w-full">{task.text}</TableCell>
            {/* <TableCell>Credit Card</TableCell> */}
            <TableCell className="text-right flex justify-center items-center gap-2">
                {/* edit btn modal */}
                <EditDialog task={task}></EditDialog>
                {/* delete btn modal */}
                <DeleteDialog task={task} ></DeleteDialog>
            </TableCell>
        </TableRow>
    )
}

export default TaskRow