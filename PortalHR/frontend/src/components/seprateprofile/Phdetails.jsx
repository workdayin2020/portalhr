import React, { Profiler, useState } from 'react'


import { Button } from '../ui/button'
import { AreaChart, BedDouble, Biohazard, BiohazardIcon, BuildingIcon, Contact, Home, HomeIcon, LucideAreaChart, Mail, Navigation, NotebookIcon, Pen, Projector, StretchVertical } from 'lucide-react'

import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Physicaldetails from '../jobseekerupdates/Physicaldetails'


const Phdetails = () => {
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
                            <h1 className="font-medium text-xl">Physical Details</h1>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right h-2 my-3 border-none" variant="outline">
                        <Pen height={'15px'} />
                    </Button>
                </div>
                <div className="flex items-center gap-3 my-2">
                    Height
                    <span>{user?.PhysicalDetails?.height}</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                    Weight
                    <span>{user?.PhysicalDetails?.weight}</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                    Bloodgroup
                    <span>{user?.PhysicalDetails?.Bloodgroup}</span>
                </div>


            </div>
            <Physicaldetails open={open} setOpen={setOpen} />
        </div>
    )
}

export default Phdetails
