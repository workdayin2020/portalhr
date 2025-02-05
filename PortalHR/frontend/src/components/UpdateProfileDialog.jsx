import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import Addressupdate from './jobseekerupdates/Addressupdate'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        dateofbirth : user?.profile?.dateofbirth||"",
        maritalstatus:user?.profile?.maritalstatus||"",
        category:user?.profile?.category||"",
        companydetails : user?.profile?.companydetails||"",
        companyIndustries:user?.profile?.companyIndustries||"",
        gst:user?.profile?.gst||"",
        pan:user?.profile?.pan||"",
        skills: user?.profile?.skills?.join(",") || "",  // Join array for input
        file: user?.profile?.resume || ""
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
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        formData.append("dateofbirth",input.dateofbirth);
        formData.append("maritalstatus",input.maritalstatus);
        formData.append("category",input.category)
        formData.append("companydetails",input.companydetails)
        formData.append("companyIndustries",input.companyIndustries);
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
            {
                user?.role === "jobseeker" ? (
                    <Dialog open={open}>
                        <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                            <DialogHeader>
                                <DialogTitle>Update Profile</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={submitHandler}>
                                <div className='grid gap-4 py-4'>
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor="name" className="text-right">Name</Label>
                                        <Input
                                            id="name"
                                            name="fullname"
                                            type="text"
                                            value={input.fullname}
                                            onChange={changeEventHandler}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor="email" className="text-right">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={input.email}
                                            onChange={changeEventHandler}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor="phoneNumber" className="text-right">Phone Number</Label>
                                        <Input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={input.phoneNumber}
                                            onChange={changeEventHandler}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor="bio" className="text-right">Bio</Label>
                                        <Input
                                            id="bio"
                                            name="bio"
                                            value={input.bio}
                                            onChange={changeEventHandler}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor="skills" className="text-right">Skills</Label>
                                        <Input
                                            id="skills"
                                            name="skills"
                                            value={input.skills}
                                            onChange={changeEventHandler}
                                            className="col-span-3"
                                        />
                                    </div>
                                    {/* <Addressupdate/> */}
                                     <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor="skills" className="text-right">Skills</Label>
                                        <Input
                                            id="skills"
                                            name="skills"
                                            value={input.skills}
                                            onChange={changeEventHandler}
                                            className="col-span-3"
                                        />
                                    </div>
                                    
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor="file" className="text-right">Resume</Label>
                                        <Input
                                            id="file"
                                            name="file"
                                            type="file"
                                            accept=".pdf, .doc, .docx, .txt"
                                            onChange={fileChangeHandler}
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
                    
                ) : user?.role === "Hr" ? (
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
                                        <Label className="font-bold">Name</Label>
                                        <Input defaultValue={user?.fullname || ""} 
                                        name="fullname"
                                        type="text"
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                        />
                                    </div>  
<div className="flex flex-col gap-2 mb-4 w-80">
                                        <Label className="font-bold">Email</Label>
                                        <Input defaultValue={user?.email || ""} 
                                        name="email"
                                        type="text"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        
                                        />
                                    </div>


 <div className="flex flex-col gap-2 mb-4 w-80">
                                        <Label className="font-bold">Phone Number</Label>
                                        <Input defaultValue={user?.phoneNumber || ""} 
                                         id="phoneNumber"
                                         name="phoneNumber"
                                         value={input.phoneNumber}
                                         onChange={changeEventHandler}
                                        />
                                    </div>




                                    </div>
                                    
                                    
                                   <div>
                              
                                 
                                   
                                  
                                


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
                ) : user?.role === "Employeer" ? (
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
                                        <Label className="font-bold">Name</Label>
                                        <Input defaultValue={user?.fullname || ""} 
                                        name="fullname"
                                        type="text"
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                        />
                                    </div>  
<div className="flex flex-col gap-2 mb-4 w-80">
                                        <Label className="font-bold">Email</Label>
                                        <Input defaultValue={user?.email || ""} 
                                        name="email"
                                        type="text"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        
                                        />
                                    </div>


 <div className="flex flex-col gap-2 mb-4 w-80">
                                        <Label className="font-bold">Phone Number</Label>
                                        <Input defaultValue={user?.phoneNumber || ""} 
                                         id="phoneNumber"
                                         name="phoneNumber"
                                         value={input.phoneNumber}
                                         onChange={changeEventHandler}
                                        />
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
                                    

                                    {/* Add company-related fields */}
                                    <div className="flex flex-col gap-2 mb-4 w-80">
                                        <Label className="font-bold">Company Industry</Label>
                                        <select defaultValue={user?.profile?.companyIndustries }
                                        id="companyIndustries"
                                        name="companyIndustries"
                                        value={input?.profile?.companyIndustries}
                                        onChange={changeEventHandler}
                                        >
                                            <option value="webdeveloper">web developer</option>
                                            <option value="Salemen">Salemen</option>
                                            <option value="Android">Android dev</option>
                                        </select>
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
                    </Dialog>)
                :null
            }
        </div>
    )
}

