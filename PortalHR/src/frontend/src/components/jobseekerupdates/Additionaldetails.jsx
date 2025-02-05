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

const Additionaldetails = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        Experiencelevel: user?.Experiencelevel,
        languages: user?.languages,
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
        formData.append("Experiencelevel", input.Experiencelevel);
        formData.append("languages",input.languages)
       

        // console.log(formData)



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
                        <DialogTitle>Additional details</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>

                       
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="Experiencelevel" className="text-right">Experience</Label>
                                <Input
                                    id="Experiencelevel"
                                    name="Experiencelevel"
                                    type="text"
                                    value={input.Experiencelevel}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="aadharcard" className="text-right">Languages</Label>
                                <Input
                                    id="languages"
                                    name="languages"
                                    type="text"
                                    value={input.languages}
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


export default Additionaldetails
