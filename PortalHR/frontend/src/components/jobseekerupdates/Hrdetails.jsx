import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Hrdetails = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        directjob:user?.hrexe?.directjob || "",
        trainingrequired:user?.hrexe?.trainingrequired || "",
        expectedsalary:user?.hrexe?.expectedsalary || "",
        negotiable:user?.hrexe?.negotiable || "",
        hrsatisfactory:user?.hrexe?.hrsatisfactory || "",
       
    });
    // console.log(input)
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append("directjob", input.directjob);
        formData.append("trainingrequired", input.trainingrequired);
        formData.append("expectedsalary", input.expectedsalary);
        formData.append("negotiable", input.negotiable);
        formData.append("hrsatisfactory", input.hrsatisfactory);
       

        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
             

                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
    }

    return (

        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Hr Update</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>

                       
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="directjob" className="text-right">Directjob</Label>
                                <select defaultValue={user?.directjob || "Select"}
                                id="directjob"
                                name="directjob"
                                value={input?.directjob}
                                onChange={changeEventHandler}
                            >
                                <option>Choose...</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="trainingrequired" className="text-right">Trainingrequired</Label>
                                <select defaultValue={user?.trainingrequired || "Select"}
                                id="trainingrequired"
                                name="trainingrequired"
                                value={input?.trainingrequired}
                                onChange={changeEventHandler}
                            >
                                <option>Choose...</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="expectedsalary" className="text-right">ExpectedSalary</Label>
                                <Input
                                    id="expectedsalary"
                                    name="expectedsalary"
                                    value={input?.expectedsalary}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="negotiable" className="text-right">Negotiable</Label>
                                <Input
                                    id="negotiable"
                                    name="negotiable"
                                    value={input?.negotiable}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="hrsatisfactory" className="text-right">Hr satisfactory</Label>
                                <Input
                                    id="hrsatisfactory"
                                    name="hrsatisfactory"
                                    value={input?.hrsatisfactory}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default Hrdetails