export default UpdateProfileDialog




































































































// import React, { useState } from 'react'
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
// import { Label } from './ui/label'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import { Loader2 } from 'lucide-react'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant'
// import { setUser } from '@/redux/authSlice'
// import { toast } from 'sonner'
// import Hreditprofile from './profileinnercomponents/Hreditprofile'

// const UpdateProfileDialog = ({ open, setOpen }) => {
//     const [loading, setLoading] = useState(false);
//     const { user } = useSelector(store => store.auth);

//     const [input, setInput] = useState({
//         fullname: user?.fullname || "",
//         email: user?.email || "",
//         phoneNumber: user?.phoneNumber || "",
//         bio: user?.profile?.bio || "",
//         skills: user?.profile?.skills?.map(skill => skill) || "",
//         file: user?.profile?.resume || ""
//     });
//     const dispatch = useDispatch();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }

//     const fileChangeHandler = (e) => {
//         const file = e.target.files?.[0];
//         setInput({ ...input, file })
//     }

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("fullname", input.fullname);
//         formData.append("email", input.email);
//         formData.append("phoneNumber", input.phoneNumber);
//         formData.append("bio", input.bio);
//         formData.append("skills", input.skills);
//         if (input.file) {
//             formData.append("file", input.file);
//         }
//         try {
//             setLoading(true);
//             const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 withCredentials: true
//             });
//             if (res.data.success) {
//                 dispatch(setUser(res.data.user));
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally {
//             setLoading(false);
//         }
//         setOpen(false);
//         console.log(input);
//     }



//     return (

//         <div>{
//             user?.role === "jobseeker" ? (
//                 <Dialog open={open}>
//                     <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
//                         <DialogHeader>
//                             <DialogTitle>Update Profile</DialogTitle>
//                         </DialogHeader>

//                         <form onSubmit={submitHandler}>
//                             <div className='grid gap-4 py-4'>
//                                 <div className='grid grid-cols-4 items-center gap-4'>
//                                     <Label htmlFor="name" className="text-right">Name</Label>
//                                     <Input
//                                         id="name"
//                                         name="name"
//                                         type="text"
//                                         value={input.fullname}
//                                         onChange={changeEventHandler}
//                                         className="col-span-3"
//                                     />
//                                 </div>
//                                 <div className='grid grid-cols-4 items-center gap-4'>
//                                     <Label htmlFor="email" className="text-right">Email</Label>
//                                     <Input
//                                         id="email"
//                                         name="email"
//                                         type="email"
//                                         value={input.email}
//                                         onChange={changeEventHandler}
//                                         className="col-span-3"
//                                     />
//                                 </div>
//                                 <div className='grid grid-cols-4 items-center gap-4'>
//                                     <Label htmlFor="number" className="text-right">Number</Label>
//                                     <Input
//                                         id="number"
//                                         name="number"
//                                         value={input.phoneNumber}
//                                         onChange={changeEventHandler}
//                                         className="col-span-3"
//                                     />
//                                 </div>
//                                 <div className='grid grid-cols-4 items-center gap-4'>
//                                     <Label htmlFor="bio" className="text-right">Bio</Label>
//                                     <Input
//                                         id="bio"
//                                         name="bio"
//                                         value={input.bio}
//                                         onChange={changeEventHandler}
//                                         className="col-span-3"
//                                     />
//                                 </div>
//                                 <div className='grid grid-cols-4 items-center gap-4'>
//                                     <Label htmlFor="skills" className="text-right">Skills</Label>
//                                     <Input
//                                         id="skills"
//                                         name="skills"
//                                         value={input.skills}
//                                         onChange={changeEventHandler}
//                                         className="col-span-3"
//                                     />
//                                 </div>
//                                 <div className='grid grid-cols-4 items-center gap-4'>
//                                     <Label htmlFor="file" className="text-right">Resume</Label>
//                                     <Input
//                                         id="file"
//                                         name="file"
//                                         type="file"
//                                         accept=".pdf, .doc, .docx, .txt"
//                                         onChange={fileChangeHandler}
//                                         className="col-span-3"
//                                     />
//                                 </div>
//                             </div>
//                             <DialogFooter>
//                                 {
//                                     loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
//                                 }
//                             </DialogFooter>
//                         </form>
//                     </DialogContent>
//                 </Dialog>
//             )
//                 : user?.role === "Hr" ? (
//                     <>
//                         {/* HR Details */}
//                         <Dialog open={open}>
//                             <DialogContent className="sm:max-w-[825px]" onInteractOutside={() => setOpen(false)}>
//                                 <DialogHeader>
//                                     <DialogTitle>Update Profile</DialogTitle>
//                                 </DialogHeader>
//                                 <form>
                                    

//                                     <div className="flex justify-evenly  gap-7">
//                                         <div>
//                                             <div className="flex flex-col gap-2 mb-4 w-80">
//                                             <Label className="font-bold">Name</Label>
//                                             <Input defaultValue={user?.fullname || ""} />
//                                         </div>
//                                         <div className="flex flex-col gap-2 mb-4 w-80 h-20">
//                                             <Label className="font-bold">Gender</Label>
//                                             <select defaultValue={user?.profile?.gender || "Select"}>
//                                                 <option value="Male">Male</option>
//                                                 <option value="Female">Female</option>
//                                                 <option value="Other">Other</option>
//                                             </select>
//                                         </div>
//                                         <div className="flex flex-col gap-2 mb-4 w-80">
//                                             <Label className="font-bold">Email</Label>
//                                             <Input defaultValue={user?.email || ""} />
//                                         </div>
//                                         <div className="flex flex-col gap-2 mb-4 w-80">
//                                             <Label className="font-bold">Phone Number</Label>
//                                             <Input defaultValue={user?.phoneNumber || ""} />
//                                         </div>
//                                         <div className="flex flex-col gap-2 mb-4 w-80">
//                                             <Label className="font-bold">Bio</Label>
//                                             <textarea defaultValue={user?.profile?.bio || ""} />
//                                         </div>
//                                         <div className="flex flex-col gap-2 mb-4 w-80">
//                                             <Label className="font-bold">Date of Birth</Label>
//                                             <Input type="date" defaultValue={user?.profile?.dob || ""} />
//                                         </div>
//                                         <div className="flex flex-col gap-2 mb-4 w-80">
//                                             <Label className="font-bold">Marital Status</Label>
//                                             <select defaultValue={user?.profile?.maritalStatus || "Select"}>
//                                                 <option value="Single">Single</option>
//                                                 <option value="Married">Married</option>
//                                                 <option value="Other">Other</option>
//                                             </select>
//                                         </div>
//                                         <div className="flex flex-col gap-2 mb-4 w-80">
//                                             <Label className="font-bold">Category</Label>
//                                             <select defaultValue={user?.profile?.category || "Select"}>
//                                                 <option value="IT">IT</option>
//                                                 <option value="Marketing">Marketing</option>
//                                                 <option value="Finance">Finance</option>
//                                                 <option value="Other">Other</option>
//                                             </select>
//                                         </div>
//                                         </div>
                                       
//                                         <div>
                                      
                                       
//                                         <div className="flex flex-col gap-2 mb-4 w-80">
//                                             <Label className="font-bold">Permanent Address</Label>
//                                             <textarea defaultValue={user?.profile?.address || ""} />
//                                         </div>
//                                         <div className="flex flex-col gap-2 mb-4 w-80">
//                                             <Label className="font-bold">Street</Label>
//                                             <Input defaultValue={user?.profile?.street || ""} />
//                                         </div>
//                                         <div className="flex flex-col gap-2 mb-4 w-80">
//                                             <Label className="font-bold">Pincode</Label>
//                                             <Input defaultValue={user?.profile?.pincode || ""} />
//                                         </div>
//                                         <div className="flex flex-col gap-2 mb-4 w-80">
//                                             <Label className="font-bold">Company Details</Label>
//                                             <select defaultValue={user?.profile?.company || "Select"}>
//                                                 <option value="Industry 1">Industry 1</option>
//                                                 <option value="Industry 2">Industry 2</option>
//                                                 <option value="Industry 3">Industry 3</option>
//                                             </select>
//                                         </div>
//                                         <div className="flex flex-col gap-2 mb-4 w-80">
//                                             <Label className="font-bold">Company Address</Label>
//                                             <textarea defaultValue={user?.profile?.companyAddress || ""} />
//                                         </div>
//                                         <div className="flex flex-col gap-2 mb-4 w-80">
//                                             <Label className="font-bold">GST</Label>
//                                             <Input defaultValue={user?.profile?.gst || ""} />
//                                         </div>
//                                         <div className="flex flex-col gap-2 mb-4 w-80">
//                                             <Label className="font-bold">PAN</Label>
//                                             <Input defaultValue={user?.profile?.pan || ""} />
//                                         </div>

//                                         </div>
                                        
                                       
//                                     </div>
//                                     <DialogFooter>
//                                         {
//                                             loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
//                                         }
//                                     </DialogFooter>
//                                 </form>
//                             </DialogContent>
//                         </Dialog>
//                     </>
//                 ) : <>null</>}


//         </div>
//     )
// }

// export default UpdateProfileDialog