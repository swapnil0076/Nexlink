# API's for NEXLINK App 

## Auth API's
- Post /singup
- Post /signin
- Post /logout

## Profile API's
- Get /profile
- PATCH /profile/edit
- PATCH /profile/password
- GET /Profile/Analytics
- GET /Profile/Activity
- GET /Profile/Experience
- POST /Profle/addNewExperience
- PATCH /Profile/Experience
- Post /Profile/AddNewEducation
- Patch /Profile/Education
- GET /Profile/Educations
- Post /Profile/AddNewCertification
- Patch /Profile/Certification
- GET /Profile/Certification
- Post /Profile/AddNewProject
- Patch /Profile/Project
- GET /Profile/Project

## Feed API - shows Post and some bit of user profile

- Get /feed ---> Get all the Posted Posts of User
- Get /profile/description
- Post /create/New Post
- Post /Feed/Post/reaction
- Post /Feed/Post/Comment
- Post /Feed/Post/Repost

## Send Connection Request - 

- Get /myNetwork
- Post /create/Post
- Post /Post/react
- Post /connection Request
- Post /myNetwork/review/accepted/:requestId
- Post /myNetwork/review/rejected/:requestId
- Delete /myNetwork/review/Deleted/:requestId