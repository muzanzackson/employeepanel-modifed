/*
export interface EmployeeJoiningInfo {
  Joining_Date: string;
  Onboarding_Feedback: string;
  Mentor_Assigned: string;
  Initial_Training_Completed: string;
}

export interface EmployeeLeave {
  Leave_Type: string;
  Leave_Days: number;
  Leave_Start_Date: string;
  Leave_End_Date: string;
}

export interface EmployeePerformance {
  Review_Period: string;
  Performance_Rating: number;
  Manager_Feedback: string;
  Promotion_Consideration: string;
}

export interface EmployeeAward {
  Award_Type: string;
  Award_Date: string;
  Reward_Points: number;
}

export interface EmployeeSentiment {
  Response_Date: string;
  Vibe_Score: number;
  Emotion_Zone: string;
}

export interface EmployeeActivity {
  Date: string;
  Teams_Messages_Sent: number;
  Emails_Sent: number;
  Meetings_Attended: number;
  Work_Hours: number;
}

export interface Employee {
  Joining_Info: EmployeeJoiningInfo;
  Leaves: EmployeeLeave[];
  Performance: EmployeePerformance[];
  Awards: EmployeeAward[];
  Sentiment: EmployeeSentiment[];
  Activity: EmployeeActivity[];
}

export interface EmployeeDatabase {
  [key: string]: Employee;
}

export const employeeData: EmployeeDatabase = {
  EMP0125: {
    Joining_Info: {
      Joining_Date: "2023-01-01",
      Onboarding_Feedback: "Good",
      Mentor_Assigned: "False",
      Initial_Training_Completed: "True",
    },
    Leaves: [
      {
        Leave_Type: "Casual Leave",
        Leave_Days: 2,
        Leave_Start_Date: "2/17/2024",
        Leave_End_Date: "2/18/2024",
      },
    ],
    Performance: [
      {
        Review_Period: "H1 2023",
        Performance_Rating: 3,
        Manager_Feedback: "Needs Improvement",
        Promotion_Consideration: "False",
      },
    ],
    Awards: [],
    Sentiment: [
      {
        Response_Date: "2023-04-14",
        Vibe_Score: 5,
        Emotion_Zone: "Happy Zone",
      },
      {
        Response_Date: "2024-04-14",
        Vibe_Score: 4,
        Emotion_Zone: "Happy Zone",
      },
    ],
    Activity: [
      {
        Date: "1/7/2024",
        Teams_Messages_Sent: 34,
        Emails_Sent: 11,
        Meetings_Attended: 1,
        Work_Hours: 6.95,
      },
      {
        Date: "5/2/2024",
        Teams_Messages_Sent: 3,
        Emails_Sent: 1,
        Meetings_Attended: 5,
        Work_Hours: 8.68,
      },
    ],
  },
  EMP0491: {
    Joining_Info: {
      Joining_Date: "2023-01-02",
      Onboarding_Feedback: "Average",
      Mentor_Assigned: "False",
      Initial_Training_Completed: "False",
    },
    Leaves: [
      {
        Leave_Type: "Annual Leave",
        Leave_Days: 4,
        Leave_Start_Date: "3/16/2023",
        Leave_End_Date: "3/17/2023",
      },
    ],
    Performance: [
      {
        Review_Period: "Annual 2023",
        Performance_Rating: 4,
        Manager_Feedback: "Needs Improvement",
        Promotion_Consideration: "False",
      },
    ],
    Awards: [],
    Sentiment: [
      {
        Response_Date: "2024-01-03",
        Vibe_Score: 5,
        Emotion_Zone: "Leaning to Happy Zone",
      },
    ],
    Activity: [
      {
        Date: "2/24/2023",
        Teams_Messages_Sent: 18,
        Emails_Sent: 22,
        Meetings_Attended: 8,
        Work_Hours: 8.04,
      },
    ],
  },
  EMP0310: {
    Joining_Info: {
      Joining_Date: "2023-10-07",
      Onboarding_Feedback: "Average",
      Mentor_Assigned: "True",
      Initial_Training_Completed: "False",
    },
    Leaves: [],
    Performance: [
      {
        Review_Period: "H1 2023",
        Performance_Rating: 3,
        Manager_Feedback: "Meets Expectations",
        Promotion_Consideration: "True",
      },
      {
        Review_Period: "Annual 2023",
        Performance_Rating: 3,
        Manager_Feedback: "Meets Expectations",
        Promotion_Consideration: "False",
      },
    ],
    Awards: [
      {
        Award_Type: "Best Team Player",
        Award_Date: "2023-09-02",
        Reward_Points: 118,
      },
    ],
    Sentiment: [
      {
        Response_Date: "2024-02-03",
        Vibe_Score: 1,
        Emotion_Zone: "Frustrated Zone",
      },
    ],
    Activity: [
      {
        Date: "2/16/2024",
        Teams_Messages_Sent: 0,
        Emails_Sent: 22,
        Meetings_Attended: 4,
        Work_Hours: 5.39,
      },
    ],
  },
  EMP0172: {
    Joining_Info: {
      Joining_Date: "2023-10-11",
      Onboarding_Feedback: "Average",
      Mentor_Assigned: "False",
      Initial_Training_Completed: "True",
    },
    Leaves: [],
    Performance: [],
    Awards: [
      {
        Award_Type: "Innovation Award",
        Award_Date: "2023-06-04",
        Reward_Points: 482,
      },
    ],
    Sentiment: [
      {
        Response_Date: "2023-01-18",
        Vibe_Score: 5,
        Emotion_Zone: "Neutral Zone (OK)",
      },
    ],
    Activity: [
      {
        Date: "7/30/2023",
        Teams_Messages_Sent: 28,
        Emails_Sent: 17,
        Meetings_Attended: 5,
        Work_Hours: 8.82,
      },
      {
        Date: "9/30/2023",
        Teams_Messages_Sent: 21,
        Emails_Sent: 18,
        Meetings_Attended: 7,
        Work_Hours: 6.04,
      },
    ],
  },
  EMP0262: {
    Joining_Info: {
      Joining_Date: "2024-03-06",
      Onboarding_Feedback: "Good",
      Mentor_Assigned: "False",
      Initial_Training_Completed: "True",
    },
    Leaves: [
      {
        Leave_Type: "Annual Leave",
        Leave_Days: 2,
        Leave_Start_Date: "12/19/2023",
        Leave_End_Date: "12/20/2023",
      },
    ],
    Performance: [
      {
        Review_Period: "H1 2023",
        Performance_Rating: 1,
        Manager_Feedback: "Exceeds Expectations",
        Promotion_Consideration: "False",
      },
    ],
    Awards: [
      {
        Award_Type: "Leadership Excellence",
        Award_Date: "2023-07-19",
        Reward_Points: 87,
      },
    ],
    Sentiment: [
      {
        Response_Date: "2023-11-04",
        Vibe_Score: 4,
        Emotion_Zone: "Sad Zone",
      },
      {
        Response_Date: "2024-05-11",
        Vibe_Score: 3,
        Emotion_Zone: "Frustrated Zone",
      },
    ],
    Activity: [
      {
        Date: "2/10/2024",
        Teams_Messages_Sent: 8,
        Emails_Sent: 11,
        Meetings_Attended: 2,
        Work_Hours: 5.45,
      },
    ],
  },
};

// Helper functions to analyze employee data
export const calculateAverageSentiment = (): number => {
  let totalScore = 0;
  let totalEntries = 0;

  Object.values(employeeData).forEach((employee) => {
    employee.Sentiment.forEach((sentiment) => {
      totalScore += sentiment.Vibe_Score;
      totalEntries++;
    });
  });

  return totalEntries > 0 ? totalScore / totalEntries : 0;
};

export const calculateAveragePerformance = (): number => {
  let totalRating = 0;
  let totalEntries = 0;

  Object.values(employeeData).forEach((employee) => {
    employee.Performance.forEach((perf) => {
      totalRating += perf.Performance_Rating;
      totalEntries++;
    });
  });

  return totalEntries > 0 ? totalRating / totalEntries : 0;
};

export const countEmployeesByStatus = (): {
  active: number;
  onLeave: number;
  recentlyJoined: number;
} => {
  const result = { active: 0, onLeave: 0, recentlyJoined: 0 };
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);

  Object.values(employeeData).forEach((employee) => {
    // Check if employee is on leave currently
    const onLeave = employee.Leaves.some((leave) => {
      const startDate = new Date(leave.Leave_Start_Date);
      const endDate = new Date(leave.Leave_End_Date);
      return now >= startDate && now <= endDate;
    });

    // Check if employee joined in the last 3 months
    const joinDate = new Date(employee.Joining_Info.Joining_Date);
    const recentlyJoined = joinDate >= threeMonthsAgo;

    if (onLeave) {
      result.onLeave++;
    } else {
      result.active++;
    }

    if (recentlyJoined) {
      result.recentlyJoined++;
    }
  });

  return result;
};

export const getRecentAwards = (): {
  employeeId: string;
  award: EmployeeAward;
}[] => {
  const awards: { employeeId: string; award: EmployeeAward }[] = [];

  Object.entries(employeeData).forEach(([employeeId, employee]) => {
    employee.Awards.forEach((award) => {
      awards.push({ employeeId, award });
    });
  });

  // Sort by date (most recent first)
  return awards.sort(
    (a, b) =>
      new Date(b.award.Award_Date).getTime() -
      new Date(a.award.Award_Date).getTime()
  );
};

export const getSentimentTrend = (): { date: string; average: number }[] => {
  const sentimentsByMonth: { [key: string]: number[] } = {};

  Object.values(employeeData).forEach((employee) => {
    employee.Sentiment.forEach((sentiment) => {
      const date = new Date(sentiment.Response_Date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!sentimentsByMonth[monthYear]) {
        sentimentsByMonth[monthYear] = [];
      }

      sentimentsByMonth[monthYear].push(sentiment.Vibe_Score);
    });
  });

  // Calculate average for each month
  return Object.entries(sentimentsByMonth)
    .map(([date, scores]) => ({
      date,
      average: scores.reduce((sum, score) => sum + score, 0) / scores.length,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
};
*/
// employeeData.ts

