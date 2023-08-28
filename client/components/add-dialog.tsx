'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { Plus } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { addTodo } from '@/api/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';


const AddDialog = () => {
    const router = useRouter()
    const [newTaskValue, setNewTaskValue] = useState<string>('')
    const [editTaskStatus, setEditTaskStatus] = useState<string>('');
    const [editTaskDescription, setEditTaskDescription] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState(false)

    const handleSubmitNewTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault()
        await addTodo({
            id: uuidv4(),
            text: newTaskValue,
            status: editTaskStatus,
            description: editTaskDescription
        })
        setNewTaskValue('')
        router.refresh()
        setOpen(false)
        setIsLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='flex justify-center items-center w-full'>
                <div className='w-full bg-primary flex justify-center items-center text-white rounded-md hover:bg-primary/90 transition-all duration-300 p-2'>Add New Task <Plus className="ml-2" color="white" size={24} /></div>
                {/* FIX HYDRATION */}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmitNewTodo}>
                    <DialogHeader>
                        <DialogTitle>Add New Task</DialogTitle>
                        <DialogDescription>
                            Create new
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
                            <Input id="name" value={newTaskValue} autoComplete="off" onChange={e => setNewTaskValue(e.target.value)} className="col-span-3 border-2 border-black/30" placeholder="Task name" />
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
                        <Button className='w-full' type="submit">Save task</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )

}

export default AddDialog