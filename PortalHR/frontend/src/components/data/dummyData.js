// Dummy data for the job portal
export const dummyData = {
    // Token packages
    tokenPackages: [
      { id: 1, name: "Starter", tokens: 10, price: 49.99 },
      { id: 2, name: "Professional", tokens: 50, price: 199.99 },
      { id: 3, name: "Enterprise", tokens: 200, price: 699.99 },
    ],
  
    // Employers
    employers: [
      { id: 1, name: "Tech Corp", email: "hr@techcorp.com" },
      { id: 2, name: "Data Systems", email: "hiring@datasystems.com" },
      { id: 3, name: "AI Solutions", email: "talent@aisolutions.com" },
    ],
  
    // Subscriptions
    subscriptions: [
      {
        id: 1,
        employerId: 1,
        packageId: 2,
        tokensAvailable: 35,
        tokensConsumed: 15,
        paymentStatus: "approved",
        createdAt: "2024-02-20T10:00:00Z",
        approvedAt: "2024-02-20T11:00:00Z",
        paymentMethod: "credit_card",
        transactionId: "txn_123456",
      },
      {
        id: 2,
        employerId: 2,
        packageId: 1,
        tokensAvailable: 0,
        tokensConsumed: 10,
        paymentStatus: "approved",
        createdAt: "2024-02-18T10:00:00Z",
        approvedAt: "2024-02-18T12:00:00Z",
        paymentMethod: "bank_transfer",
        transactionId: "txn_789012",
      },
      {
        id: 3,
        employerId: 1,
        packageId: 3,
        tokensAvailable: 200,
        tokensConsumed: 0,
        paymentStatus: "pending",
        createdAt: "2024-02-21T15:00:00Z",
        paymentMethod: "credit_card",
        transactionId: "txn_345678",
      },
      {
        id: 4,
        employerId: 3,
        packageId: 2,
        tokensAvailable: 50,
        tokensConsumed: 0,
        paymentStatus: "pending",
        createdAt: "2024-02-22T09:00:00Z",
        paymentMethod: "bank_transfer",
        transactionId: "txn_901234",
      },
    ],
  
    // Job seekers data...
    jobSeekers: [
      {
        id: 1,
        fullName: "John Doe",
        email: "john@example.com",
        phone: "+1 (555) 123-4567",
        skills: ["React", "Node.js", "TypeScript", "MongoDB"],
        education: [
          {
            degree: "Bachelor of Computer Science",
            institution: "Tech University",
            year: 2020,
          },
        ],
        address: "123 Tech Street, Silicon Valley",
        resumeUrl: "https://example.com/resume/john-doe",
        experienceYears: 3,
        title: "Full Stack Developer",
        summary: "Experienced full-stack developer with expertise in React and Node.js",
      },
      {
        id: 2,
        fullName: "Jane Smith",
        email: "jane@example.com",
        phone: "+1 (555) 987-6543",
        skills: ["Python", "Data Science", "Machine Learning", "TensorFlow"],
        education: [
          {
            degree: "Master of Data Science",
            institution: "Data University",
            year: 2021,
          },
        ],
        address: "456 Data Avenue, Tech City",
        resumeUrl: "https://example.com/resume/jane-smith",
        experienceYears: 5,
        title: "Data Scientist",
        summary: "Data scientist with focus on machine learning and AI applications",
      },
    ],
  
    // Viewed profiles tracking
    viewedProfiles: new Set(),
  }
  
  