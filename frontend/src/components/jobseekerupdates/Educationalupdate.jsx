import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const EducationalUpdate = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState([
    {
      instituionname: user?.education?.instituionname,
      degree: user?.education?.degree,
      fieldOfStudy: user?.education?.fieldOfStudy,
      startDate: user?.education?.startDate,
      endDate: user?.education?.endDate,
      grade: user?.education?.grade
    }
  ]);

  // Handle input change for a specific education entry
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const values = [...input];
    values[index] = { ...values[index], [name]: value };
    setInput(values);
  };

  // Add new education entry
  const addEducation = () => {
    setInput([...input, {
      instituionname: user?.education?.instituionname,
      degree: user?.education?.degree,
      fieldOfStudy: user?.education?.fieldOfStudy,
      startDate: user?.education?.startDate,
      endDate: user?.education?.endDate,
      grade: user?.education?.grade
    }]);
  };
  // console.log(input)

  // Remove an education entry
  const removeEducation = (index) => {
    const values = [...input];
    values.splice(index, 1);
    setInput(values);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataValue = new FormData();
    formDataValue.append('education', JSON.stringify(input));
    console.log(formDataValue)

    try {
      const response = await axios.post(`${USER_API_END_POINT}/profile/update`, formDataValue, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success('Educational details updated successfully');
      } else {
        toast.error('Failed to update educational details');
      }
    } catch (error) {
      console.log(error)
      toast.error('An error occurred while updating educational details');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[500px]" onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Update Educational Details</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {input.map((edu, i) => (
            <div key={i} className="mb-4 p-4 border rounded-lg">
              <div>
                <Label htmlFor={`instituionname-${i}`}>Institution Name</Label>
                <Input
                  type="text"
                  name="instituionname"
                  value={edu.instituionname}
                  placeholder="Institution Name"
                  onChange={(e) => handleChange(i, e)}
                  required
                />
              </div>

              <div>
                <Label htmlFor={`degree-${i}`}>Degree</Label>
                <Input
                  type="text"
                  name="degree"
                  value={edu.degree}
                  placeholder="Degree"
                  onChange={(e) => handleChange(i, e)}
                  required
                />
              </div>

              <div>
                <Label htmlFor={`fieldOfStudy-${i}`}>Field of Study</Label>
                <Input
                  type="text"
                  name="fieldOfStudy"
                  value={edu.fieldOfStudy}
                  placeholder="Field of Study"
                  onChange={(e) => handleChange(i, e)}
                  required
                />
              </div>

              <div className="flex justify-between">
                <div>
                  <Label htmlFor={`startDate-${i}`}>Start Date</Label>
                  <Input
                    type="date"
                    name="startDate"
                    value={edu.startDate}
                    onChange={(e) => handleChange(i, e)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor={`endDate-${i}`}>End Date</Label>
                  <Input
                    type="date"
                    name="endDate"
                    value={edu.endDate}
                    onChange={(e) => handleChange(i, e)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`grade-${i}`}>Grade</Label>
                <Input
                  type="text"
                  name="grade"
                  value={edu.grade}
                  placeholder="Grade"
                  onChange={(e) => handleChange(i, e)}
                  required
                />
              </div>

              {i > 0 && (
                <Button type="button" className="mt-2 bg-red-500 text-white" onClick={() => removeEducation(i)}>
                  Remove
                </Button>
              )}
            </div>
          ))}

          <Button type="button" className="w-full my-2 bg-blue-500 text-white" onClick={addEducation}>
            Add More
          </Button>

          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4 bg-green-500 text-white">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EducationalUpdate;
