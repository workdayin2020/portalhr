import React, { Profiler, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";

import { Input } from './ui/input'
// import { Select } from './ui/input'
import { Button } from './ui/button'
import { AreaChart, BedDouble, Biohazard, BiohazardIcon, BuildingIcon, Contact, Home, HomeIcon, LucideAreaChart, Mail, Navigation, NotebookIcon, Pen, Projector, StretchVertical } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import SkillsetProfile from './SkillsetProfile';
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Addressprofile from './seprateprofile/Addressprofile';
import Pdetails from './seprateprofile/Pdetails';
import Whistory from './seprateprofile/Whistory';
import Phdetails from './seprateprofile/Phdetails';
import HrProfile from './seprateprofile/HrProfile';
import Additionaldetails from './jobseekerupdates/Additionaldetails';
import Educationalprofile from './seprateprofile/Educationalprofile';
import Additionalprofile from './seprateprofile/Additionalprofile';
import Hrseprateprofile from './seprateprofile/Hrseprateprofile';
import Defaultform from './defaultform/Defaultform';


// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    // console.log(user)

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
                {user?.role === "jobseeker" ? (
                    <>

                        <div className="flex justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage
                                        src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                                        alt="profile"
                                    />
                                </Avatar>
                                <div>
                                    <h1 className="font-medium text-xl">{user?.fullname}</h1>
                                    <p>{user?.profile?.bio}</p>
                                </div>
                            </div>
                          
                        </div>
                        {/* personal details */}
                        <Defaultform open={open} setOpen={setOpen} user={user}/>
                        {/* <div >
                            <div className="my-5">
                                <h1 className="text-lg font-bold">Account Details</h1>
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
                        </div> */}

                        {/* AddressHistory */}

                        <Addressprofile open={open} setOpen={setOpen} user={user} />

                        {/* personal details */}
                        <Pdetails open={open} setOpen={setOpen} user={user} />


                        {/* Work History */}

                        <Whistory open={open} setOpen={setOpen} user={user} />

                        <Additionalprofile open={open} setOpen={setOpen} user={user} />

                        {/* Educational Deatils */}

                        <Educationalprofile open={open} setOpen={setOpen} user={user} />



                        {/* Physical details */}

                        <Phdetails open={open} setOpen={setOpen} user={user} />





                        {/* <div className="my-5">
                            <h1>Skills</h1>
                            <div className="flex items-center gap-1">
                                {user?.profile?.skills.length !== 0 ? (
                                    user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                                ) : (
                                    <span>NA</span>
                                )}
                            </div>
                        </div> */}

                        {/* <div className="grid w-full max-w-sm items-center gap-1.5">
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
                        </div> */}
                        <div className="min-h-screen bg-white py-8">
                            <SkillsetProfile />
                        </div>
                        <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                            <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
                            {/* Applied Job Table */}
                            <AppliedJobTable />
                        </div>
                        <HrProfile />
                    </>
                ) : user?.role === "Hr" ? (
                    <>
                        {/* HR Details */}
                        <div className="">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-3 my-2">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage
                                            src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                                            alt="profile"
                                        />
                                    </Avatar>
                                    <div>
                                        <h1 className="font-medium text-xl">{user?.fullname}</h1>
                                        <p>{user?.role}</p>
                                    </div>
                                </div>
                               
                            </div>
                            <Defaultform open={open} setOpen={setOpen} user={user}/>
                            
                        

                                <Addressprofile open={open} setOpen={setOpen} user={user} />

                                {/* personal details */}
                                <Pdetails open={open} setOpen={setOpen} user={user} />


                                {/* Work History */}

                                <Whistory open={open} setOpen={setOpen} user={user} />
                               
                                <Additionalprofile open={open} setOpen={setOpen} user={user} />

                                {/* Educational Deatils */}

                                {/* <Educationalprofile open={open} setOpen={setOpen} user={user} /> */}

                                    <Hrseprateprofile />


                                {/* Physical details */}

                                {/* <Phdetails open={open} setOpen={setOpen} user={user} /> */}

                            </div>
                            


                        

                    </>
                ) : user?.role === "Employeer" ? (
                    <>
                        {/* HR Details */}
                        <div className="">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage
                                            src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                                            alt="profile"
                                        />
                                    </Avatar>
                                    <div>
                                        <h1 className="font-medium text-xl">{user?.fullname}</h1>
                                        <p>{user?.role}</p>
                                    </div>
                                </div>
                                <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
                                    <Pen />
                                </Button>
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
                                <Addressprofile open={open} setOpen={setOpen} user={user} />

                                {/* personal details */}
                                <Pdetails open={open} setOpen={setOpen} user={user} />



                                {/* Work History */}

                                <Whistory open={open} setOpen={setOpen} user={user} />

                                <Additionalprofile open={open} setOpen={setOpen} user={user} />

                                {/* Educational Deatils */}

                                <Educationalprofile open={open} setOpen={setOpen} user={user} />



                                {/* Physical details */}

                                <Phdetails open={open} setOpen={setOpen} user={user} />
                               

                               
                           


                            </div>
                            {/* <UpdateProfileDialog open={open} setOpen={setOpen} /> */}



                        </div>

                    </>
                ) : null}


            </div>

        </div>
    )
}

export default Profile