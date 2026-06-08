#StudyFlow-AI

##Features
1. Authentication
- signup
- login
- logout
1. Landing page 
- Hero section
- Features section
- Studytips section
- Footer
3. Dashboard
- today"s study hours
- productivity score
- consistency score
- Current streak
- Quick start session
- Goals overview
- Subject overview
4. Subjects 
- create subject
- edit subject
- delete subject
- view all subjects
5. Study Sessions 
- Start session
- End session
- Pomodoro timer
- Subject selection
- Session notes/reflection
- View session history
- Edit session
- Delete session
6. Goals
- Create goal
- Update progress
- Edit goal
- Delete goal
- Subject-linked goals
- Goal completion tracking
7. Analytics 
- Weekly Analytics
- Monthly Analytics
- Subject-Wise Analytics
- Study Hour Charts
- Productivity Trends
- Study Heat Map
- Consistency Analysis 
8. AI Insights
- Weekly Review Generator
- Study Sessions
- Subject Recommendations
- Productivity Insights
9. ML Feature 
- Tomorrow's Study Hour Prediction

##Pages
- Landing 
- Login 
- SignUp
- Dashboard
- Study session
- Subjects
- Goals
- Analytical

##Database
###User
- id
- name
- email
- password
- createdAt
- updatedAt
###Subject
- id
- userid
- subject name
- createdAt
- updatedAt
- color
###study session
- id
- user id
- subject id
- startTime
- endTime
- durationMinutes
- notes
- sessionType
    - normal
    - pomodoro
- createdAt
- updatedAt
###goal
- id 
- user id
- subject id
- progress
- title
- target
- deadline
- createdAt
- updatedAt
- isCompleted
- completedAt
- discription(optional)


