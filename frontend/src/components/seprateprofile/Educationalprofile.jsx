
import React, { Profiler, useState } from 'react'
import { Button } from '../ui/button'
import {  Pen } from 'lucide-react'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

import Educationalupdate from '../jobseekerupdates/Educationalupdate'


const Educationalprofile = ({ open, setOpen }) => {
    useGetAppliedJobs();
    

    const { user } = useSelector(store => store.auth);
    const educationFullDetails = user?.education
    return (
        <div>
        <div className="my-5">
            <div className="flex">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="font-medium text-xl">Educational Details</h1>
                    </div>
                </div>
                <Button onClick={() => setOpen(true)} className="text-right h-2 my-3 border-none" variant="outline">
                    <Pen height={'15px'}/>
                </Button>
            </div>
            <div>
             {!educationFullDetails || educationFullDetails.length === 0? <div> no education details </div>: educationFullDetails.map((item, index) => (
                    <div key={index}>
                    <h3>Institution {index + 1}</h3>
                    <label>Institution Name: </label>
                    <span>{item.instituionname}</span>
                    <br />
                    <label>Degree: </label>
                    <span>{item.degree}</span>
                    <br />
                    <label>Field of Study: </label>
                    <span>{item.fieldOfStudy}</span>
                    <br />
                    <label>Start Date: </label>
                    <span>{item.startDate}</span>
                    <br />
                    <label>End Date: </label>
                    <span>{item.endDate}</span>
                    <br />
                    <label>Grade: </label>
                    <span>{item.grade}</span>
                    <br />
                    <hr />
                    </div>
                ))}
                </div>
            {/* <div className="flex items-center gap-3 my-2">
               School
                <span> {user?.educationaldetails?.school}</span>
            </div>
            <div className="flex items-center gap-3 my-2">
                Degree
                <span> {user?.educationaldetails?.degree}</span>
            </div>
            <div className="flex items-center gap-3 my-2">
                Field of Study:
                <span> {user?.educationaldetails?.fieldOfStudy}</span>
            </div>
           
            <div className="flex items-center gap-3 my-2">
                Start Year: 
                <span>{user?.educationaldetails?.startYear}</span>
                
            </div>
            <div className="flex items-center gap-3 my-2">
                End Year: 
                <span>{user?.educationaldetails?.endYear}</span>
                
            </div> */}
         
         
            <Educationalupdate open={open} setOpen={setOpen} />
        </div>
        
    
    </div>


    
    )
}

export default Educationalprofile
