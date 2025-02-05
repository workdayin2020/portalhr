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

const Addressupdate = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    // console.log(user)

    const [input, setInput] = useState({
        housetype: user?.addressdetails?.housetype|| "",
        hno: user?.addressdetails?.hno|| "",
        street: user?.addressdetails?.street|| "",
        area: user?.addressdetails?.area|| "",
        pincode: user?.addressdetails?.pincode|| "",
        city: user?.addressdetails?.city|| "",
        district: user?.addressdetails?.district|| "",
         
       
    });
    // console.log(input)
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("housetype", input.housetype);
        formData.append("hno", input.hno);
        formData.append("street", input.street);
        formData.append("area", input.area);
        formData.append("pincode", input.pincode);
        formData.append("city", input.city);
        formData.append("district", input.district);

       

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
            console.log(res)
            if (res.data.success) {
              
                 console.log(res.data.user)
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
                        <DialogTitle>Update Address</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>

                        <div className="flex flex-col gap-2 mb-4 w-80">
                            <Label className="font-bold">House Type</Label>
                            <select defaultValue={user?.address?.housetype || "Select"}
                                id="housetype"
                                name="housetype"
                                value={input.housetype}
                                onChange={changeEventHandler}
                            >
                                <option>Choose...</option>
                                <option value="own">Own</option>
                                <option value="Rented">Rented</option>
                            </select>
                        </div>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="hno" className="text-right">House Address</Label>
                                <Input
                                    id="hno"
                                    name="hno"
                                    type="text"
                                    value={input.hno}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="street" className="text-right">Street</Label>
                                <Input
                                    id="street"
                                    name="street"
                                    value={input.street}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="area" className="text-right">area</Label>
                                <Input
                                    id="area"
                                    name="area"
                                    value={input.area}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="city" className="text-right">city</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={input.city}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="district" className="text-right">district</Label>
                                <Input
                                    id="district"
                                    name="district"
                                    value={input.district}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="pincode" className="text-right">pincode</Label>
                                <Input
                                    id="pincode"
                                    name="pincode"
                                    value={input.pincode}
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

export default Addressupdate