// Define your interfaces (same as before)
export interface EmployeeJoiningInfo {
  Joining_Date: string;
  Onboarding_Feedback: string;
  Mentor_Assigned: string;
  Initial_Training_Completed: string;
}

export interface EmployeeLeave {
  Leave_Type: string;
  Leave_Days: number;
  Leave_Start_Date: string;
  Leave_End_Date: string;
}

export interface EmployeePerformance {
  Review_Period: string;
  Performance_Rating: number;
  Manager_Feedback: string;
  Promotion_Consideration: string;
}

export interface EmployeeAward {
  Award_Type: string;
  Award_Date: string;
  Reward_Points: number;
}

export interface EmployeeSentiment {
  Response_Date: string;
  Vibe_Score: number;
  Emotion_Zone: string;
}

export interface EmployeeActivity {
  Date: string;
  Teams_Messages_Sent: number;
  Emails_Sent: number;
  Meetings_Attended: number;
  Work_Hours: number;
}

export interface Employee {
  Joining_Info: EmployeeJoiningInfo;
  Leaves: EmployeeLeave[];
  Performance: EmployeePerformance[];
  Awards: EmployeeAward[];
  Sentiment: EmployeeSentiment[];
  Activity: EmployeeActivity[];
}

export interface EmployeeDatabase {
  [key: string]: Employee;
}

