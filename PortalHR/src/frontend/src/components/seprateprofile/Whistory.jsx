import React, { useState } from 'react'
import { Button } from '../ui/button'
import { AreaChart, BedDouble, Biohazard, BiohazardIcon, BuildingIcon, Contact, Home, HomeIcon, LucideAreaChart, Mail, Navigation, NotebookIcon, Pen, Projector, StretchVertical } from 'lucide-react'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Workhistory from '../jobseekerupdates/Workhistory'

const Whistory = () => {
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
                            <h1 className="font-medium text-xl">Work History</h1>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right h-2 my-3 border-none" variant="outline">
                        <Pen height={'15px'} />
                    </Button>
                </div>
                <div className="flex items-center gap-3 my-2">
                    role
                    <span>{user?.workhistory?.technologyworked}</span>
                </div>

                <div className="flex items-center gap-3 my-2">
                    company details
                    <span>{user?.workhistory?.natureofwork?.companydetails}</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                    company address
                    <span>{user?.workhistory?.natureofwork?.companyaddress}</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                    Zone
                    <span>{user?.workhistory?.natureofwork?.zone}</span>
                </div>
            </div>
            <Workhistory open={open} setOpen={setOpen} />
        </div>
    )
}

export default Whistory
