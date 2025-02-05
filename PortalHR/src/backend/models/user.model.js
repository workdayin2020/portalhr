import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: String,
    rating: {
      type: mongoose.Schema.Types.Mixed,
      default: "",
    },
  })
  
  const skillAssessmentSchema = new mongoose.Schema({
    specialization: {
      type: String,
      default: "",
    },
    technical: {
      type: String,
      default: "",
    },
    questions: {
      "Personal / Psychology / Aptitude": [questionSchema],
      Technical: [questionSchema],
      "Professional / Responsibility": [questionSchema],
    },
  })
  

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: Number,
        },
        password: {
            type: String,
            required: true,
        },  
        gender: {
            type: String,
            enum:['male','female']
        },
        role: {
            type: String,
            enum: ["jobseeker", "Employeer", "Hr"],
            required: true,
        },
        subscription:{
            tokensAvailable:{
                type: Number,
                default: 0
            },
            tokensConsumed:{
                type: Number,
                default: 0
            },
            pendingTokens: {
                type: Number,
                default: 0
            }
        },
        addressdetails: {
            housetype: {
                type: String
            },

            hno: {
                type: String
            },
            street: {
                type: String
            },
            area: {
                type: String
            },
            city: {
                type: String,
                
            },
            district: {
                type: String
            },
            pincode: {
                type: String
            }
        },


        // personal details

        personaldetails: {
            fathername: {
                type: String
            },
            aaddharnum: {
                type: Number,
                default:0
            },
            dateofbirth:{
                type:Date
            }
        },

        //   medical terms
        PhysicalDetails: {
            height: {
                type: String
            },
            weight: {
                type: String
            },
            Bloodgroup: {
                type: String
            }
        },

        

        Experiencelevel: {
            type: String
        },

        // work history
        workhistory: {
            technologyworked: {
                type: String
            },
            natureofwork: {
               
                companydetails: {
                    type: String
                },
                companyaddress: {
                    type: String
                },

                zone: {
                    type: String
                }
            },
        },

        languages:{
            type:String
        },
        hrexe:{
            directjob:{
                type:String
            },
            trainingrequired:{
                type:String
            },
            expectedsalary:{
                type:String
            },
            negotiable:{
                type:String
            },
            hrsatisfactory:{
                type:String
            }

        },


     
    // Educational details
    education: [
        {
            instituionname: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            fieldOfStudy: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
            },
            endDate: {
                type: Date,
            },
            grade:{
                type:String
            }

        }
    ],
           


        profile: {
            bio: { type: String },
            skills: [{ type: String }], // Only for jobseekers
            resume: { type: String }, // URL to resume file (Only for jobseekers)

            // Common fields for recruiter and HR
            dateofbirth: { type: Date },
            maritalstatus: { type: String, },
            category: {
                type: String,
            },
            // Company details (for recruiter & HR)
            companyIndustries: {
                type: String,

            },


            // Additional fields for HR only
            gst: { type: String }, // Only for HR
            pan: { type: String }, // Only for HR

            profilePhoto: {
                type: String,
                default: "",
            },
        },

        skillAssessment: {
            type: skillAssessmentSchema,
            default: () => ({
              specialization: "",
              technical: "",
              questions: {
                "Personal / Psychology / Aptitude": [],
                Technical: [],
                "Professional / Responsibility": [],
              },
            }),
          },
    },
    
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);













// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     fullname: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     phoneNumber: {
//         type: Number,
//         required: true
//     },
//     password:{
//         type:String,
//         required:true,
//     },
//     city:{
//         type:String,
//         required:true
//     },
//     role:{
//         type:String,
//         enum:['jobseeker','Employeer','Hr'],
//         required:true
//     },
//     profile:{
//         bio:{type:String},
//         skills:[{type:String}],
//         resume:{type:String}, // URL to resume file
//         resumeOriginalName:{type:String},
//         company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},
//         profilePhoto:{
//             type:String,
//             default:""
//         }
//     },
// },{timestamps:true});
// export const User = mongoose.model('User', userSchema);