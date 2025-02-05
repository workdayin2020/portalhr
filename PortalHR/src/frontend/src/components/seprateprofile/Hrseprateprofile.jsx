import React, { useState } from 'react'


// import { Select } from '../ui/input'
import { Button } from '../ui/button'
import { AreaChart, BedDouble, Biohazard, BiohazardIcon, BuildingIcon, Contact, Home, HomeIcon, LucideAreaChart, Mail, Navigation, NotebookIcon, Pen, Projector, StretchVertical } from 'lucide-react'

import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

import Hrupdate from '../jobseekerupdates/Hrupdate'

const Hrseprateprofile = () => {
    useGetAppliedJobs();
   
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    // console.log(user)


    return (
        <div >
            <div className="my-5">
                <div className="flex">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="font-medium text-xl">Hr personal Profile </h1>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right h-2 my-3 border-none" variant="outline">
                        <Pen height={'15px'} />
                    </Button>
                </div>


                <div className="flex items-center gap-3 my-4">
                                    <h1>Bio</h1>
                                    <span>{user?.profile?.bio}</span>
                                </div>

                                <div className="flex items-center gap-3 my-4">

                                    <h2>Martial Status</h2>
                                    <span>{user?.profile?.maritalstatus}</span>
                                </div>
                                <div className="flex items-center gap-3 my-4">
                                    <h2>Category</h2>
                                    <span>{user?.profile?.category}</span>
                                </div>

                                <div className="flex items-center gap-3 my-4">
                                    <h2>Company Industry</h2>
                                    <span> {user?.profile?.companyIndustries}</span>
                                </div>
                                <div className="flex items-center gap-3 my-4">
                                    <h2>GST</h2>
                                    <span> {user?.profile?.gst}</span>
                                </div>
                                <div className="flex items-center gap-3 my-4">
                                    <h2>PAN</h2>
                                    <span> {user?.profile?.pan}</span>
                                </div>

            </div>
            <Hrupdate open={open} setOpen={setOpen} />
        </div>
    )
}

export default Hrseprateprofile
