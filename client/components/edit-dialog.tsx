'use client'

import React from 'react'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { InterfaceTask } from '@/types/tasks'

import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Edit } from "lucide-react"

import { editTodo } from "@/api/api"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'



interface EditDialogProps {
    task: InterfaceTask
}

const EditDialog: React.FC<EditDialogProps> = ({ task }) => {

    const router = useRouter()
    const [editTaskValue, setEditTaskValue] = useState<string>(task.text)
    const [editTaskStatus, setEditTaskStatus] = useState<string>(task.status);
    const [editTaskDescription, setEditTaskDescription] = useState<string>(task.description);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState(false)

    const handleSubmitEditTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await editTodo({
            id: task.id,
            text: editTaskValue,
            status: editTaskStatus,
            description: editTaskDescription
        })
        router.refresh()
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='flex justify-center items-center w-full'>
                <Edit className="text-blue-600 cursor-pointer" size={20}></Edit> {/* FIX HYDRATION */}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmitEditTodo}>
                    <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                        <DialogDescription>
                            Make changes
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className='text-left font-medium' htmlFor="picture">Picture</Label>
                            <Input className='col-span-3 border-2  border-black/30' id="picture" type="file" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-left font-medium">
                                Task
                            </Label>
                            <Input id="name" value={editTaskValue} autoComplete="off" onChange={e => setEditTaskValue(e.target.value)} className="col-span-3 border-2 border-black/30" placeholder="Task name" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">

                            <Label htmlFor="name" className="text-left ">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={editTaskDescription}
                                autoComplete="off"
                                onChange={(e) => setEditTaskDescription(e.target.value)}
                                className="col-span-3 border-2 border-black/30 resize-none"
                                placeholder="Type Description" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className='text-left font-medium' htmlFor="picture">File</Label>
                            <Input className='col-span-3 border-2  border-black/30' id="picture" type="file" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Status">
                                Status
                            </Label>
                            <Select onValueChange={setEditTaskStatus}>
                                <SelectTrigger className="col-span-3 border-2 border-black/30">
                                    <SelectValue placeholder="Task Status" />
                                </SelectTrigger>
                                <SelectContent className='font-medium'>
                                    <SelectGroup>
                                        <SelectItem value="To Do">To Do</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                    </SelectGroup>
                                </SelectContent>

                            </Select>
                        </div>


                    </div>
                    <DialogFooter>
                        <Button className='w-full' type="submit">Update task</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditDialog