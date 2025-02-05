import React, { Profiler, useState } from 'react'
import { Button } from '../ui/button'
import { AreaChart, BedDouble, Biohazard, BiohazardIcon, BuildingIcon, Contact, Home, HomeIcon, LucideAreaChart, Mail, Navigation, NotebookIcon, Pen, Projector, StretchVertical } from 'lucide-react'

import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Personaldetails from '../jobseekerupdates/Personaldetails';

const Pdetails = () => {
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
                    <h1 className="font-medium text-xl">Personal details</h1>
                </div>
            </div>
            <Button onClick={() => setOpen(true)} className="text-right h-2 my-3 border-none" variant="outline">
                <Pen height={'15px'}/>
            </Button>
        </div>
        
        <div className="flex items-center gap-3 my-2">
           Fathername
            <span>{user?.personaldetails?.fathername}</span>
        </div>
        {
            user.role==='jobseeker'?(<div className="flex items-center gap-3 my-2">
            Addhar number
            <span>{user?.personaldetails?.aaddharnum}</span>
        </div>):(null)
        }
        
        <div className="flex items-center gap-3 my-2">
            Date of birth
            <span>{user?.personaldetails?.dateofbirth}</span>
            
        </div>
     
     
        
    </div>
    <Personaldetails open={open} setOpen={setOpen} />

</div>

  )
}

export default Pdetails
