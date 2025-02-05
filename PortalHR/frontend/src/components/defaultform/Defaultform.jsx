import React, { Profiler, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Avatar, AvatarImage } from '../ui/avatar'
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";

import { Input } from '../ui/input'
// import { Select } from './ui/input'
import { Button } from '../ui/button'
import { AreaChart, BedDouble, Biohazard, BiohazardIcon, BuildingIcon, Contact, Home, HomeIcon, LucideAreaChart, Mail, Navigation, NotebookIcon, Pen, Projector, StretchVertical } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import AppliedJobTable from '../AppliedJobTable'
import UpdateProfileDialog from '../UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;


const Defaultform = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    return (
        <div>
         
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">


                {user?.role === "jobseeker" ? (
                    <>

                        <div className="flex justify-between">
                            <div className="flex items-center gap-4">
                                <div className='flex'>
                                    <div>
                                        <h1 className="font-medium text-xl">Account details</h1>
                                    </div>

                                    <div>
                                        <Button onClick={() => setOpen(true)} className="text-right h-2 my-3 border-none" variant="outline">
                                            <Pen height={'15px'}/>
                                        </Button>
                                    </div>
                                </div>
                              
                            </div>
                           
                        </div>
                        {/* personal details */}
                        <div >
                            <div className="my-5">
                
                                <div className="flex items-center gap-3 my-2">
                                    <Mail />
                                    <span>{user?.email}</span>
                                </div>
                                <div className="flex items-center gap-3 my-2">
                                    <Contact />
                                    <span>{user?.phoneNumber}</span>
                                </div>
                                <div className="flex items-center gap-3 my-2">

                                    {
                                        user?.gender === 'male' ? <FaMale /> : <FaFemale />
                                    }


                                    <span>{user?.gender}</span>
                                </div>
                            </div>
                        </div>
                        <div className="my-5">
                            <h1>Skills</h1>
                            <div className="flex items-center gap-1">
                                {user?.profile?.skills.length !== 0 ? (
                                    user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                                ) : (
                                    <span>NA</span>
                                )}
                            </div>
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label className="text-md font-bold">Resume</Label>
                            {isResume ? (
                                <a
                                    target="blank"
                                    href={user?.profile?.resume}
                                    className="text-blue-500 w-full hover:underline cursor-pointer"
                                >
                                    {user?.profile?.resumeOriginalName}
                                </a>
                            ) : (
                                <span>NA</span>
                            )}
                        </div>

                        
                        <UpdateProfileDialog open={open} setOpen={setOpen} />
                    </>
                ) : user?.role === "Hr" ? (
                    <>
                        {/* HR Details */}
                        <div className="">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-3 my-2">
                                    <div className='flex'>
                                        <div>
                                            <h1 className="font-medium text-xl">Account details</h1>
                                        </div>

                                        <div>
                                            <Button onClick={() => setOpen(true)} className="text-right h-2 my-3 border-none" variant="outline">
                                                <Pen height={'15px'}/>
                                            </Button></div>
                                    </div>

                                    
                                </div>

                            </div>
                            <div className="flex items-center gap-3 my-2">
                                <NotebookIcon />
                                <p>{user?.profile?.bio}</p>
                            </div>
                            <div className="my-5">
                                <div className="flex items-center gap-3 my-4">
                                    <Mail />
                                    <span>{user?.email}</span>
                                </div>
                                <div className="flex items-center gap-3 my-4">
                                    <Contact />
                                    <span>{user?.phoneNumber}</span>
                                </div>



                            </div>
                            <UpdateProfileDialog open={open} setOpen={setOpen} />



                        </div>

                    </>) : user?.role === "Employeer" ? (
                        <>
                            {/* HR Details */}
                            <div className="">
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <div>
                                                <h1 className="font-medium text-xl">Account details</h1>
                                            </div>

                                            <div>
                                                <Button onClick={() => setOpen(true)} className="text-right h-2 my-3 border-none" variant="outline">
                                                    <Pen height={'15px'}/>
                                                </Button></div>
                                        </div>
                                    </div>

                                </div>

                                <div className="my-5">
                                    <div className="flex items-center gap-3 my-4">
                                        <Mail />
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 my-4">
                                        <Contact />
                                        <span>{user?.phoneNumber}</span>
                                    </div>

                                </div>
                                <UpdateProfileDialog open={open} setOpen={setOpen} />



                            </div>

                        </>
                    ) : null





                }


            </div>


        </div>
    )
}

export default Defaultform
