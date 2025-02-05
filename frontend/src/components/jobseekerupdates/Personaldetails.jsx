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

const Personaldetails = ({ open, setOpen }) => {

    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fathername: user?.personaldetails?.fathername,
        aaddharnum: user?.personaldetails?.aaddharnum || 0,
        dateofbirth: user?.personaldetails?.dateofbirth,
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
        formData.append("fathername", input.fathername);
        formData.append("aaddharnum", input.aaddharnum);
        formData.append("dateofbirth", input.dateofbirth);

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
                <DialogContent className="sm:max-w-[715px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Personal details</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>


                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4 w-[600px]'>
                                <Label htmlFor="fathername" className="text-right">Fathername/guardian</Label>
                                <Input
                                    id="fathername"
                                    name="fathername"
                                    type="text"
                                    value={input.fathername}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            {
                                user.role === 'jobseeker' ? (
                                    <div className='grid grid-cols-4 items-center gap-4 w-[600px]'>
                                        <Label htmlFor="aaddharnum" className="text-right">aadharcard</Label>
                                        <Input
                                            id="aaddharnum"
                                            name="aaddharnum"
                                            type="number"
                                            value={input.aaddharnum}
                                            onChange={changeEventHandler}
                                            className="col-span-3"
                                        />
                                    </div>
                                ) : (null)
                            }
                            <div className='grid grid-cols-4 gap-4 w-[600px]'>
                                <div>
                                    <Label htmlFor={`dateofbirth`} >Date of birth</Label>
                                </div>
                                <div>
                                    <Input
                                        type="date"
                                        name="dateofbirth"
                                        value={input.dateofbirth}
                                        onChange={changeEventHandler}
                                        className="col-span-3"

                                    />
                                </div>


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

export default Personaldetails
