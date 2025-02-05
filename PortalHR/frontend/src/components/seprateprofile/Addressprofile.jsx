import React, { useState } from 'react'

import { Button } from '../ui/button'
import { AreaChart, BedDouble, Biohazard, BiohazardIcon, BuildingIcon, Contact, Home, HomeIcon, LucideAreaChart, Mail, Navigation, NotebookIcon, Pen, Projector, StretchVertical } from 'lucide-react'

import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Addressupdate from '../jobseekerupdates/Addressupdate';


const Addressprofile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);


    return (
        <div>
            <div className="my-5">
                <div className="flex">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="font-medium text-xl">Address</h1>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right h-2 my-3 border-none" variant="outline">
                        <Pen height={'15px'} />
                    </Button>
                </div>
                <div className="flex items-center gap-3 my-2">
                    <HomeIcon />
                    <span>{user?.addressdetails?.housetype}</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                    <Home />
                    <span>{user?.addressdetails?.hno}</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                    Street
                    <span>{user?.addressdetails?.street}</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                    Area
                    <span>{user?.addressdetails?.area}</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                    City
                    <span>{user?.addressdetails?.city}</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                    District
                    <span>{user?.addressdetails?.district}</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                    Pincode
                    <span>{user?.addressdetails?.pincode}</span>
                </div>
            </div>
            <Addressupdate open={open} setOpen={setOpen} />

        </div>
    )
}

export default Addressprofile