// Import the JSON data
import employeeDataJson from "./employeeData.json";

// Cast the imported JSON to your EmployeeDatabase type
export const employeeData: EmployeeDatabase =
  employeeDataJson as EmployeeDatabase;

// Helper functions (same as before)
export const calculateAverageSentiment = (): number => {
  let totalScore = 0;
  let totalEntries = 0;

  Object.values(employeeData).forEach((employee) => {
    employee.Sentiment.forEach((sentiment) => {
      totalScore += sentiment.Vibe_Score;
      totalEntries++;
    });
  });

  return totalEntries > 0 ? totalScore / totalEntries : 0;
};

export const calculateAveragePerformance = (): number => {
  let totalRating = 0;
  let totalEntries = 0;

  Object.values(employeeData).forEach((employee) => {
    employee.Performance.forEach((perf) => {
      totalRating += perf.Performance_Rating;
      totalEntries++;
    });
  });

  return totalEntries > 0 ? totalRating / totalEntries : 0;
};

export const countEmployeesByStatus = (): {
  active: number;
  onLeave: number;
  recentlyJoined: number;
} => {
  const result = { active: 0, onLeave: 0, recentlyJoined: 0 };
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);

  Object.values(employeeData).forEach((employee) => {
    const onLeave = employee.Leaves.some((leave) => {
      const startDate = new Date(leave.Leave_Start_Date);
      const endDate = new Date(leave.Leave_End_Date);
      return now >= startDate && now <= endDate;
    });

    const joinDate = new Date(employee.Joining_Info.Joining_Date);
    const recentlyJoined = joinDate >= threeMonthsAgo;

    if (onLeave) {
      result.onLeave++;
    } else {
      result.active++;
    }

    if (recentlyJoined) {
      result.recentlyJoined++;
    }
  });

  return result;
};

export const getRecentAwards = (): {
  employeeId: string;
  award: EmployeeAward;
}[] => {
  const awards: { employeeId: string; award: EmployeeAward }[] = [];

  Object.entries(employeeData).forEach(([employeeId, employee]) => {
    employee.Awards.forEach((award) => {
      awards.push({ employeeId, award });
    });
  });

  return awards.sort(
    (a, b) =>
      new Date(b.award.Award_Date).getTime() -
      new Date(a.award.Award_Date).getTime()
  );
};

export const getSentimentTrend = (): { date: string; average: number }[] => {
  const sentimentsByMonth: { [key: string]: number[] } = {};

  Object.values(employeeData).forEach((employee) => {
    employee.Sentiment.forEach((sentiment) => {
      const date = new Date(sentiment.Response_Date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!sentimentsByMonth[monthYear]) {
        sentimentsByMonth[monthYear] = [];
      }

      sentimentsByMonth[monthYear].push(sentiment.Vibe_Score);
    });
  });

  return Object.entries(sentimentsByMonth)
    .map(([date, scores]) => ({
      date,
      average: scores.reduce((sum, score) => sum + score, 0) / scores.length,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
};
