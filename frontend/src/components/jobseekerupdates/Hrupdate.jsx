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

const Hrupdate = ({ open, setOpen }) => {

    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        bio: user?.profile?.bio || "",
        maritalstatus:user?.profile?.maritalstatus||"",
        category:user?.profile?.category||"",
        gst:user?.profile?.gst||"",
        pan:user?.profile?.pan||"",
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
        formData.append("bio", input.bio);
        formData.append("maritalstatus",input.maritalstatus);
        formData.append("category",input.category)
        formData.append("gst",input.gst);
        formData.append("pan",input.pan)






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
                <DialogContent className="sm:max-w-[825px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className="flex justify-evenly">
                            {/* Basic Info Section */}
                            <div>

                                <div className="flex flex-col gap-2 mb-4 w-80">
                                    <Label className="font-bold">Bio</Label>
                                    <textarea defaultValue={user?.profile?.bio || ""}
                                        id="bio"
                                        name="bio"
                                        value={input?.profile?.bio}
                                        onChange={changeEventHandler}
                                    />
                                </div>


                                <div className="flex flex-col gap-2 mb-4 w-80">
                                    <Label className="font-bold">Marital status</Label>
                                    <select defaultValue={user?.profile?.maritalstatus || "Select"}
                                        id="maritalstatus"
                                        name="maritalstatus"
                                        value={input?.profile?.maritalstatus}
                                        onChange={changeEventHandler}
                                    >
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>



                            </div>


                            <div>
                                {/* Add HR-specific fields */}

                                <div className="flex flex-col gap-2 mb-4 w-80">
                                    <Label className="font-bold">Category</Label>
                                    <select defaultValue={user?.profile?.category || "Select"}
                                        id="category"
                                        name="category"
                                        value={input?.profile?.category}
                                        onChange={changeEventHandler}
                                    >
                                        <option value="IT">IT</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* gst and pan */}
                          
                           
                                <div className="flex flex-col gap-2 mb-4 w-80">
                                    <Label className="font-bold">GST</Label>
                                    <Input defaultValue={user?.profile?.gst || ""}
                                        id="gst"
                                        name="gst"
                                        value={input?.profile?.gst}
                                        onChange={changeEventHandler}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 mb-4 w-80">
                                    <Label className="font-bold">PAN</Label>
                                    <Input defaultValue={user?.profile?.pan || ""}
                                        id="pan"
                                        name="pan"
                                        value={input?.profile?.pan}
                                        onChange={changeEventHandler} />
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

export default Hrupdate
