import React, { useState } from 'react'


// import { Select } from '../ui/input'
import { Button } from '../ui/button'
import { AreaChart, BedDouble, Biohazard, BiohazardIcon, BuildingIcon, Contact, Home, HomeIcon, LucideAreaChart, Mail, Navigation, NotebookIcon, Pen, Projector, StretchVertical } from 'lucide-react'

import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Hrdetails from '../jobseekerupdates/Hrdetails'


const HrProfile = () => {
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
                            <h1 className="font-medium text-xl">Hr Executable Profile </h1>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right h-2 my-3 border-none" variant="outline">
                        <Pen height={'15px'} />
                    </Button>
                </div>
                <div className="flex items-center gap-3 my-2">
                    Direct Job
                    <span>{user?.hrexe?.directjob}</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                    Traning required
                    <span>{user?.hrexe?.trainingrequired}</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                    Expected Salary
                    <span>{user?.hrexe?.expectedsalary}</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                    Negotiable
                    <span>{user?.hrexe?.negotiable}</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                    Hr satisfactory
                    <span>{user?.hrexe?.hrsatisfactory}</span>
                </div>
            </div>
            <Hrdetails open={open} setOpen={setOpen} />
        </div>
    )
}

export default HrProfile
