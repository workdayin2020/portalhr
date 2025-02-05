import React, { Profiler, useState } from 'react'
import { Button } from '../ui/button'
import { AreaChart, BedDouble, Biohazard, BiohazardIcon, BuildingIcon, Contact, Home, HomeIcon, LucideAreaChart, Mail, Navigation, NotebookIcon, Pen, Projector, StretchVertical } from 'lucide-react'

import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

import Additionaldetails from '../jobseekerupdates/Additionaldetails'

const Additionalprofile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    // console.log(user)
  return (
    <div>
    <div className="my-5">
        <div className="flex">
            <div className="flex items-center gap-4">
                <div>
                    <h1 className="font-medium text-xl">Additional details</h1>
                </div>
            </div>
            <Button onClick={() => setOpen(true)} className="text-right h-2 my-3 border-none" variant="outline">
                <Pen height={'15px'}/>
            </Button>
        </div>
        
        <div className="flex items-center gap-3 my-2">
           Experience level
            <span>{user?.Experiencelevel}</span>
        </div>
        <div className="flex items-center gap-3 my-2">
            languages
            <span>{user?.languages}</span>
        </div>
     
        
    </div>
    <Additionaldetails open={open} setOpen={setOpen} />

</div>

  )
}

export default Additionalprofile
