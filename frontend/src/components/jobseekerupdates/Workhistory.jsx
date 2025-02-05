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

const Workhistory = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    // if (technologyworked) user.workhistory.technologyworked = technologyworked;
    //         if (companydetails) user.workhistory.natureofwork.companydetails = companydetails;
    //         if (companyaddress) user.workhistory.natureofwork.companyaddress = companyaddress;
    //         if (zone) user.workhistory.natureofwork.zone = zone;

    const [input, setInput] = useState({
        technologyworked: user?.workhistory?.technologyworked || "",
        companydetails: user?.workhistory?.natureofwork?.companydetails || "",
        companyaddress: user?.workhistory?.natureofwork?.companyaddress || "",
       zone: user?.workhistory?.natureofwork?.zone
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
        formData.append("technologyworked", input.technologyworked);
        formData.append("companydetails",input.companydetails);
        formData.append("companyaddress",input.companyaddress);
        formData.append("zone",input.zone)
       

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
                console.log(res.data.maritalstatus)

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
                        <DialogTitle>Work history</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>

                       
                        <div className='grid gap-4 py-4'>
                       
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="technologyworked" className="text-right">Technology</Label>
                                <Input
                                    id="technologyworked"
                                    name="technologyworked"
                                    type="text"
                                    value={input.technologyworked}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="companydetails" className="text-right">Company details</Label>
                                <Input
                                    id="companydetails"
                                    name="companydetails"
                                    type="text"
                                    value={input.companydetails}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="companyaddress" className="text-right">CompanyAddress</Label>
                                <Input
                                    id="companyaddress"
                                    name="companyaddress"
                                    type="text"
                                    value={input.companyaddress}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="zone" className="text-right">Zone</Label>
                                <Input
                                    id="zone"
                                    name="zone"
                                    type="text"
                                    value={input.zone}
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


export default Workhistory
